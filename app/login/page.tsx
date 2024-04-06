'use client'
import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { reqPost } from '@/lib/request';

import { Button } from "antd";
import { Input } from "antd";

export default async function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const router = useRouter();

    async function handleClick() {
        // const rs = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email,
        //         password: pass
        //     })
        // })
        // const result = await rs.json();

        const result = await reqPost('/api/auth/login', {
            email,
            password: pass
        });
        if (result?.data?.PN100 > 0) {
            router.push('/');
        }
    }

    return <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <div className='w-[300px] flex flex-col bg-white p-8 gap-3'>
            <Input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <Input value={pass} placeholder='Password' type='password' onChange={(e) => setPass(e.target.value)} />
            <Button onClick={handleClick}>Login</Button>
        </div>
    </main>;
}
