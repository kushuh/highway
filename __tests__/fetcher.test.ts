import { createInstance, handle } from "../src/fetcher";
import { isAPIError, RequestParams, RequestParamsBody, Resolver } from "../src";

interface useFetchMockParams {
  response?: Response;
  reject?: any;
}

const DEFAULT_RESPONSE_CONTENT = { message: "slippery slope" };
const DEFAULT_RESPONSE = new Response(JSON.stringify(DEFAULT_RESPONSE_CONTENT), {
  status: 200,
  statusText: "ok",
});

export const newFetchMock = ({ response, reject }: useFetchMockParams) =>
  jest
    .fn()
    .mockImplementation(
      (input: RequestInfo | URL, init?: RequestInit): Promise<Response> =>
        reject != null ? Promise.reject(reject) : Promise.resolve(response ? response.clone() : new Response())
    );

afterEach(() => {
  jest.restoreAllMocks();
});

describe("handle", () => {
  it("should perform a standard fetch request", async () => {
    const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
    jest.spyOn(global, "fetch").mockImplementation(apiCall);

    const fetcher = createInstance();
    const res = await fetcher.handle({ method: "GET", path: "https://snowball.aq" });

    expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
      method: "GET",
      headers: new Headers(),
    });
    expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
  });

  describe("shorthands", () => {
    const testCases = {
      get: "GET",
      post: "POST",
      put: "PUT",
      patch: "PATCH",
      destroy: "DELETE",
    };

    Object.entries(testCases).forEach(([method, httpMethod]) => {
      it(`should perform a shorthand ${method} request`, async () => {
        const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
        jest.spyOn(global, "fetch").mockImplementation(apiCall);

        const fetcher = createInstance();
        const res = await (fetcher as any)[method]({ path: "https://snowball.aq" });

        expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
          method: httpMethod,
          headers: new Headers(),
        });
        expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
      });
    });
  });

  describe("response parsing", () => {
    const fdata = new FormData();
    fdata.append("foo", "bar");
    fdata.append("message", "hello world");

    const testCases: Record<Resolver, { response: BodyInit; expected: any; empty: any }> = {
      text: {
        response: "hello world",
        expected: "hello world",
        empty: undefined,
      },
      json: {
        response: JSON.stringify({ message: "hello world" }),
        expected: { message: "hello world" },
        empty: undefined,
      },
      blob: {
        response: new Blob([JSON.stringify({ message: "hello world" }, null, 2)], { type: "application/json" }),
        expected: new Blob([JSON.stringify({ message: "hello world" }, null, 2)], { type: "application/json" }),
        empty: undefined,
      },
      arrayBuffer: {
        response: new ArrayBuffer(8),
        expected: new ArrayBuffer(8),
        empty: undefined,
      },
      formData: {
        response: fdata,
        expected: fdata,
        empty: undefined,
      },
      void: {
        response: "this should be ignored",
        expected: undefined,
        empty: undefined,
      },
    };

    Object.entries(testCases).forEach(([resolver, { response, expected, empty }]) => {
      it(`has resolver ${resolver}: it should parse response with the appropriate type`, async () => {
        const apiCall = newFetchMock({ response: new Response(response, { status: 200, statusText: "ok" }) });
        jest.spyOn(global, "fetch").mockImplementation(apiCall);

        const fetcher = createInstance();
        const res = await fetcher.handle({
          resolver: resolver as Resolver,
          method: "GET",
          path: "https://snowball.aq",
        });

        expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
          method: "GET",
          headers: new Headers(),
        });
        expect(res).toEqual(expected);
      });

      it(`has resolver ${resolver}: it should handle empty responses`, async () => {
        const apiCall = newFetchMock({ response: new Response(undefined, { status: 204, statusText: "ok" }) });
        jest.spyOn(global, "fetch").mockImplementation(apiCall);

        const fetcher = createInstance();
        const res = await fetcher.handle({
          resolver: resolver as Resolver,
          method: "GET",
          path: "https://snowball.aq",
        });

        expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
          method: "GET",
          headers: new Headers(),
        });
        expect(res).toEqual(empty);
      });

      it(`has resolver ${resolver}: it should throw on empty response, when must is set to true`, async () => {
        const apiCall = newFetchMock({ response: new Response(undefined, { status: 204, statusText: "ok" }) });
        jest.spyOn(global, "fetch").mockImplementation(apiCall);

        const fetcher = createInstance();

        await expect(
          fetcher.handle({
            resolver: resolver as Resolver,
            method: "GET",
            must: true,
            path: "https://snowball.aq",
          })
        ).rejects.toMatchObject(new Error("api call returned an empty response body"));
        expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
          method: "GET",
          headers: new Headers(),
        });
      });

      it(`has resolver ${resolver}: it should parse response, when must is set to true`, async () => {
        const apiCall = newFetchMock({ response: new Response(response, { status: 200, statusText: "ok" }) });
        jest.spyOn(global, "fetch").mockImplementation(apiCall);

        const fetcher = createInstance();
        const res = await fetcher.handle({
          resolver: resolver as Resolver,
          must: true,
          method: "GET",
          path: "https://snowball.aq",
        });

        expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
          method: "GET",
          headers: new Headers(),
        });
        expect(res).toEqual(expected);
      });
    });
  });

  describe("body parsing", () => {
    const testCases = {
      [""]: {
        body: JSON.stringify({ foo: "bar" }),
        expect: JSON.stringify({ foo: "bar" }),
      },
      json: {
        body: { foo: "bar" },
        expect: JSON.stringify({ foo: "bar" }),
      },
    };

    Object.entries(testCases).forEach(([bodyResolver, { body, expect: expectParsed }]) => {
      it(`should parse request body when parser is set to ${bodyResolver || "empty"}`, async () => {
        const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
        jest.spyOn(global, "fetch").mockImplementation(apiCall);

        let reqParams = {
          method: "POST",
          path: "https://snowball.aq",
        } as RequestParamsBody;

        if (bodyResolver === "") {
          reqParams.body = body as BodyInit | null | undefined;
        } else {
          reqParams = {
            ...reqParams,
            bodyResolver: bodyResolver as "json",
            body: body,
          };
        }

        const fetcher = createInstance();
        const res = await fetcher.handle(reqParams);

        expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
          method: "POST",
          headers: new Headers(),
          body: expectParsed,
        });
        expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
      });
    });
  });

  describe("error handling", () => {
    it("should throw an APIError on non-2xx status code", async () => {
      const apiCall = newFetchMock({
        response: new Response("it broken", {
          status: 404,
          statusText: "not found",
        }),
      });
      jest.spyOn(global, "fetch").mockImplementation(apiCall);

      const fetcher = createInstance();
      const res = await fetcher
        .handle({
          method: "GET",
          path: "https://snowball.aq",
        })
        .catch((err) => Promise.resolve(err));

      expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
        method: "GET",
        headers: new Headers(),
      });
      expect(isAPIError(res)).toBeTruthy();
      expect(res?.status()).toEqual(404);
      expect(await res?.text()).toEqual("it broken");
    });

    it("should not throw an APIError on non-2xx status code when soft is enabled", async () => {
      const apiCall = newFetchMock({
        response: new Response("it broken", {
          status: 404,
          statusText: "not found",
        }),
      });
      jest.spyOn(global, "fetch").mockImplementation(apiCall);

      const fetcher = createInstance();
      const res = await fetcher.handle({
        method: "GET",
        path: "https://snowball.aq",
        soft: true,
      });

      expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
        method: "GET",
        headers: new Headers(),
      });
      expect(isAPIError(res)).toBeFalsy();
      expect(await res?.text()).toEqual("it broken");
    });
  });
});

