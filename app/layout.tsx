import './globals.css'
import { inter } from '@/app/fonts';
import { Providers } from "./providers";
import HeaderBar from '@/components/HeaderBar';
import { getSession } from '@/lib/session';
export const metadata = {
  title: 'Learn next',
  description: 'First next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getSession();
  return (
    <html lang="en" className='light'>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body cz-shortcut-listen="true" className={`${inter.className}`}>
        <Providers>
          <HeaderBar user={user} />
          <div className='pt-[60px]'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
