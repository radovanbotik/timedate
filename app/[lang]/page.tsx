import Image from "next/image";
import { DisplayDate } from "../components/DisplayDate";
import { DisplayTime } from "../components/DisplayTime";
import { getDictionary } from "../utility/getDictionary";
import countries from "../lib/countries.json";

export default async function Page(props: { params: { lang: string }; searchParams: { country?: string } }) {
  const lang = props.params.lang;
  const country = props.searchParams.country;

  const countryReference = countries.find(c => c.cca2.toLowerCase() === country?.toLowerCase());

  const dictionary = await getDictionary(lang);
  const serverTime = new Date();

  // console.log(`https://flagcdn.com/96x72/${countryReference.cca2}.png`)

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
          <p>{dictionary.home.subheader}</p>
          {countryReference && (
            <Image
              src={`https://flagcdn.com/96x72/${countryReference.cca2.toLowerCase()}.png`}
              alt={`flag of ${country}`}
              width={96}
              height={72}
              className="w-12 h-9"
            ></Image>
          )}
        </div>
        <DisplayTime serverTime={serverTime} locale={lang} dateTimeFormatOptions={timeOptions} />
        <DisplayDate serverTime={serverTime} locale={lang} dateTimeFormatOptions={dateOptions} />
      </div>
    </div>
  );
}
