import './globals.css'
import { inter } from '@/app/fonts';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { getSession } from '@/lib/session';
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
  const session = await getSession();
  const ssuser = session.user ?? {};

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <HeaderBar />
        {ssuser.NV103 ?? ''}
        <div className='pt-[60px]'>
          <AntdRegistry>{children}</AntdRegistry>
        </div>
      </body>
    </html>
  )
}
