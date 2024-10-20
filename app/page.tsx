import { headers } from 'next/headers'
export default async function Home() {
 const date = new Date().toLocaleTimeString()
 console.log(typeof date)
 console.log(date)
 const headersList = headers()
 const country = headersList.get('country')
//  async function apicall (){
//   await fetch('/api/geolocation')
//  }
//  apicall().then(data=>console.log(data))
  return (
    <div className="">
      {country}
    </div>
  );
}
