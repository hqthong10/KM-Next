'use client'
import { reqGet, reqPost } from '@/utils/request';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

async function getData() {
    const res = await reqGet('http://localhost:3000/api/word', {});
    return res;
}

const addWord = async () => {
    // const res = await fetch('http://localhost:3001/api/word', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         WV101: 'can',
    //         WV102: 'có thể'
    //     })
    // });

    const res = await reqPost(
        'api/word',
        {
            WV101: 'can',
            WV102: 'có thể'
        }
    );

    return res;
}

  export default async function Dictionary() {
    // const [words, setWords] = useState([]);
    let words = [];

    // const dt = await getData();
    // words = dt.elements;
    useEffect(() => {
        // await addWord();
      const fetchData = async () => { 
        try {
          const response = await reqPost('api/word', {
            WV101: 'can',
            WV102: 'có thể'
          });
          const jsonData = await response.json();
          // setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    return (
        <main className="flex min-h-screen flex-col p-4 bg-white">
            {words.map((item: any, i: any) => {
                return (
                    <div key={i} className="flex border">
                        <p>{item.WV101}:</p>
                        <p>{item.WV102}</p>
                    </div>
                );
            })}
        </main>
    );
}
