"use client";

import { useEffect, useState } from "react";
import { generateTime, toLocalDate } from "../utility/timeDate";
import { intlFormat } from "date-fns";

type TDate = {
  serverTime: Date;
  locale?: Intl.LocalesArgument;
  dateTimeFormatOptions?: Intl.DateTimeFormatOptions;
};

export default function DisplayDate({ serverTime, locale, dateTimeFormatOptions }: TDate) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = generateTime();
      setDate(newDate);
    }, 1000);
    return function cleanUp() {
      clearInterval(interval);
    };
  }, []);

  const localizedDate = toLocalDate(date, locale, dateTimeFormatOptions);

  return (
    <>
      <time className="tabular-nums text-3xl">{localizedDate}</time>
    </>
  );
}
