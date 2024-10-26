"use client";
import { useEffect, useState } from "react";
import { generateTime, toLocalTime } from "../utility/timeDate";

type TTime = {
  serverTime: Date;
  locale?: Intl.LocalesArgument;
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;
};

export function DisplayTime({ serverTime, locale }: TTime) {
  const [time, setTime] = useState(new Date());
  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    if (window !== undefined) setIsInit(true);
    const interval = setInterval(() => {
      const newTime = generateTime();
      setTime(newTime);
    }, 1000);
    return function cleanUp() {
      clearInterval(interval);
      setIsInit(false);
    };
  }, []);
  const localizedTime = toLocalTime(time, locale);
  return (
    <>
      {isInit && (
        <time className="tabular-nums text-7xl" suppressHydrationWarning>
          {localizedTime}
        </time>
      )}
    </>
  );
}
