import Image from "next/image";
import clm from "country-locale-map";
import { getDictionary } from "../utility/getDictionary";
import countries from "../lib/countries.json";
import dynamic from "next/dynamic";
import Link from "next/link";

function getBCP47CountryCode(country: string) {
  return clm.getLocaleByAlpha2(country.toUpperCase())?.replace("_", "-");
}

export default async function Page(props: { params: { lang: string }; searchParams: { country?: string } }) {
  const lang = props.params.lang;
  const country = props.searchParams.country || "us";
  const countryReference = countries.find(c => c.cca2.toLowerCase() === country?.toLowerCase());

  const dictionary = await getDictionary(lang);

  const BCP47 = getBCP47CountryCode(lang);

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
    timeZone: "Europe/Bucharest",
  };

  const DisplayTime = dynamic(() => import("../components/DisplayTime"), { ssr: false });
  const DisplayDate = dynamic(() => import("../components/DisplayDate"), { ssr: false });

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-5">
      <div className="flex gap-5">
        <Link
          className={"font-bold text-sm flex gap-1 items-center"}
          href={{
            pathname: "/en",
            query: {
              country: country,
            },
          }}
          replace
        >
          <Image
            src={`https://flagcdn.com/96x72/gb.png`}
            alt={`flag of Great Britain`}
            width={96}
            height={72}
            className="w-6 h-4"
          ></Image>
          <span>EN</span>
        </Link>

        <Link
          className={"font-bold text-sm flex gap-1 items-center"}
          href={{
            pathname: "/hu",
            query: {
              country: country,
            },
          }}
          replace
        >
          <Image
            src={`https://flagcdn.com/96x72/hu.png`}
            alt={`flag of Hungary`}
            width={96}
            height={72}
            className="w-6 h-4"
          ></Image>
          <span>HU</span>
        </Link>

        <Link
          className={"font-bold text-sm flex gap-1 items-center"}
          href={{
            pathname: "/sk",
            query: {
              country: country,
            },
          }}
          replace
        >
          <Image
            src={`https://flagcdn.com/96x72/sk.png`}
            alt={`flag of slovakia`}
            width={96}
            height={72}
            className="w-6 h-4"
          ></Image>
          <span>SK</span>
        </Link>
      </div>
      <div className="text-center flex flex-col items-center">
        <p className="text-center text-2xl">{dictionary.home.greeting}</p>
        <p className="text-lg">{dictionary.home.location}</p>
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
      <p className="text-center">{dictionary.home.currentTime}</p>
      <DisplayTime locale={BCP47} dateTimeFormatOptions={timeOptions} />
      <DisplayDate locale={BCP47} dateTimeFormatOptions={dateOptions} />
    </div>
  );
}
