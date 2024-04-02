import './globals.css'
import { inter } from '@/app/fonts';

import HeaderBar from '@/components/HeaderBar'


export const metadata = {
  title: 'Learn next',
  description: 'First next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <HeaderBar />
        <div className='pt-[60px]'>
          {children}
        </div>
      </body>
    </html>
  )
}
