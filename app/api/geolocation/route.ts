//https://vercel.com/docs/functions/functions-api-reference
// import { geolocation } from '@vercel/functions';
export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'nodejs';
import { geolocation } from '@vercel/functions';
// export const runtime = 'nodejs'

export function GET(request: Request) {
    console.log(geolocation(request))
    console.log(`Hello from ${process.env.VERCEL_REGION}`)
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  }