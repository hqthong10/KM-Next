import styles from './styles.module.css';
import Link from 'next/link'
import Image from 'next/image';
import { getSession } from '@/lib/session';

export default async function HeaderBar() {
    const { user } = await getSession();
    return (
        <header className={'fixed z-20 w-full top-0 flex h-[60px] items-center bg-white gap-5 px-4 ' + styles.shadow}>
            <Image src={'/images/logo.png'} alt='piepmark' width={100} height={50} />
            <Link href="/">Home</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/dictionary">Dictionary</Link>
            <Link href="/dictionary/phrase">Phrase</Link>
            <Link href="/dictionary/phrase/words">Words</Link>
            <span className='w-full'></span>
            {user?.PN100 > 0 ? (
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
            ) :
                (<Link href="/login">Login</Link>)
            }
        </header>
    )
}