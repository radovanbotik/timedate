import { DisplayDate } from "../components/DisplayDate";
import { DisplayTime } from "../components/DisplayTime";
import { getDictionary } from "../utility/getDictionary";
import { headers } from "next/headers";
export default async function Page(props: { params: { lang: string } }) {
  const lang = props.params.lang;
  const dictionary = await getDictionary(lang);
  const responseHeaders = headers();
  const serverTime = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return (
    <div>
      <div className="h-dvh flex flex-col items-center justify-center gap-5">
        <div className="text-center">
          <p>{dictionary.home.header}</p>
          <p>
            {dictionary.home.subheader} <span>city,country</span>{" "}
          </p>
        </div>
        <DisplayTime serverTime={serverTime} locale={lang} dateTimeFormatOptions={timeOptions} />
        <DisplayDate serverTime={serverTime} locale={lang} dateTimeFormatOptions={dateOptions} />
      </div>
    </div>
  );
}
