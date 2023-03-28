import { handle } from "../src/fetcher";

// ================================================================================
// You can hover on lines, and see if the type matches their comment.
// ================================================================================

const responseTypes = async () => {
  // Response.
  const a = await handle({ method: "POST", path: "https://snowball.aq" });
  // any.
  const b = await handle({ method: "POST", path: "https://snowball.aq", resolver: "json" });
  // text | undefined.
  const c = await handle({ method: "POST", path: "https://snowball.aq", resolver: "text" });
  // Blob | undefined.
  const d = await handle({ method: "POST", path: "https://snowball.aq", resolver: "blob" });
  // ArrayBuffer | undefined.
  const e = await handle({ method: "POST", path: "https://snowball.aq", resolver: "arrayBuffer" });
  // FormData | undefined.
  const f = await handle({ method: "POST", path: "https://snowball.aq", resolver: "formData" });
  // void.
  const g = await handle({ method: "POST", path: "https://snowball.aq", resolver: "void" });

  // Response.
  const a1 = await handle({ method: "POST", path: "https://snowball.aq", must: true });
  // any.
  const b1 = await handle({ method: "POST", path: "https://snowball.aq", resolver: "json", must: true });
  // text.
  const c1 = await handle({ method: "POST", path: "https://snowball.aq", resolver: "text", must: true });
  // Blob.
  const d1 = await handle({ method: "POST", path: "https://snowball.aq", resolver: "blob", must: true });
  // ArrayBuffer.
  const e1 = await handle({ method: "POST", path: "https://snowball.aq", resolver: "arrayBuffer", must: true });
  // FormData.
  const f1 = await handle({ method: "POST", path: "https://snowball.aq", resolver: "formData", must: true });
  // void.
  const g1 = await handle({ method: "POST", path: "https://snowball.aq", resolver: "void", must: true });
};

const requestTypes = async () => {
  const a = await handle({ method: "POST", path: "https://snowball.aq", body: "hello world" });

  const b = await handle({ method: "POST", path: "https://snowball.aq", body: { a: "foo" }, bodyResolver: "json" });
};

// ================================================================================
// Uncomment faulty lines to see typescript throw an error.
// ================================================================================

const wrongTypes = async () => {
  // Doesn't work: body does not have json resolver.
  // const a = await handle({ method: "POST", path: "https://snowball.aq", body: { a: "foo" } });
  //
  // Doesn't work: GET requests cannot have a body.
  // const b = await handle({ method: "GET", path: "https://snowball.aq", body: "" });
  //
  // Doesn't work: soft is not compatible with resolvers.
  // const c = await handle({ method: "GET", path: "https://snowball.aq", soft: true, resolver: "json" });
};
