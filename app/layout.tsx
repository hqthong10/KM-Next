import './globals.css'
import { inter } from '@/app/fonts';
import { Providers } from "@/providers/providers";
import SideBar from '@/components/SideBar';
import { auth } from "@/auth";
import { IUser } from '@/types/next-auth';

export const metadata = {
  title: 'Learn next',
  description: 'First next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user as IUser;

  return (
    <html lang="en" className='light'>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={`${inter.className}`}>
        <Providers>
            <div className='flex'>
              {!!user && <SideBar  />}
              <div className='w-full pl-[250px]'>
                  {children}
              </div>
            </div>
        </Providers>
      </body>
    </html>
  )
}
