// ================================================================================
// CONFIGURATION TYPES
// ================================================================================

/**
 * The resolver to use on successful {@link fetch} response. It calls the appropriate method on the {@link Response}
 * object, and automatically handle the promise.
 */
export type Resolver = "text" | "json" | "blob" | "arrayBuffer" | "formData" | "void";

/**
 * Global configuration for a {@link Highway} instance. Values in this configuration are applied to all requests made
 * with the instance. They can all be partially overridden on a per-request basis.
 */
export interface Config {
  /**
   * The base URL to prepend to every request. If not provided, the path provided to the request method must be
   * absolute.
   *
   * The pathname is preserved when merging urls.
   *
   * Example:
   *   const highway = new Highway({ base: "https://example.com/api" });
   *   highway.get("/user"); // GET https://example.com/api/user
   *
   * This behavior differs from the standard URL constructor, which would override the "/api" pathname
   * in the base url.
   */
  base?: URL | string;
  /**
   * Provide default headers to be sent with every request.
   */
  headers?: HeadersInit;
  /**
   * Provide default {@link fetch} configuration for every request.
   */
  requestInit?: Omit<RequestInit, "headers">;
}

// ================================================================================
// REQUEST TYPES
// ================================================================================

export type FetchRequestBodyGet = {
  body?: never;
};

export type FetchRequestBodyPost =
  | {
      bodyResolver: "json";
      body?: any;
    }
  | {
      bodyResolver?: never;
      body?: BodyInit;
    };

export type FetchRequestBodyGetMethods = {
  method: "GET" | "HEAD";
};

export type FetchRequestBodyPostMethods = {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
};

export type FetchRequestResponseResolver =
  | {
      soft: true;
      resolver?: never;
    }
  | {
      soft?: false;
      resolver?: Resolver;
    };

export type FetchRequestBase = {
  path: string | URL;
  headers?: HeadersInit;
  requestInit?: Omit<RequestInit, "headers" | "method" | "body">;
  params?: string | Record<string, string> | URLSearchParams | string[][];
  must?: boolean;
};

export type FetchRequestGet = FetchRequestBase & FetchRequestBodyGet & FetchRequestResponseResolver;
export type FetchRequestPost = FetchRequestBase & FetchRequestBodyPost & FetchRequestResponseResolver;
export type FetchRequest =
  | (FetchRequestGet & FetchRequestBodyGetMethods)
  | (FetchRequestPost & FetchRequestBodyPostMethods);

export type FetchResponseMust<Req extends FetchRequestResponseResolver> =
  // If the request set resolver=text, the response should be of string type.
  Req extends { resolver: "text" }
    ? string
    : // If the request set resolver=json, the response can be any type.
    Req extends { resolver: "json" }
    ? any
    : // If the request set resolver=blob, the response should be of Blob type.
    Req extends { resolver: "blob" }
    ? Blob
    : // If the request set resolver=arrayBuffer, the response should be of ArrayBuffer type.
    Req extends { resolver: "arrayBuffer" }
    ? ArrayBuffer
    : // If the request set resolver=formData, the response should be of FormData type.
    Req extends { resolver: "formData" }
    ? FormData
    : // If the request set resolver=void, the response should be ignored.
    Req extends { resolver: "void" }
    ? void
    : // By default, return the raw response object.
      Response;

export type FetchResponseOptional<Req extends FetchRequestResponseResolver> =
  // If the request set resolver=text, the response should be of string type.
  Req extends { resolver: "text" }
    ? string | void
    : // If the request set resolver=json, the response can be any type.
    Req extends { resolver: "json" }
    ? any
    : // If the request set resolver=blob, the response should be of Blob type.
    Req extends { resolver: "blob" }
    ? Blob | void
    : // If the request set resolver=arrayBuffer, the response should be of ArrayBuffer type.
    Req extends { resolver: "arrayBuffer" }
    ? ArrayBuffer | void
    : // If the request set resolver=formData, the response should be of FormData type.
    Req extends { resolver: "formData" }
    ? FormData | void
    : // If the request set resolver=void, the response should be ignored.
    Req extends { resolver: "void" }
    ? void
    : // By default, return the raw response object.
      Response;

export type FetchResponse<Req extends FetchRequestResponseResolver & { must?: boolean }> = Req extends { must: true }
  ? FetchResponseMust<Req>
  : FetchResponseOptional<Req>;

// ================================================================================
// ERROR TYPES
// ================================================================================

/**
 * Wraps an HTTP response into a convenient error.
 */
export class APIError extends Error {
  // The raw response object.
  private response: Response;
  // Stores the response text once retrieved, because response body can only be read once.
  private responseText: string;
  private responseBodyParsed: boolean;

  constructor(response: Response) {
    // Call the standard error constructor, with the status text as the message.
    // This text is a generic status text, the actual error content is only accessible through the promise returned
    // by the `text` method.
    super(response.statusText);

    // To be able to detect the error type.
    this.name = "APIError";
    this.status = response.status;
    this.response = response;
    this.responseBodyParsed = false;
    this.responseText = "";
  }

  /**
   * Returns the HTTP status of the response.
   */
  status: number;

  /**
   * Returns the text body of the response.
   */
  text = async (): Promise<string> => {
    // Assign the response text if body has not been read yet.
    if (!this.responseBodyParsed) {
      this.responseText = await this.response.text();
    }

    return this.responseText;
  };
}

/**
 * Type checking for {@link APIError}.
 */
export const isAPIError = (error: any): error is APIError => error?.name === "APIError";
