'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('api/posts');
      const jsonData = await response.json();
      setPosts(jsonData?.data ?? []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
        Welcome to page Post
        <ul>
          {posts.map((post: any) => {
            return <li><Link href={`/posts/${post.PP100}`}>{post.PV101}</Link></li>
          })}
        </ul>
    </main>
  );
}
