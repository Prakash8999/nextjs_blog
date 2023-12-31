import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/components/Providers'
import { Poppins } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  className={`${poppins.variable}`}>
      <body className={inter.className}>

        <NextAuthProvider>

          <div className='relative'>
            <Navbar />
            <div className='mt-16'>

              {children}
            </div>
          </div>
        </NextAuthProvider>



      </body>

    </html>
  )
}
