"use client"
import styles from './styles.module.css';
import Link from 'next/link'
import Image from 'next/image';

import { signOut } from "@/auth"
import { IUser } from '@/types/next-auth';
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';


export default function HeaderBar() {
    const { data: session } = useSession()
    const user = session?.user as IUser;
    // const router = useRouter();

    async function logout() {
        const rs = await signOut();
        console.log('logout', rs);
    }

    return (
        <header className={'fixed z-20 w-full top-0 flex h-[60px] items-center bg-white gap-5 px-4 ' + styles.shadow}>
            <Image src={'/images/logo.png'} alt='piepmark' width={100} height={50} />
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/dictionary">Dictionary</Link>
            <span className='w-full'></span>
            {user?.PN100! > 0 ? (
               
                <span className='flex-none inline-flex items-center gap-1'>
                    {/* <Image
                        src={user.NV108!}
                        alt={`${user.NV106} ${user.NV107}`}
                        width={38} height={38}
                        className='rounded-full'
                    /> */}
                    <span className='whitespace-nowrap'>{`${user.NV106} ${user.NV107}`}</span>
                    <Button color="primary" onPress={() =>logout()}>Logout</Button>
                </span>
            ) :
                (<Link href="/login">Login</Link>)
            }
            
        </header>
    )
}