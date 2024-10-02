'use client'

import './globals.css';
import Image from 'next/image'
import { Tektur} from 'next/font/google'

export const te = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`font-tektur`}>
      <body className="relative h-screen w-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/background.png"  // public 폴더 안에 image/background.png 파일이 있어야 함
            alt="메인 배경 이미지"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
