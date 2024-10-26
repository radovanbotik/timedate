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
  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = generateTime();
      setTime(newTime);
    }, 1000);
    return function cleanUp() {
      clearInterval(interval);
    };
  }, []);
  const localizedTime = toLocalTime(time, locale);
  return (
    <time className="tabular-nums text-7xl" suppressHydrationWarning>
      {localizedTime}
    </time>
  );
}
