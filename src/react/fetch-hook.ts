import "client-only";

import { APIError, isAPIError } from "../types";
import { useCallback, useState } from "react";

export interface FetchHookParams<Res, Req extends any[]> {
  /**
   * The async function that will be called when the hook is triggered. It must return a promise. If an error is returned
   * by the API, it should be of type {@link APIError}.
   */
  call: (...req: Req) => Promise<Res>;
  /**
   * An initial value to be used before any call is made. Once a call has been triggered, if an error occurred, the
   * last response object is kept, and its value can still be used as a fallback.
   */
  initial?: Res;
  /**
   * An optional handler, to trigger whenever loading state switches to true.
   */
  onLoading?: () => void;
}

export interface FetchHookResult<Res, Req extends any[]> {
  /**
   * Triggers the api call. When called, loading is set to true until the call completes.
   *
   * If an error of type {@link APIError} is returned, it is stored in the {@link apiError} property. If any other
   * error occurs, it is stored in the {@link error} property.
   *
   * On error, the previous value of {@link response} is kept, and can still be used as a fallback. Otherwise, the
   * response value is updated according to the API results.
   */
  trigger: (...req: Req) => void;
  /**
   * Indicates if a call is currently processing.
   */
  loading: boolean;
  /**
   * The last returned response object, if any.
   */
  response?: Res;
  /**
   * If an error is returned by the API, it is stored here. If any other error occurs, it is stored in the
   * {@link error} property.
   */
  apiError?: APIError;
  /**
   * If an error is returned by the API, it is stored in the {@link apiError} property. If any other error occurs, it
   * is stored here.
   */
  error?: unknown;
  /**
   * Force the {@link response} value.
   */
  setResponse: (res?: Res) => void;
  /**
   * Force the {@link apiError} value.
   */
  setAPIError: (err?: APIError) => void;
  /**
   * Force the {@link error} value.
   */
  setError: (err?: unknown) => void;
}

export const useFetch = <Res, Req extends any[]>({
  call,
  initial,
  onLoading,
}: FetchHookParams<Res, Req>): FetchHookResult<Res, Req> => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(initial);
  const [apiError, setAPIError] = useState<APIError>();
  const [error, setError] = useState<unknown>();

  const trigger = useCallback(
    async (...req: Req) => {
      setLoading(true);
      onLoading?.();

      try {
        const res = await call(...req);
        setResponse(res);
        setAPIError(undefined);
        setError(undefined);
      } catch (e) {
        if (isAPIError(e)) {
          setAPIError(e);
        } else {
          setError(e);
        }
      }

      setLoading(false);
    },
    [call, onLoading]
  );

  return {
    trigger,
    loading,
    response,
    apiError,
    error,
    setResponse,
    setAPIError,
    setError,
  };
};
