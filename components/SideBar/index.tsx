"use client"
import { IUser } from '@/types/next-auth';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link'
import Image from 'next/image';
import { Button, Spacer } from '@nextui-org/react';
import styles from './styles.module.css';


export default function SideBar() {
    const { data: session } = useSession()
    const user = session?.user as IUser;

    async function logout() {
        await signOut();
    }

    return (
        <div className={'fixed z-21 w-[250px] h-full top-0 left-0 flex flex-col bg-white gap-5 p-4 ' + styles.shadow}>
            <Image src={'/images/logo.png'} alt='piepmark' width={100} height={50} />
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/dictionary">Dictionary</Link>
            
            <span className='h-full'></span>
            {user?.PN100! > 0 ? (
               
                <div className='flex-none flex flex-col items-center gap-1'>
                    <Button color="primary" onPress={() =>logout()}>Logout</Button>
                    <span className='whitespace-nowrap'>{`${user.NV106} ${user.NV107}`}</span>
                </div>
            ) :
                (<Link href="/login">Login</Link>)
            }
            
        </div>
    )
}