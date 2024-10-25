import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import countries from "./app/lib/countries.json";
//https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/middleware.ts

const locales = ["en", "sk", "hu"];
const defaultLocale = "en";

type TLanguage = {
  cca: string;
  currencies: {
    [currency: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [language: string]: {
      name: string;
      symbol: string;
    };
  };
  flag: string;
};

function getLocale(request: NextRequest, locationLanguages?: string[]) {
  if (locationLanguages) {
    return match(locationLanguages, locales, defaultLocale);
  }
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return; // if there is a LANG in URL return

  const { country } = geolocation(request); // if there is not a LNG in URL get location from request
  const countryInfo = countries.find(c => c.cca2 === country) || countries.find(c => c.cca2 === "US");
  //@ts-ignore
  const countryLanguages = Object.keys(countryInfo?.languages);
  const locale = getLocale(request, countryLanguages);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
