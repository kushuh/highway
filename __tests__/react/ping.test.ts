/**
 * @jest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { usePing } from "../../src/react";
import { useState } from "react";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("usePing", () => {
  it("should call the trigger function periodically", async () => {
    const caller = jest.fn();
    renderHook(() => usePing({ call: caller, args: [], interval: 1000 }));

    expect(caller).toHaveBeenCalledTimes(1);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(2);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(3);
  });

  it("should call the trigger function immediately when the arguments change", async () => {
    const caller = jest.fn();
    const { rerender } = renderHook((args) => usePing({ call: caller, args, interval: 1000 }), {
      initialProps: [] as any[],
    });

    expect(caller).toHaveBeenCalledTimes(1);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(2);

    await act(() => {
      rerender([1, 2, 3]);
    });

    expect(caller).toHaveBeenCalledTimes(3);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(4);
  });

  it("should stop calling the trigger function when the component is unmounted", async () => {
    const caller = jest.fn();
    const { unmount } = renderHook(() => usePing({ call: caller, args: [], interval: 1000 }));

    expect(caller).toHaveBeenCalledTimes(1);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(2);

    unmount();

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(2);
  });

  it("should not call the trigger function when the condition is false", async () => {
    const caller = jest.fn();
    const { rerender } = renderHook((condition) => usePing({ call: caller, args: [], interval: 1000, condition }), {
      initialProps: true,
    });

    expect(caller).toHaveBeenCalledTimes(1);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(2);

    await act(() => {
      rerender(false);
    });

    expect(caller).toHaveBeenCalledTimes(2);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(2);

    await act(() => {
      rerender(true);
    });

    expect(caller).toHaveBeenCalledTimes(3);
  });

  it("should call trigger only once, if interval is set to 0", async () => {
    const caller = jest.fn();
    const { rerender } = renderHook((interval) => usePing({ call: caller, args: [], interval }), {
      initialProps: 0,
    });

    expect(caller).toHaveBeenCalledTimes(1);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(1);

    rerender(1000);

    expect(caller).toHaveBeenCalledTimes(2);

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(caller).toHaveBeenCalledTimes(3);
  });
});
