import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const { nextUrl: url, geo } = req
if(geo?.country){

    // const country = geo.country || 'US'
    // const city = geo.city || 'San Francisco'
    // const region = geo.region || 'CA'
    
    // const countryInfo = countries.find((x) => x.cca2 === country)
    
    // const currencyCode = Object.keys(countryInfo.currencies)[0]
    // const currency = countryInfo.currencies[currencyCode]
    // const languages = Object.values(countryInfo.languages).join(', ')
    
    url.searchParams.set('country', geo?.country)
    // url.searchParams.set('city', city)
    // url.searchParams.set('region', region)
    // url.searchParams.set('currencyCode', currencyCode)
    // url.searchParams.set('currencySymbol', currency.symbol)
    // url.searchParams.set('name', currency.name)
    // url.searchParams.set('languages', languages)
    //att1
    // const response = NextResponse.next()
    // response.cookies.set('country',geo?.country)
    // return response
    //att2

      // Clone the request headers and set a new header `x-hello-from-middleware1`
//   const requestHeaders = new Headers(req.headers)
//   requestHeaders.set('x-hello-from-middleware1', 'hello')
 
//   // You can also set request headers in NextResponse.rewrite
//   const response = NextResponse.next({
//     request: {
//       // New request headers
//       headers: requestHeaders,
//     },
//   })
 
  // Set a new response header `x-hello-from-middleware2`
//   response.headers.set('x-hello-from-middleware2', 'hello')
const response = NextResponse.next().headers.set('location',geo?.country)
  return response
}
}