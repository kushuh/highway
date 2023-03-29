/**
 * @jest-environment jsdom
 */
import { act, renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../../src/react";
import { APIError } from "../../src";
import { Response } from "undici";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("useFetch", () => {
  it("should return the result of the api, as a state", async () => {
    const caller = jest.fn().mockReturnValue(new Promise((resolve) => setTimeout(() => resolve("hello world"), 1000)));
    const { result } = renderHook(() => useFetch({ call: caller }));

    // No call made.
    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBeUndefined();
      expect(result.current.apiError).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(caller).not.toHaveBeenCalled();
    });

    await act(() => {
      result.current.trigger({ headers: { "Content-Type": "application/json" } });
    });

    jest.advanceTimersByTime(510);

    // Loading.
    await waitFor(() => {
      expect(result.current.loading).toBeTruthy();
      expect(result.current.response).toBeUndefined();
      expect(result.current.apiError).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(caller).toHaveBeenCalledTimes(1);
      expect(caller).toHaveBeenCalledWith({ headers: { "Content-Type": "application/json" } });
    });

    jest.advanceTimersByTime(510);

    // Response received.
    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBe("hello world");
      expect(result.current.apiError).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(caller).toHaveBeenCalledTimes(1);
    });
  });

  it("should handle error", async () => {
    const caller = jest
      .fn()
      .mockReturnValue(new Promise((resolve, reject) => setTimeout(() => reject("it broken"), 1000)));
    const { result } = renderHook(() => useFetch({ call: caller }));

    await act(() => {
      result.current.trigger({ headers: { "Content-Type": "application/json" } });
    });

    jest.advanceTimersByTime(510);

    // Loading.
    await waitFor(() => {
      expect(result.current.loading).toBeTruthy();
      expect(result.current.response).toBeUndefined();
      expect(result.current.apiError).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(caller).toHaveBeenCalledTimes(1);
      expect(caller).toHaveBeenCalledWith({ headers: { "Content-Type": "application/json" } });
    });

    jest.advanceTimersByTime(510);

    // Response received.
    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBeUndefined();
      expect(result.current.apiError).toBeUndefined();
      expect(result.current.error).toBe("it broken");
      expect(caller).toHaveBeenCalledTimes(1);
    });
  });

  it("should handle APIError", async () => {
    const resp = new Response("it broken", { status: 404 });
    // @ts-ignore
    const apiErr = new APIError(resp);
    const caller = jest.fn().mockReturnValue(new Promise((resolve, reject) => setTimeout(() => reject(apiErr), 1000)));
    const { result } = renderHook(() => useFetch({ call: caller }));

    await act(() => {
      result.current.trigger({ headers: { "Content-Type": "application/json" } });
    });

    jest.advanceTimersByTime(510);

    // Loading.
    await waitFor(() => {
      expect(result.current.loading).toBeTruthy();
      expect(result.current.response).toBeUndefined();
      expect(result.current.apiError).toBeUndefined();
      expect(result.current.error).toBeUndefined();
      expect(caller).toHaveBeenCalledTimes(1);
      expect(caller).toHaveBeenCalledWith({ headers: { "Content-Type": "application/json" } });
    });

    jest.advanceTimersByTime(1000);

    // Response received.
    await waitFor(async () => {
      expect(result.current.loading).toBeFalsy();
      expect(result.current.response).toBeUndefined();
      expect(result.current.apiError).toBeDefined();
      expect(result.current.apiError?.status).toEqual(404);
      expect(await result.current.apiError?.text()).toBe("it broken");
      expect(result.current.error).toBeUndefined();
      expect(caller).toHaveBeenCalledTimes(1);
    });
  });
});
