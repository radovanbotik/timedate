import Image from "next/image";
import { DisplayDate } from "../components/DisplayDate";
import { DisplayTime } from "../components/DisplayTime";
import { getDictionary } from "../utility/getDictionary";
import { cookies } from "next/headers";
export default async function Page(props: { params: { lang: string } }) {
  // const CCA2 = cookies().get("country")?.value.toLowerCase();
  const lang = props.params.lang;
  const dictionary = await getDictionary(lang);
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
          <p>{dictionary.home.subheader}</p>
          {/* <Image src={`https://flagcdn.com/96x72/${CCA2}.png`} alt={lang} width={32} height={32}></Image> */}
        </div>
        <DisplayTime serverTime={serverTime} locale={lang} dateTimeFormatOptions={timeOptions} />
        <DisplayDate serverTime={serverTime} locale={lang} dateTimeFormatOptions={dateOptions} />
      </div>
    </div>
  );
}
