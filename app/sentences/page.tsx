'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IResponse, sendRequest } from '@/libs/request';

export default function SentencePage() {
    const [list, setLists] = useState([]);

    const fetchData = async () => {
        try {
            const response: IResponse = await sendRequest<IResponse>({
                url: '/api/sentences',
                method: 'GET'
            });

            setLists(response!.data! || []);
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
            <ul>
                {list.map((post: any) => {
                    return (
                        <li>
                            {post.PV101}
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
