'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IResponse, sendRequest } from '@/libs/request';

export default function InterviewPage() {
    const [list, setLists] = useState([]);

    const fetchData = async () => {
        try {
            const response: any = await sendRequest<any>({
                url: '/api/interviews',
                method: 'GET'
            });

            console.log(response);

            setLists(response || []);
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
            <div className='tools'>

            </div>
            <ul>
                {list.map((item: any) => {
                    return (
                        <li key={item.PI000}>
                            {item.IV001}
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
