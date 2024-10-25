import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import countries from "./app/lib/countries.json";
//https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/middleware.ts

const locales = ["en", "sk", "hu"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return; // if there is a LANG in URL return

  //check request cookies for location
  // const location = request.cookies.get("location");
  //if location cookie doesnt exist add it
  if (!request.cookies.get("location")) {
    const { country } = geolocation(request);
    if (!country) request.cookies.set("location", defaultLocale);
    else {
      console.log("set location cookie");
      request.cookies.set("location", country);
    }
  }
  //get language based on cookie
  const countryInfo = countries.find(
    c => c.cca2.toUpperCase() === request.cookies.get("location")?.value.toUpperCase()
  );
  if (countryInfo && request?.cookies?.get("location")?.value) {
    const countryLanguages = Object.keys(countryInfo.languages);
    const locale = match(countryLanguages, locales, defaultLocale);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    //@ts-ignore
    return NextResponse.redirect(request.nextUrl).cookies.set("location", request.cookies.get("location")?.value);
  }

  const locale = getLocale(request);
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
