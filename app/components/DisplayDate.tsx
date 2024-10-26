"use client";

import { useEffect, useState } from "react";
import { generateTime, toLocalDate } from "../utility/timeDate";
import { intlFormat } from "date-fns";

type TDate = {
  serverTime: Date;
  locale?: Intl.LocalesArgument;
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;
};

export function DisplayDate({ serverTime, locale, dateTimeFormatOptions }: TDate) {
  const [date, setDate] = useState(serverTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = generateTime();
      setDate(newDate);
    }, 1000);
    return function cleanUp() {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <time className="tabular-nums text-3xl" suppressHydrationWarning>
        {toLocalDate(date, locale, dateTimeFormatOptions)}
      </time>
    </>
  );
}
