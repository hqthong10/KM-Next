'use client'
import styles from './styles.module.css';
import Link from 'next/link'
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { reqPost } from '@/lib/request';
import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

export default function HeaderBar({ user }: any) {
    const router = useRouter();

    async function handleLogout() {
        console.log('logout');
        const response = await fetch('api/auth/logout', { method: 'POST' });
        const jsonData = await response.json();
        if (jsonData?.data > 0) {
            router.push('/');
        }
    }

    return (
        <header className={'fixed z-20 w-full top-0 flex h-[60px] items-center bg-white gap-5 px-4 ' + styles.shadow}>
            <Link href="/"><Image src={'/images/logo.png'} alt='piepmark' width={100} height={50} /></Link>
            <Link href="/">Home</Link>
            <Link href="/dictionary">Dictionary</Link>
            <Link href="/phrase">Phrase</Link>
            <Link href="/posts">Post</Link>
            <span className='w-full'></span>
            {user?.PN100 > 0 ? (
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            <span className='flex-none inline-flex items-center gap-1'>
                                <Image
                                    src={user.NV108?.length > 0 ? user.NV108 : '/images/avatar.png'}
                                    alt={`${user.NV106} ${user.NV107}`}
                                    width={38} height={38}
                                    className='rounded-full'
                                />
                                <span className='whitespace-nowrap'>
                                    {`${user.NV106} ${user.NV107}`}
                                </span>
                            </span>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">Profile</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleLogout}>
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) :
                (<Link href="/login">Login</Link>)
            }
        </header>
    )
}