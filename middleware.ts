import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import countries from "./app/lib/countries.json";
//https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/middleware.ts

const locales = ["en", "sk", "hu"];

//makes sure country is set to cookie 'location'
function setLocationCookie(request: NextRequest) {
  const { country } = geolocation(request);
  if (country) {
    console.log("set location cookie");
    return request.cookies.set("location", country);
  }
  return;
}

function getLocale(request: NextRequest) {
  const defaultLocale = "en";

  const location = request.cookies.get("location");
  if (!location) {
    setLocationCookie(request);
  }
  const countryInfo = countries.find(c => c.cca2.toUpperCase() === location?.value.toUpperCase());
  if (countryInfo) {
    const countryLanguages = Object.keys(countryInfo.languages);
    return match(countryLanguages, locales, defaultLocale);
  }
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // const c = countries.find(c => c.cca2 === "AF");
  // console.log(Object.keys(c?.languages));

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
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
