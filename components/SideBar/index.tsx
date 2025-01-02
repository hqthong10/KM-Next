"use client"
import styles from './styles.module.css';
import Link from 'next/link'
import Image from 'next/image';

import { signOut } from "@/auth"
import { IUser } from '@/types/next-auth';
import { useSession } from "next-auth/react";
import { Button, Spacer } from '@nextui-org/react';


export default function SideBar() {
    const { data: session } = useSession()
    const user = session?.user as IUser;

    async function logout() {
        const rs = await signOut();
        console.log('logout', rs);
    }

    return (
        <div className={'fixed z-21 w-[250px] h-full top-0 left-0 flex flex-col bg-white gap-5 px-4 ' + styles.shadow}>
            <Image src={'/images/logo.png'} alt='piepmark' width={100} height={50} />
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/dictionary">Dictionary</Link>
            
            <span className='h-full'></span>
            {user?.PN100! > 0 ? (
               
                <div className='flex-none flex flex-col items-center gap-1'>
                    {/* <Image
                        src={user.NV108!}
                        alt={`${user.NV106} ${user.NV107}`}
                        width={38} height={38}
                        className='rounded-full'
                    /> */}
                    <Button color="primary" onPress={() =>logout()}>Logout</Button>
                    <span className='whitespace-nowrap'>{`${user.NV106} ${user.NV107}`}</span>
                </div>
            ) :
                (<Link href="/login">Login</Link>)
            }
            
        </div>
    )
}