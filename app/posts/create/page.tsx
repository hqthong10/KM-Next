'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input, Button, Textarea, Tabs, Tab } from "@nextui-org/react";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [pv101, setPv101] = useState('');
  const [pv102, setPv102] = useState('');

  useEffect(() => {
    
  }, []);

  const actionSave = () => {
    // 
  }

  return (
    <main className="flex min-h-screen flex-col p-4 bg-white">
        <div className='div-form'>
            <div className='form-item'>
                <Input type='textarea' value={pv101} label="Tiêu đề" placeholder='Tiêu đề' onChange={(e: any) => setPv101(e.target.value)} />
                <Textarea type='textarea' value={pv102} label="Nội dung" placeholder='Nội dung' onChange={(e: any) => setPv102(e.target.value)} />
                <Button onClick={actionSave}>Login</Button>
            </div>
        </div>
        <div className='div-preview'></div>
    </main>
  );
}
