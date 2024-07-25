// 'use client'
import { useState, useRef, FormEvent, ReactEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { reqPost } from '@/lib/request';
import { Button, Input } from '@nextui-org/react';

import { getSession } from "@/lib/actions";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getSession();
    console.log(session)
    if (session.isLoggedIn) {
        redirect("/");
    }

    return (
        <div>
          <h1>Login Page</h1>
          <LoginForm />
        </div>
    );
}
