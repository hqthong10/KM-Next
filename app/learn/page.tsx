'use client'
import React from 'react';
import { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch('http://localhost:3020/w100');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const words = await res.json()
  console.log(words.data.length)
}

export default async function Learn() {
  // const [words, setWords] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('api/word');
  //     const jsonData = await response.json();

  //     // setWords(jsonData?.data ?? []);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  getData();
  

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
      chao cac ban 
      {/* {words.length} */}
    </main>
  );
}
