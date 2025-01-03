'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IResponse, sendRequest } from '@/libs/request';

export default function Page() {
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            const response: IResponse = await sendRequest<IResponse>({
                url: '/api/posts',
                method: 'GET'
            });

            setPosts(response!.data! || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 1000);
    }, []);

    return (
        <main className="flex min-h-screen flex-col p-4 bg-white">
            Welcome to page Post {posts.length}
            <ul>
                {posts.map((post: any) => {
                    return (
                        <li>
                            <Link href={`/posts/${post.PP100}`}>{post.PV101}</Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
