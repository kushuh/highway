import { createInstance } from "../src";

describe("typings", () => {
  const checkReturnType = <Res>(res: () => Res) => undefined;
  const fetcher = createInstance();

  describe("resolver", () => {
    it("should return Response type by default", async () => {
      checkReturnType<Promise<Response>>(() => fetcher.handle({ method: "GET", path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.handle({ method: "POST", path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.handle({ method: "PUT", path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.handle({ method: "PATCH", path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.handle({ method: "DELETE", path: "https://snowball.aq" }));

      checkReturnType<Promise<Response>>(() => fetcher.get({ path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.post({ path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.put({ path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.patch({ path: "https://snowball.aq" }));
      checkReturnType<Promise<Response>>(() => fetcher.destroy({ path: "https://snowball.aq" }));

      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", must: true })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", must: true })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", must: true })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", must: true })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", must: true })
      );

      checkReturnType<Promise<Response>>(() => fetcher.get({ path: "https://snowball.aq", must: true }));
      checkReturnType<Promise<Response>>(() => fetcher.post({ path: "https://snowball.aq", must: true }));
      checkReturnType<Promise<Response>>(() => fetcher.put({ path: "https://snowball.aq", must: true }));
      checkReturnType<Promise<Response>>(() => fetcher.patch({ path: "https://snowball.aq", must: true }));
      checkReturnType<Promise<Response>>(() => fetcher.destroy({ path: "https://snowball.aq", must: true }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.handle({ method: "GET", path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.handle({ method: "POST", path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.handle({ method: "PUT", path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.handle({ method: "PATCH", path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.handle({ method: "DELETE", path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.get({ path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.post({ path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.put({ path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.patch({ path: "https://snowball.aq" }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.destroy({ path: "https://snowball.aq" }));

      checkReturnType<Promise<string>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "GET", path: "https://snowball.aq", must: true })
      );

      checkReturnType<Promise<string>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "POST", path: "https://snowball.aq", must: true })
      );

      checkReturnType<Promise<string>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", must: true })
      );

      checkReturnType<Promise<string>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", must: true })
      );

      checkReturnType<Promise<string>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", must: true })
      );

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.get({ path: "https://snowball.aq", must: true }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.post({ path: "https://snowball.aq", must: true }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.put({ path: "https://snowball.aq", must: true }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.patch({ path: "https://snowball.aq", must: true }));

      // @ts-expect-error
      checkReturnType<Promise<string>>(() => fetcher.destroy({ path: "https://snowball.aq", must: true }));
    });

    it("should return any type with resolver json", async () => {
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "json" })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "json" })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "json" })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "json" })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "json" })
      );

      checkReturnType<Promise<any>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "json" }));
      checkReturnType<Promise<any>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "json" }));
      checkReturnType<Promise<any>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "json" }));
      checkReturnType<Promise<any>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "json" }));
      checkReturnType<Promise<any>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "json" }));

      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "json", must: true })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "json", must: true })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "json", must: true })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "json", must: true })
      );
      checkReturnType<Promise<any>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "json", must: true })
      );

      checkReturnType<Promise<any>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "json", must: true }));
      checkReturnType<Promise<any>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "json", must: true }));
      checkReturnType<Promise<any>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "json", must: true }));
      checkReturnType<Promise<any>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "json", must: true }));
      checkReturnType<Promise<any>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "json", must: true })
      );
    });

    it("should return string type with text resolver", async () => {
      checkReturnType<Promise<string | void>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "text" })
      );
      checkReturnType<Promise<string | void>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "text" })
      );
      checkReturnType<Promise<string | void>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "text" })
      );
      checkReturnType<Promise<string | void>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "text" })
      );
      checkReturnType<Promise<string | void>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "text" })
      );

      checkReturnType<Promise<string | void>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "text" }));
      checkReturnType<Promise<string | void>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "text" }));
      checkReturnType<Promise<string | void>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "text" }));
      checkReturnType<Promise<string | void>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "text" }));
      checkReturnType<Promise<string | void>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "text" }));

      checkReturnType<Promise<string>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<string>>(() =>
        fetcher.get({ path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.post({ path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.put({ path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "text", must: true })
      );
      checkReturnType<Promise<string>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "text" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "text" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "text" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "text" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "text" })
      );

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "text" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "text" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "text" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "text" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "text" }));

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.get({ path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.post({ path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.put({ path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.patch({ path: "https://snowball.aq", resolver: "text", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.destroy({ path: "https://snowball.aq", resolver: "text", must: true })
      );
    });

    it("should return blob type with blob resolver", async () => {
      checkReturnType<Promise<Blob | void>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "blob" })
      );
      checkReturnType<Promise<Blob | void>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "blob" })
      );
      checkReturnType<Promise<Blob | void>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "blob" })
      );
      checkReturnType<Promise<Blob | void>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "blob" })
      );
      checkReturnType<Promise<Blob | void>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "blob" })
      );

      checkReturnType<Promise<Blob | void>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "blob" }));
      checkReturnType<Promise<Blob | void>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "blob" }));
      checkReturnType<Promise<Blob | void>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "blob" }));
      checkReturnType<Promise<Blob | void>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "blob" }));
      checkReturnType<Promise<Blob | void>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "blob" }));

      checkReturnType<Promise<Blob>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "blob", must: true })
      );
      checkReturnType<Promise<Blob>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "blob", must: true })
      );
      checkReturnType<Promise<Blob>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "blob", must: true })
      );
      checkReturnType<Promise<Blob>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "blob", must: true })
      );
      checkReturnType<Promise<Blob>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<Blob>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "blob", must: true }));
      checkReturnType<Promise<Blob>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "blob", must: true }));
      checkReturnType<Promise<Blob>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "blob", must: true }));
      checkReturnType<Promise<Blob>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "blob", must: true })
      );
      checkReturnType<Promise<Blob>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "blob" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "blob" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "blob" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "blob" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "blob" })
      );

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "blob" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "blob" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "blob" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "blob" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "blob" }));

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.get({ path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.post({ path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.put({ path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.patch({ path: "https://snowball.aq", resolver: "blob", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.destroy({ path: "https://snowball.aq", resolver: "blob", must: true })
      );
    });

    it("should return arrayBuffer type with arrayBuffer resolver", async () => {
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.get({ path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.post({ path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.put({ path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "arrayBuffer" })
      );
      checkReturnType<Promise<ArrayBuffer | void>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.get({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.post({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.put({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
      checkReturnType<Promise<ArrayBuffer>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "arrayBuffer" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "arrayBuffer" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "arrayBuffer" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "arrayBuffer" }));

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.destroy({ path: "https://snowball.aq", resolver: "arrayBuffer" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.get({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.post({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.put({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.patch({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.destroy({ path: "https://snowball.aq", resolver: "arrayBuffer", must: true })
      );
    });

    it("should return formData type with formData resolver", async () => {
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "formData" })
      );

      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.get({ path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.post({ path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.put({ path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "formData" })
      );
      checkReturnType<Promise<FormData | void>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "formData" })
      );

      checkReturnType<Promise<FormData>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<FormData>>(() =>
        fetcher.get({ path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.post({ path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.put({ path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "formData", must: true })
      );
      checkReturnType<Promise<FormData>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "formData" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "formData" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "formData" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "formData" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "formData" })
      );

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "formData" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "formData" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "formData" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "formData" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "formData" }));

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.get({ path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.post({ path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.put({ path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.patch({ path: "https://snowball.aq", resolver: "formData", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.destroy({ path: "https://snowball.aq", resolver: "formData", must: true })
      );
    });

    it("should return void type with void json", async () => {
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "void" })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "void" })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "void" })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "void" })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "void" })
      );

      checkReturnType<Promise<void>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "void" }));
      checkReturnType<Promise<void>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "void" }));
      checkReturnType<Promise<void>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "void" }));
      checkReturnType<Promise<void>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "void" }));
      checkReturnType<Promise<void>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "void" }));

      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "void", must: true })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "void", must: true })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "void", must: true })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "void", must: true })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<void>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "void", must: true }));
      checkReturnType<Promise<void>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "void", must: true }));
      checkReturnType<Promise<void>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "void", must: true }));
      checkReturnType<Promise<void>>(() =>
        fetcher.patch({ path: "https://snowball.aq", resolver: "void", must: true })
      );
      checkReturnType<Promise<void>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "void" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "void" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "void" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "void" })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "void" })
      );

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.get({ path: "https://snowball.aq", resolver: "void" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.post({ path: "https://snowball.aq", resolver: "void" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.put({ path: "https://snowball.aq", resolver: "void" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.patch({ path: "https://snowball.aq", resolver: "void" }));

      // @ts-expect-error
      checkReturnType<Promise<number>>(() => fetcher.destroy({ path: "https://snowball.aq", resolver: "void" }));

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "GET", path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "POST", path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PUT", path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "PATCH", path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.handle({ method: "DELETE", path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.get({ path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.post({ path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.put({ path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(() =>
        // @ts-expect-error
        fetcher.patch({ path: "https://snowball.aq", resolver: "void", must: true })
      );

      checkReturnType<Promise<number>>(
        // @ts-expect-error
        () => fetcher.destroy({ path: "https://snowball.aq", resolver: "void", must: true })
      );
    });

    it("should refuse resolvers with the soft tag", () => {
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "GET", path: "https://snowball.aq", soft: true })
      );
      checkReturnType<Promise<Response>>(() => fetcher.get({ path: "https://snowball.aq", soft: true }));
      checkReturnType<Promise<Response>>(() => fetcher.post({ path: "https://snowball.aq", soft: true }));
      checkReturnType<Promise<Response>>(() => fetcher.put({ path: "https://snowball.aq", soft: true }));
      checkReturnType<Promise<Response>>(() => fetcher.patch({ path: "https://snowball.aq", soft: true }));
      checkReturnType<Promise<Response>>(() => fetcher.destroy({ path: "https://snowball.aq", soft: true }));

      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "GET", path: "https://snowball.aq", soft: true, resolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.get({ path: "https://snowball.aq", soft: true, resolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.post({ path: "https://snowball.aq", soft: true, resolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.put({ path: "https://snowball.aq", soft: true, resolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.patch({ path: "https://snowball.aq", soft: true, resolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.destroy({ path: "https://snowball.aq", soft: true, resolver: "json" })
      );
    });
  });

  describe("bodyResolver", () => {
    it("should only accept fetch body compatible values by default", () => {
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", body: "foobar" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", body: "foobar" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", body: "foobar" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", body: "foobar" })
      );

      checkReturnType<Promise<Response>>(() => fetcher.post({ path: "https://snowball.aq", body: "foobar" }));
      checkReturnType<Promise<Response>>(() => fetcher.put({ path: "https://snowball.aq", body: "foobar" }));
      checkReturnType<Promise<Response>>(() => fetcher.patch({ path: "https://snowball.aq", body: "foobar" }));
      checkReturnType<Promise<Response>>(() => fetcher.destroy({ path: "https://snowball.aq", body: "foobar" }));

      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "POST", path: "https://snowball.aq", body: { foo: "bar" } })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", body: { foo: "bar" } })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", body: { foo: "bar" } })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", body: { foo: "bar" } })
      );

      // @ts-expect-error
      checkReturnType<Promise<Response>>(() => fetcher.post({ path: "https://snowball.aq", body: { foo: "bar" } }));
      // @ts-expect-error
      checkReturnType<Promise<Response>>(() => fetcher.put({ path: "https://snowball.aq", body: { foo: "bar" } }));
      // @ts-expect-error
      checkReturnType<Promise<Response>>(() => fetcher.patch({ path: "https://snowball.aq", body: { foo: "bar" } }));
      // @ts-expect-error
      checkReturnType<Promise<Response>>(() => fetcher.destroy({ path: "https://snowball.aq", body: { foo: "bar" } }));
    });

    it("should accept any json body with json bodyResolver", () => {
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "POST", path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "PUT", path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "PATCH", path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.handle({ method: "DELETE", path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );

      checkReturnType<Promise<Response>>(() =>
        fetcher.post({ path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.put({ path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.patch({ path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
      checkReturnType<Promise<Response>>(() =>
        fetcher.destroy({ path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
    });

    it("should refuse body on GET requests", () => {
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "GET", path: "https://snowball.aq", body: "foobar" })
      );

      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.get({ path: "https://snowball.aq", body: "foobar" })
      );
      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.handle({ method: "GET", path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );

      checkReturnType<Promise<Response>>(() =>
        // @ts-expect-error
        fetcher.get({ path: "https://snowball.aq", body: { foo: "bar" }, bodyResolver: "json" })
      );
    });
  });
});
