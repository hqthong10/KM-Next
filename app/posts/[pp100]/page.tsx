
'use client'
import React, { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import PostContent from '@/components/PostContent';

export default async function Page({ params }: { params: { pp100: string } }) {  
  const [post, setPost] = useState({
    PP100: 0,
    PV101: '',
    PV102: '',
    PA103: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts/${params.pp100}`);
        const jsonData = await response.json();
        if(jsonData?.data != null) {
          setPost(jsonData?.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
        Welcome to page Post
        <Suspense fallback={<Loading />}>
            <PostContent data={post}></PostContent>
        </Suspense>
    </main>
  );
}
