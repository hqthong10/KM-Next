'use client'
import { useState, useRef, FormEvent, ReactEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Tabs, Tab } from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom'
import { signin } from './action'

export default function Login() {
    const [state, action] = useFormState(signin, undefined)
    const { pending } = useFormStatus();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const router = useRouter();

    async function handleClick() {
        const rs = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password: pass
            })
        })
        const result = await rs.json();
        if (result?.data?.PN100 > 0) {
            router.push('/');
        }
    }

    return <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <Tabs aria-label="Options">
            <Tab key="normal" title="Normal">
                <div className='w-[300px] flex flex-col bg-white p-8 gap-3'>
                    <Input type='email' value={email} placeholder='Email' onChange={(e: any) => setEmail(e.target.value)} />
                    <Input type='password' value={pass} placeholder='Password' onChange={(e: any) => setPass(e.target.value)} />
                    <Button onClick={handleClick}>Login</Button>
                </div>
            </Tab>
            <Tab key="form" title="Form">
                <form action={action} className='w-[300px] flex flex-col bg-white p-8 gap-3'>
                    <Input id='email' name='email' placeholder='Email' />
                    {state?.errors?.email && <p>{state.errors.email}</p>}
                    <Input id='password' name='password' type='password' placeholder='Password' />
                    {state?.errors?.password && (
                        <div>
                            <p>Password must:</p>
                            <ul>
                                {state.errors.password.map((error: any) => (
                                    <li key={error}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Button type='submit' aria-disabled={pending}>{pending ? 'Submitting...' : 'Đăng nhập'}</Button>
                </form>
            </Tab>
        </Tabs>
    </main>;
}
