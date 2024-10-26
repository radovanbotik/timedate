"use client";
import { useEffect, useState } from "react";
import { generateTime, toLocalTime } from "../utility/timeDate";

type TTime = {
  serverTime: Date;
  locale?: Intl.LocalesArgument;
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;
};

export default function DisplayTime({ serverTime, locale, dateTimeFormatOptions }: TTime) {
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

  const localizedTime = toLocalTime(time, locale, dateTimeFormatOptions);
  return (
    <time dateTime={toLocalTime(time, locale, dateTimeFormatOptions)} className="tabular-nums text-7xl">
      {localizedTime}
    </time>
  );
}
