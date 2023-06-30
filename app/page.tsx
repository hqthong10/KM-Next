import { reqGet } from '@/utils/request'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';

async function getData() {
  // const res = await fetch('https://learn-nest-production.up.railway.app/w100');
  const res = await reqGet('https://learn-nest-production.up.railway.app/w100', {});
  console.log('thong', res)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
 
  // return res.json()
  return {elements: []}
}

export default async function Home() {
  const [words, setWords] = useState([]);

  const data = await getData();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/my-endpoint');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.elements.map((item: any, i: any) => {
        return <p key={i}>{item.WV102}</p>;
      })}
    </main>
  )
}
