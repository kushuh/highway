import { FetchRequest } from "./types";

// Allow to merge two URLs and their respective pathname, which standard URL constructor does not allow.
export const mergeURLs = (a: URL | string, b: URL | string | undefined): URL => {
  if (b === undefined) {
    return new URL(a);
  }

  const sourceURL = new URL(a, "https://non-valid-host.com");
  // The source URL has a host, we use it and ignore the base URL.
  if (sourceURL.host !== "non-valid-host.com") {
    return sourceURL;
  }

  // b MUST be valid, at this point.
  const baseURL = new URL(b);

  const url = new URL(
    (baseURL.pathname === "/" ? "" : baseURL.pathname) + (sourceURL.pathname === "/" ? "" : sourceURL.pathname),
    baseURL.href
  );

  // Merge query parameters.
  for (let [key, val] of baseURL.searchParams.entries()) {
    url.searchParams.append(key, val);
  }
  for (let [key, val] of sourceURL.searchParams.entries()) {
    url.searchParams.append(key, val);
  }

  return url;
};

// Automatically parse request body, depending on configuration.
export const parseBody = <T extends FetchRequest>(params: T): BodyInit | null | undefined => {
  if (params.body == null) {
    return undefined;
  }

  // For now, only JSON is supported, so we can remain simple.
  if ("bodyResolver" in params && params.bodyResolver === "json") {
    return JSON.stringify(params.body);
  }

  return params.body;
};

export const parseHeaders = (a?: HeadersInit, b?: HeadersInit): HeadersInit | undefined => {
  if (a == null && b == null) {
    return undefined;
  }

  const headers = new Headers(a);

  if (b !== undefined) {
    for (const [key, value] of Object.entries(b)) {
      headers.set(key, value);
    }
  }

  return headers;
};
