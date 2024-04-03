'use client'
import Image from 'next/image';
import { useState, useRef } from 'react'
import { reqGet } from '@/utils/request';

function MyButton() {
    return (
        <button>
            I'm a button
        </button>
    );
}

export default function Login() {
    const [count, setCount] = useState(0);

    const inputEmail: any = useRef(null);
    const inputPass: any = useRef(null);

    async function handleClick() {
        alert('You clicked me!' + (inputEmail?.current?.value ?? '') + ':' + inputPass.current.value);
        const res = await reqGet('https://learn-nest-production.up.railway.app/w100', {});
        console.log(res)
    }

    return <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <div className='w-[300px] flex flex-col bg-white p-8 gap-3'>
            <input ref={inputEmail} placeholder='Email' />
            <input ref={inputPass} placeholder='Password' />
            <button onClick={handleClick}>Login</button>
            <MyButton />
        </div>
    </main>;
}
