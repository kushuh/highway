import { APIError, Config, ExtendedResponseType, RequestParams, RequestParamsNoBody } from "./types";
import { mergeURLs, parseBody, parseHeaders } from "./utils";

/**
 * Extends the default {@link fetch} API to be parameterized. Similar to libraries like axios, but simpler, and using
 * native APIs.
 *
 * It adds some axios convenience, such as throwing errors on non-200 statuses, and automatic response parsing.
 */
export class Highway {
  // Instance parameters, to be applied to each request.
  private readonly base?: URL;
  private readonly headers?: HeadersInit;
  private readonly requestInit?: RequestInit;

  constructor({ base, headers, requestInit }: Config = {}) {
    if (base) {
      // If a base URL is provided, it MUST be a full valid absolute URL.
      this.base = new URL(base);
    }
    this.headers = headers;
    this.requestInit = requestInit;
  }

  handle = async <Req extends RequestParams>(req: Req): Promise<ExtendedResponseType<Req>> => {
    // Merge parameters together, and form the request API configuration.
    const params: RequestInit = { ...(this.requestInit || {}), ...(req.requestInit || {}), method: req.method };

    const headers = parseHeaders(this.headers, req.headers);
    if (headers != null) {
      params.headers = headers;
    }

    const body = parseBody(req);
    if (body != null) {
      params.body = body;
    }

    const path = mergeURLs(req.path, this.base);
    for (let [key, val] of new URLSearchParams(req.params).entries()) {
      path.searchParams.append(key, val);
    }

    // Perform the request with native API.
    const response = await fetch(path, params);

    if ("soft" in req && req.soft) {
      return response as unknown as ExtendedResponseType<Req>;
    }

    const resolver = "resolver" in req && req.resolver;

    // Prevent successful responses, if the status code is not a success code.
    if (!response.ok) {
      throw new APIError(response);
    }

    // Don't attempt to parse the body if none is returned.
    if (response.body == null) {
      if (req.must) {
        throw new Error("api call returned an empty response body");
      }

      return (resolver ? undefined : response) as unknown as ExtendedResponseType<Req>;
    }

    // As of today (03 2023), type inference works well when calling the function. It seems, however, that
    // typescript struggles to properly infer complex types within guard clauses. Maybe it will work better
    // in future releases, but for now, the "as ResponseType<PReq>" is required, to avoid typescript errors.
    switch (resolver) {
      case "text":
        return (await response.text()) as ExtendedResponseType<Req>;
      case "json":
        return (await response.json()) as ExtendedResponseType<Req>;
      case "blob":
        return (await response.blob()) as ExtendedResponseType<Req>;
      case "arrayBuffer":
        return (await response.arrayBuffer()) as ExtendedResponseType<Req>;
      case "formData":
        return (await response.formData()) as ExtendedResponseType<Req>;
      case "void":
        return undefined as unknown as ExtendedResponseType<Req>;
      default:
        return response as ExtendedResponseType<Req>;
    }
  };

  get = <TReq extends RequestParamsNoBody>(params: Omit<TReq, "method">): Promise<ExtendedResponseType<TReq>> =>
    this.handle({ method: "GET", ...params } as TReq);
  post = <TReq extends RequestParams>(params: Omit<TReq, "method">): Promise<ExtendedResponseType<TReq>> =>
    this.handle({ ...params, method: "POST" } as TReq);
  put = <TReq extends RequestParams>(params: Omit<TReq, "method">): Promise<ExtendedResponseType<TReq>> =>
    this.handle({ ...params, method: "PUT" } as TReq);
  patch = <TReq extends RequestParams>(params: Omit<TReq, "method">): Promise<ExtendedResponseType<TReq>> =>
    this.handle({ ...params, method: "PATCH" } as TReq);
  destroy = <TReq extends RequestParams>(params: Omit<TReq, "method">): Promise<ExtendedResponseType<TReq>> =>
    this.handle({ ...params, method: "DELETE" } as TReq);

  createInstance = ({ base, headers, requestInit }: Config = {}): Highway =>
    new Highway({
      base: base ? mergeURLs(base, this.base) : this.base,
      headers: { ...(this.headers || {}), ...(headers || {}) },
      requestInit: { ...(this.requestInit || {}), ...(requestInit || {}) },
    });
}

const fetcher = new Highway();

export const handle = fetcher.handle;
export const get = fetcher.get;
export const post = fetcher.post;
export const put = fetcher.put;
export const patch = fetcher.patch;
export const destroy = fetcher.destroy;
export const createInstance = fetcher.createInstance;
