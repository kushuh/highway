import { useEffect, useRef } from "react";

export interface PingHookParams<Req extends any[]> {
  /**
   * The trigger to be periodically called.
   */
  call: (...req: Req) => void;
  /**
   * The arguments for the trigger. A new trigger is performed immediately when those arguments change, resetting the cycle.
   */
  args: Req;
  /**
   * The interval in milliseconds.
   */
  interval: number;
  /**
   * The condition for the trigger to be called. If not specified, the trigger is called unconditionally.
   */
  condition?: boolean;
}

/**
 * Takes a trigger function, and calls it periodically.
 */
export const usePing = <Req extends any[]>({ call, args, interval, condition }: PingHookParams<Req>): void => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (condition === false) return;

    call(...args);
    intervalRef.current = window.setInterval(() => call(...args), interval);
    return () => window.clearInterval(intervalRef.current);
  }, [call, args, interval, condition]);
};
