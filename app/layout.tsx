import './globals.css';
import { inter } from '@/app/fonts';
import { Providers } from '@/providers/providers';
import SideBar from '@/components/SideBar';
import { auth } from '@/auth';
import { IUser } from '@/types/next-auth';

export const metadata = {
    title: 'Learn next',
    description: 'First next app'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const user = session?.user as IUser;

    let mainContent;
    if (!user) {
        // no login
        mainContent = <div className="w-full">{children}</div>;
    } else {
        // logined
        mainContent = (
            <>
                <SideBar />
                <div className="w-full pl-[190px]">{children}</div>
            </>
        );
    }

    return (
        <html lang="en" className="light">
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <body className={`${inter.className}`}>
                <Providers>
                    <div className="flex">{mainContent}</div>
                </Providers>
            </body>
        </html>
    );
}
