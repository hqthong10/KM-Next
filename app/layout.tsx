import './globals.css'
import { inter } from '@/app/fonts';
import { Providers } from "./providers";
import HeaderBar from '@/components/HeaderBar';

export const metadata = {
  title: 'Learn next',
  description: 'First next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={`${inter.className}`}>
        <Providers>
          <HeaderBar />
          <div className='pt-[60px]'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
