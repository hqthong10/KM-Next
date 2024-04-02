'use client'
import React, { useEffect, useState } from 'react';
import { reqGet, reqPost } from '@/utils/request';
import clsx from 'clsx';
import KmButton from '@/components/UI/button'



export default async function Dictionary() {
  // const [words, setWords] = useState([]);
  let words: any[] = [];


  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await reqPost('api/word', {
    //       WV101: 'can',
    //       WV102: 'có thể'
    //     });
    //     const jsonData = await response.json();
    //     // setData(jsonData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();
  }, []);

  const actionClickBtn = () => {
    alert('ahihi');
  }

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">

      chào bạn
      <KmButton onClick={actionClickBtn}>hihi click</KmButton>

    </main>
  );
}
