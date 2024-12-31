'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { authenticate } from '@/libs/actions';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [mess, setMess] = useState('');
    const router = useRouter();

    async function handleClick() {

        const rs = await authenticate(
            email,
            pass
        );

        // console.log('thong', rs);
        if (!rs.error ) {
            router.push('/');
        } else {
            setMess(rs.error as string);
        }
    }

    return <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <div className='w-[300px] flex flex-col bg-white p-8 gap-3'>
            <Input type='email' value={email} label="Email" placeholder='Email' onChange={(e: any) => setEmail(e.target.value)} />
            <Input type='password' value={pass} placeholder='Password' onChange={(e: any) => setPass(e.target.value)} />
            <span className='text-red-500'>{mess}</span>
            <Button onPress={handleClick}>Login</Button>
        </div>
    </main>;
}
