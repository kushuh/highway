![npm](https://img.shields.io/npm/v/@anovel/highway)
![NPM](https://img.shields.io/npm/l/@anovel/highway)
![Codecov](https://img.shields.io/codecov/c/gh/kushuh/highway)

# Highway

A minimalistic, modern, configuration centric, strongly typed alternative to fetch API.

```bash
npm i @anovel/highway
```

With Highway.

```typescript
import { createInstance } from '@anovel/highway';

const baseAPI = createInstance({
  base: "https://example.com/api",
  headers: { "Content-Type": "application/json" },
});

const moviesAPI = baseAPI.createInstance({ base: "/movies" });

// GET https://example.com/api/movies/{id}
const getMovie = (id: string): Promise<MovieResponse | undefined> => 
  moviesAPI.get({ path: `/${id}`, resolver: "json" });

// myMovie is of type MovieResponse | undefined.
const myMovie = await getMovie("123");
```

With fetch API.

```typescript
const baseURL = "https://example.com/api";
const moviesURL = `${baseURL}/movies`;

const getMovie = async (id: string): Promise<MovieResponse | undefined> => {
  const response = await fetch(`${moviesURL}/${id}`, {
    // Headers are passed manually.
    headers: { "Content-Type": "application/json" },
  });
  
  if (response.ok) {
    return await response.json();
  }
  
  throw new Error(await response.text());
};

// myMovie is of type MovieResponse | undefined.
const myMovie = await getMovie("123");
```

- [About](#about)
- [Usage](#usage)
  - [Basic usage](#basic-usage)
  - [Error handling](#error-handling)
  - [Automatic response parsing](#automatic-response-parsing)
  - [Automatic body parsing](#automatic-body-parsing)
  - [Search params](#search-params)
- [Creating instances](#create-instances)
- [Configuration](#configuration)
  - [Headers](#headers)
  - [RequestInit](#requestinit)
  - [baseURL](#base-url)
- [React Hook](#react-hook)
  - [Lifecycle](#lifecycle)
  - [Hook configuration](#hook-configuration)

## About

Highway aims to implement some convenient features of established frameworks such as axios, inside a minimalistic
package that relies on the most recent web APIs.

It is built with the following constraints in mind:
- **Minimalistic**: Highway only imports dev dependencies, and relies on no external APIs but the ones
that are natively implemented inside modern browser/node environments.
- **Configuration centric**: Highway's implementation can be configured at instance level, reducing boilerplate
for large projects. New child instances can be derived from any instance, inheriting their configuration.
- **Conform**: Highway aims to extend the standard API features, not to replace them. It adds some convenience,
such as request configuration or [automatic response parsing](#automatic-response-parsing), but keeps all features
of the standard API. By default, it is almost no different to the standard API.
- **Strongly typed**: Highway makes large use of TypeScript's features, to give clear guidance and feedback to the 
developer.

## Usage

### Basic usage

You can import the `handle` method from the package, which is the closest you'll get to the fetch API. Here
is an example to illustrate some key differences between the 2:

```typescript
import { handle } from '@anovel/highway';

// Standard fetch API.
const response = await fetch("https://example.com/movies.json");

// With Highway. Note that we use a single object argument, and the method is required.
// The return object is the same as fecth, a Response object.
const response = await handle({ path: "https://example.com/movies.json", method: "GET" });
```

Preconfigured handlers are also available out of the box, so you can get rid of the `method` argument:

```typescript
// Delete is aliased to destroy, as it is a standard keyword in JavaScript.
import { get, post, put, patch, destroy } from '@anovel/highway';

// Body param is forbidden at typescript level on the get request, so you don't 
// set it by mistake.
const response = await get({ path: "https://example.com/movies.json" });

// Body is optional for the following requests. By default, 
// it takes the same input as fetch: a BodyInit object.
const response = await post({ 
  path: "https://example.com/movies.json", 
  body: JSON.stringify({ title: "The Matrix" }),
});
const response = await put({ 
  path: "https://example.com/movies.json", 
  body: JSON.stringify({ title: "The Matrix" }),
});
const response = await patch({
  path: "https://example.com/movies.json",
  body: JSON.stringify({ title: "The Matrix" }),
});
const response = await destroy({ 
  path: "https://example.com/movies.json", 
  body: JSON.stringify({ title: "The Matrix" }),
});
```

> If you use this package in a Node environment, and are not using 
> [automatic response parsing](#automatic-response-parsing), make sure to either consume the response body, or
> use a method that does not return a body. NodeJS's implementation does not garbage collect the response if it
> is not consumed (see https://github.com/nodejs/undici/blob/main/README.md#garbage-collection).

### Error handling

By default, Highway will throw an error if the response status is not in the 200-299 range.

```typescript
import { handle } from '@anovel/highway';

// Will return response with ok=false if status is not in the 200-299 range.
const response = await fetch("https://example.com/invalid-movie.json");

// With throw an APIError if status is not in the 200-299 range.
const response = await handle({ path: "https://example.com/movies.json", method: "GET" });
```

Errors can be thrown at multiple place. The `APIError` type is reserved when the fetch call returned a successful,
non-200 status code. Other errors are thrown as a standard `Error`, that should be handled in priority as they are
likely mistakes from the developer.

Highway provides a handler to detect API errors.

```typescript
import { handle, isAPIError } from '@anovel/highway';

try {
  const response = await handle({ path: "https://example.com/invalid-movie.json", method: "GET" });
} catch (error) {
  if (isAPIError(error)) {
    console.error(error.message); // Prints the status message.
    console.error(error.status); // Prints the status code.
    console.error(await error.text()); // Print the actual body of the response.
  } else {
    // Handle other errors.
  }
}
```

You can fall back to the standard fetch behavior, and return the response object without throwing on non-200 code.
Add the `soft` option to the request configuration.

```typescript
import { handle } from '@anovel/highway';

// Will not throw, even if the status is not in range 200-299.
const response = await handle({
  path: "https://example.com/invalid-movie.json",
  method: "GET", soft: true,
});
```

> Note: the `soft` option is NOT compatible with [automatic response parsing](#automatic-response-parsing), as the response
> body may not have the expected type.

### Automatic response parsing

It can be cumbersome to manually parse the response body, as it requires yet another promise, with a failure risk
(if you use the wrong parser, for example).

It is possible to simplify the whole process by specifying a resolver, that will constraint the response type for you.

```typescript
import { handle } from '@anovel/highway';

// Automatically parses request with the `json()` method, and returns an object of type any.
const response = await handle({ 
  path: "https://example.com/movies.json", 
  method: "GET", resolver: "json",
});
```

With resolvers, the appropriate parser is called on the response body stream, and its result is returned directly.
The following resolvers are available, with their return type.

| Resolver        | Return type   |
|-----------------|---------------|
| `"json"`        | `any`         |
| `"text"`        | `string`      |
| `"blob"`        | `Blob`        |
| `"arrayBuffer"` | `ArrayBuffer` |
| `"formData"`    | `FormData`    |
| `"void"`        | `undefined`*  |

* `void` ignores the response body if given. It does not need to get a specific status such as 204.

By default, the return type can be undefined if a resolver is specified. This can happen on no-content statuses, such
as 204.

To force the response to be defined, and throw error on null streams, you can use the `must` option.

```typescript
import { handle } from '@anovel/highway';

// Response is of type Blob | undefined.
const response = await handle({ 
  path: "https://example.com/movies.json", 
  method: "GET", resolver: "blob",
});


// Response is of type Blob.
const response = await handle({ 
  path: "https://example.com/movies.json",
  method: "GET", resolver: "blob", must: true,
});
```

> **Good to know**: if no resolver is set, the `must` option will still throw on empty response body. It does not affect
> the return type, since without a resolver, a response object is always expected to be returned.

### Automatic body parsing

By default, the fetch API expects a `BodyInit` object as the request body. So JSON objects must be serialized, which
can be cumbersome.

Similar to response resolvers, you can set a body resolver, so Highway will take care, for you, of the serialization.

```typescript
import { handle } from '@anovel/highway';

const response = await handle({
  path: "https://example.com/movies.json",
  // Now, body is not constrained to BodyInit anymore, and can be any serializable object.
  method: "GET", bodyResolver: "json", body: {foo: "bar"},
});
```

> For now, only the `"json"` body serializer is supported. Other formats may come in future releases.

### Search params

You can set additional params directly in the configuration. If the provided path has params, they will be merged.

```typescript
import { handle } from '@anovel/highway';

// Will make a request to https://example.com/movies.json?foo=bar,baz&id=42&bar=foo
const response = await handle({
  path: "https://example.com/movies.json?foo=bar&id=42",
  method: "GET", bodyResolver: "json", params: {foo: "baz", bar: "foo"},
});
```

The value for search params is any argument accepted by the `URLSearchParams` constructor.

## Create instances

You can create multiple Highway instances, with different configurations (see the [Configuration](#configuration) section
below).

```typescript
import { createInstance } from '@anovel/highway';

const myInstance = createInstance({ base: "https://example.com", requestInit: { mode: "cors" } });

// Inherits from myInstance configuration.
const myAPIInstance = myInstance.createInstance({ base: "/api" });
```

When creating new instances, configuration parameters are merged in the following order (from top to bottom priority):
 - request level
 - instance level
 - parent instance level

For example:


```typescript
import { createInstance } from '@anovel/highway';

const myInstance = createInstance({ 
  base: "https://example.com",
  headers: { 
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Age: "42",
  },
});

// Inherits from myInstance configuration.
const myAPIInstance = myInstance.createInstance({ 
  base: "/api", 
  headers: { 
    Authorization: "Bearer [token]",
    Age: "24",
  },
});

const response = await myAPIInstance.handle({
  path: "/movies.json",
  method: "GET",
  headers: { "Content-Type": "application/xml" },
});

// Headers will be:
// {
//   "Age": "24",
//   "Authorization": "Bearer [token]",
//   "Content-Type": "application/xml",
//   "Cache-Control": "no-cache",
// }
```

## Configuration

So far, we saw how Highway provides some per-request configuration, to extend some fetch API behavior.

Additional configuration is available, at both request and instance scale.

| Option        | Type                                            | Description                                                  |
|---------------|-------------------------------------------------|--------------------------------------------------------------|
| `headers`     | `HeadersInit`                                   | Set request headers.                                         |
| `requestInit` | `Omit<RequestInit, "headers"  "method" "body">` | Standard fetch API configuration, stripped from some fields. |
| `base`        | `string or URL`                                 | Base URL for all requests.                                   |

### Headers

```typescript
import { handle, createInstance } from '@anovel/highway';

// At request level.
const response = await handle({
  path: "https://example.com/movies.json",
  method: "GET", headers: { "Content-Type": "application/json" },
});

// At instance level.
const highway = createInstance({ headers: { "Content-Type": "application/json" } });
```

### RequestInit

```typescript
import { handle, createInstance } from '@anovel/highway';

// At request level.
const response = await handle({
  path: "https://example.com/movies.json",
  method: "GET", requestInit: { mode: "cors" },
});

// At instance level.
const highway = createInstance({ requestInit: { mode: "cors" } });
```

`RequestInit` is what you would typically pass to the `fetch` method, in the standard API. It omits some fields, as
they have their own setup already.

### Base URL

This one is particular, as it behaves slightly differently on request and instance levels.

The request level argument is `path`. By default, it must be a full, valid URL. You can specify an instance level path
(named `base`). When applied, the request path will be resolved against the base URL, and can then be relative.

```typescript
import { handle, createInstance } from '@anovel/highway';

const myInstance = createInstance({ base: "https://example.com" });

// Would throw an invalid URL error, if no base path was set.
// Makes a call against https://example.com/movies.json
const response = await myInstance.handle({ path: "/movies.json", method: "GET" });
```

You can also concatenate base paths across inherited instances.

```typescript
import { handle, createInstance } from '@anovel/highway';

const myInstance = createInstance({ base: "https://example.com" });
const myAPIInstance = myInstance.createInstance({ base: "/api" });

// Makes a call against https://example.com/api/movies.json
const response = await myAPIInstance.handle({ path: "/movies.json", method: "GET" });
```

URL search params can be merged too.

```typescript
import { handle, createInstance } from '@anovel/highway';

const myInstance = createInstance({ base: "https://example.com?foo=bar&id=42" });
const myAPIInstance = myInstance.createInstance({ base: "/api?foo=baz" });

// Makes a call against https://example.com/api/movies.json?foo=bar,baz&id=42,20&page=20
const response = await myAPIInstance.handle({ path: "/movies.json?page=20&id=20", method: "GET" });
```

When merging path, only the last declared host is kept. If a path is declared with a host (absolute path), it
overrides all parent paths, as hosts cannot be merged.

```typescript
import { handle, createInstance } from '@anovel/highway';

const myInstance = createInstance({ base: "https://example.com/app" });
const myAPIInstance = myInstance.createInstance({ base: "https://google.apple/api" });

// Makes a call against https://google.apple/api/movies.json
// Note how the "/app" pathname of the first instance has also been ignored.
const response = await myAPIInstance.handle({ path: "/movies.json", method: "GET" });
```

> The first path to be declared MUST BE absolute, whether it is defined at instance or request level.
> Once a valid absolute path is set, every child paths can be relative.

## React Hook

Highway provides a React hook, to easily handle API responses as React states.

```tsx
import { useEffect, FC } from "react";

import { get } from '@anovel/highway';
import { useFetch } from '@anovel/highway/react';

const myAPICall = (id: string): Promise<MovieResponse | undefined> =>
  get({ path: `https://example.com/api/${id}`, resolver: "json" });

const MyReactComponent: FC<{ id: string }> = ({ id }) => {
  const { trigger, loading, response, apiError, error } = useFetch({ call: myAPICall });
  
  // Trigger the api every time the ID changes.
  useEffect(() => {
    trigger(id);
  }, [id, trigger]);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  // APIError is only returned when a valid response was receiver, with a 
  // non-200 status code.
  if (apiError) {
    return <p>API Error: {apiError.message}</p>;
  }
  if (error) {
    return <p>Unexpected Error: {error.message}</p>;
  }
  
  return <p>{response?.title}</p>;
};
```

The hook takes a single required parameter, which is an async method that returns a specific result. 

Note how, outside the `APIError` type, it is completely independent of Highway. You could perfectly use this hook
with the standard `fetch` API, or any other API client (such as axios).

```tsx
import { useEffect, FC } from "react";

import { get } from '@anovel/highway';
import { useFetch } from '@anovel/highway/react';

const MyReactComponent: FC<{ id: string }> = ({ id }) => {
  // Just use it as a generic fetch handler. Here, response would have the 
  // global Response type.
  const { trigger, loading, response, apiError, error } = useFetch({ call: fetch });
  
  useEffect(() => {
    // Here, the signature of trigger matches the signature of the method 
    // we provided to it.
    trigger(`https://example.com/api/${id}`, { method: "GET" });
  }, [id, trigger]);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (apiError) {
    return <p>API Error: {apiError.message}</p>;
  }
  if (error) {
    return <p>Unexpected Error: {error.message}</p>;
  }
  
  return <p>{response?.title}</p>;
};
```

### Lifecycle

During a typical http fetch, you'll trigger a request, wait for a response with a Promise, then either pick the
response result or handle the error. You'll find all those steps in the hook:

- **Initial state**: loading is false, and every variable is empty except for trigger.
- **Call `trigger`**: Trigger takes the input of your typical fetch request, but returns nothing. Since we are in
a React environment, updates will come from states changes, rather than manually waiting for Promises.
- **Loading**: As soon as `trigger` is fired, loading state is updated at `true`.
- **Response**: When a response is received within the hook, it is cast to the `response` state. Note the hook does
not validate the response for you. It only parses errors if the handler throws something. So if you use the standard
fetch API, for example, non-200 statuses will still write to the `response` state, and leave errors empty.
- **Error**: If the given handler throws, the hook leaves the previous response state untouched, and writes the error
to either `error` or `apiError` (depending on the error type). If you use a library that doesn't support APIError, then
you may only look at the `error` state.

### Hook configuration

`useFetch` accepts additional configuration options, although only `call` is required.

```tsx
import { useEffect, FC } from "react";

import { get } from '@anovel/highway';
import { useFetch } from '@anovel/highway/react';

const MyReactComponent: FC<{ id: string }> = ({ id }) => {
  const fetcher = useFetch({ 
    call: fetch, 
    // The initial parameter is used as a temporary value for the response state,
    // until a valid response is retrieved from the API.
    initial: { id: 42 },
    // This handler is triggered every time a new call is made.
    onLoading: () => console.log("Loading..."),
  });
};
```
