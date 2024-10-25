"use client";
import { useEffect, useState } from "react";
import { generateTime, toLocalTime } from "../utility/timeDate";

type TTime = {
  serverTime: Date;
  locale?: Intl.LocalesArgument;
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;
};

export function DisplayTime({ serverTime, locale, dateTimeFormatOptions }: TTime) {
  const [time, setTime] = useState(serverTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = generateTime();
      setTime(newTime);
    }, 1000);
    return function cleanUp() {
      clearInterval(interval);
    };
  }, []);

  return (
    <time dateTime={time.toDateString()} className="tabular-nums text-7xl">
      {toLocalTime(time, locale, dateTimeFormatOptions)}
    </time>
  );
}
