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
}

/**
 * Takes a trigger function, and calls it periodically.
 */
export const usePing = <Req extends any[]>({ call, args, interval }: PingHookParams<Req>): void => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    call(...args);
    intervalRef.current = window.setInterval(() => call(...args), interval);
    return () => window.clearInterval(intervalRef.current);
  }, [call, args, interval]);
};
