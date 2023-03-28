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

/**
 * This interface contains options to parse the request output.
 */
export type RequestResolverParams = {
  /**
   * When given, throws an error if the response body is empty. Otherwise, an empty body will yield an undefined
   * response (with no error).
   *
   * NOTE: this is INDEPENDENT of the response status. If this flag is set to true, and the fetch call returns a
   * 204 response (no content), an error will still be thrown. On the other hand, having any status code returning
   * an empty body will not throw any error, if this flag is set to false.
   */
  must?: boolean;
} & (
  | {
      /**
       * When set to true, a non-ok response will not throw an error, but be returned as is, like the standard API would.
       * This option is not compatible with resolvers.
       */
      soft: true;
      resolver?: never;
    }
  | {
      soft?: false;
      /**
       * If set, automatically parse the response body according to the expected output.
       * By default, the raw {@link Response} object is returned.
       */
      resolver?: Resolver;
    }
);

/**
 * Generic configurations for requests with body.
 */
export type RequestBodyParams =
  | {
      body: BodyInit;
    }
  | {
      bodyResolver: "json";
      body: any;
    };

export type RequestMinimalParamsNoBody = {
  /**
   * Method to use for the request.
   */
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /**
   * Path of the request. It may be a relative path, but only if the instance has a base url already set.
   */
  path: string | URL;
  body?: never;
};

export type RequestMinimalParamsBody = RequestBodyParams & {
  /**
   * Method to use for the request.
   */
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  /**
   * Path of the request. It may be a relative path, but only if the instance has a base url already set.
   */
  path: string | URL;
};

/**
 * This interface contains the remaining configuration options for a request, that are not present in
 * {@link RequestMinimalParams}.
 */
export interface RequestOptionalParams {
  /**
   * Optional headers for the request. They are merged with (and override) the class headers if any.
   */
  headers?: HeadersInit;
  /**
   * Optional parameters for the request. They are merged with (and override) the class parameters if any.
   */
  requestInit?: Omit<RequestInit, "headers" | "method" | "body">;
  /**
   * Optional url parameters to add to the request path.
   */
  params?: string | Record<string, string> | URLSearchParams | string[][];
}

export type RequestParamsBody = RequestMinimalParamsBody & RequestOptionalParams & RequestResolverParams;

export type RequestParamsNoBody = RequestMinimalParamsNoBody & RequestOptionalParams & RequestResolverParams;

export type RequestParams = RequestParamsBody | RequestParamsNoBody;

// ================================================================================
// RESPONSE TYPES
// ================================================================================

/**
 * Automatically set the response type based on the resolver configuration.
 */
export type ResponseType<R extends RequestResolverParams> =
  // If the request set resolver=text, the response should be of string type.
  R extends { resolver: "text" }
    ? string
    : // If the request set resolver=json, the response can be any type.
    R extends { resolver: "json" }
    ? any
    : // If the request set resolver=blob, the response should be of Blob type.
    R extends { resolver: "blob" }
    ? Blob
    : // If the request set resolver=arrayBuffer, the response should be of ArrayBuffer type.
    R extends { resolver: "arrayBuffer" }
    ? ArrayBuffer
    : // If the request set resolver=formData, the response should be of FormData type.
    R extends { resolver: "formData" }
    ? FormData
    : // If the request set resolver=void, the response should be ignored.
    R extends { resolver: "void" }
    ? void
    : // By default, return the raw response object.
      Response;

/**
 * Extends the {@link ResponseType} type to accept undefined (void) return values.
 */
export type ExtendedResponseType<R extends RequestResolverParams> =
  // Only if a resolver is set, can the response be undefined.
  R extends { must?: false; resolver: Resolver } ? ResponseType<R> | undefined : ResponseType<R>;

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
  private responseText?: string;

  constructor(response: Response) {
    // Call the standard error constructor, with the status text as the message.
    // This text is a generic status text, the actual error content is only accessible through the promise returned
    // by the `text` method.
    super(response.statusText);

    // To be able to detect the error type.
    this.name = "APIError";
    // Prevent errors if attempting to access the response body externally.
    this.response = response.clone();
  }

  /**
   * Returns the HTTP status of the response.
   */
  status = () => this.response.status;

  /**
   * Returns the text body of the response.
   */
  text = async (): Promise<string> => {
    // Assign the response text if body has not been read yet.
    if (!this.responseText) {
      this.responseText = await this.response.text();
    }

    return Promise.resolve(this.responseText);
  };
}

/**
 * Type checking for {@link APIError}.
 */
export const isAPIError = (error: unknown): error is APIError => error instanceof APIError;