describe("createInstance", () => {
  it("should create a copy when createInstance is called", () => {
    const instance1 = createInstance();
    const instance1_2 = instance1.createInstance();
    expect(instance1).not.toBe(instance1_2);
  });

  it("should inherit headers", async () => {
    const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
    jest.spyOn(global, "fetch").mockImplementation(apiCall);

    const instance1 = createInstance({
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Age: "42",
      },
    });
    const instance1_2 = instance1.createInstance({
      headers: {
        Authorization: "Bearer [token]",
        Age: "24",
      },
    });

    const res = await instance1_2.handle({
      method: "GET",
      path: "https://snowball.aq",
      headers: { "Content-Type": "application/xml" },
    });

    expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
      method: "GET",
      headers: new Headers({
        Age: "24",
        Authorization: "Bearer [token]",
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache",
      }),
    });
    expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
  });

  it("should inherit requestInit", async () => {
    const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
    jest.spyOn(global, "fetch").mockImplementation(apiCall);

    const instance1 = createInstance({
      requestInit: {
        mode: "cors",
        cache: "no-cache",
      },
    });
    const instance1_2 = instance1.createInstance({
      requestInit: {
        redirect: "follow",
        credentials: "include",
        cache: "reload",
      },
    });

    const res = await instance1_2.handle({
      method: "GET",
      path: "https://snowball.aq",
      requestInit: {
        credentials: "omit",
      },
    });

    expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq"), {
      method: "GET",
      mode: "cors",
      cache: "reload",
      redirect: "follow",
      credentials: "omit",
      headers: new Headers(),
    });
    expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
  });

  describe("url", () => {
    it("should inherit base URL", async () => {
      const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
      jest.spyOn(global, "fetch").mockImplementation(apiCall);

      const instance1 = createInstance({ base: "https://snowball.aq" });
      const instance1_2 = instance1.createInstance({ base: "/api" });

      const res = await instance1_2.handle({
        method: "GET",
        path: "/penguin",
      });

      expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq/api/penguin"), {
        method: "GET",
        headers: new Headers(),
      });
      expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
    });

    it("should inherit URL Search Params", async () => {
      const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
      jest.spyOn(global, "fetch").mockImplementation(apiCall);

      const instance1 = createInstance({ base: "https://snowball.aq?foo=bar&id=42" });
      const instance1_2 = instance1.createInstance({ base: "/api?foo=baz" });

      const res = await instance1_2.handle({
        method: "GET",
        path: "/penguin?page=20&id=20",
        searchParams: { a: 3, foo: "qux" },
      });

      expect(apiCall).toHaveBeenNthCalledWith(
        1,
        new URL("https://snowball.aq/api/penguin?foo=bar&id=42&foo=baz&page=20&id=20"),
        {
          method: "GET",
          headers: new Headers(),
        }
      );
      expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
    });

    it("should replace all previous routes when providing absolute URL", async () => {
      const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
      jest.spyOn(global, "fetch").mockImplementation(apiCall);

      const instance1 = createInstance({ base: "https://snowball.aq?foo=bar&id=42" });
      const instance1_2 = instance1.createInstance({ base: "/api?foo=baz" });

      const res = await instance1_2.handle({
        method: "GET",
        path: "https://snowball.aq/penguin?page=20&id=20",
        params: { a: "3", foo: "qux" },
      });

      expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq/penguin?page=20&id=20&a=3&foo=qux"), {
        method: "GET",
        headers: new Headers(),
      });
      expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
    });

    it("can skip providing routes in the middle of the chain", async () => {
      const apiCall = newFetchMock({ response: DEFAULT_RESPONSE });
      jest.spyOn(global, "fetch").mockImplementation(apiCall);

      const instance1 = createInstance();
      const instance2 = instance1.createInstance({ base: "https://snowball.aq?foo=bar&id=42" });
      const instance3 = instance2.createInstance();
      const instance4 = instance3.createInstance({ base: "/api?foo=baz" });

      const res = await instance4.handle({
        method: "GET",
        path: "https://snowball.aq/penguin?page=20&id=20",
        params: { a: "3", foo: "qux" },
      });

      expect(apiCall).toHaveBeenNthCalledWith(1, new URL("https://snowball.aq/penguin?page=20&id=20&a=3&foo=qux"), {
        method: "GET",
        headers: new Headers(),
      });
      expect(await res?.json()).toEqual(DEFAULT_RESPONSE_CONTENT);
    });
  });
});
