import Image from "next/image";
import clm from "country-locale-map";
import { DisplayDate } from "../components/DisplayDate";
import { DisplayTime } from "../components/DisplayTime";
import { getDictionary } from "../utility/getDictionary";
import { basicFilter } from "bcp-47-match";
import countries from "../lib/countries.json";

function getBCP47CountryCode(country: string) {
  return clm.getLocaleByAlpha2(country.toUpperCase())?.replace("_", "-");
}

export default async function Page(props: { params: { lang: string }; searchParams: { country?: string } }) {
  const lang = props.params.lang;
  const country = props.searchParams.country || "us";
  const countryReference = countries.find(c => c.cca2.toLowerCase() === country?.toLowerCase());

  const dictionary = await getDictionary(lang);
  const serverTime = new Date();

  const BCP47 = getBCP47CountryCode(country);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Europe/Bucharest",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Bucharest",
  };

  return (
    <div>
      <div className="h-dvh flex flex-col items-center justify-center gap-5">
        <div className="text-center">
          <p className="text-center">{dictionary.home.header}</p>
          <p className="text-center">{dictionary.home.subheader}</p>
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
        <DisplayTime serverTime={serverTime} locale={BCP47} dateTimeFormatOptions={timeOptions} />
        <DisplayDate serverTime={serverTime} locale={BCP47} dateTimeFormatOptions={dateOptions} />
      </div>
    </div>
  );
}
