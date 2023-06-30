import Image from 'next/image'

async function getData() {
  const res = await fetch('https://learn-nest-production.up.railway.app/w100')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.elements.map((item: any, i: any) => {
        return <p key={i}>{item.WV102}</p>;
      })}
    </main>
  )
}
