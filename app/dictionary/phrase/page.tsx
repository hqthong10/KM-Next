'use client'
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/word');
        const jsonData = await response.json();
        setWords(jsonData?.data ?? []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
      Welcome to page phrase
    </main>
  );
}
