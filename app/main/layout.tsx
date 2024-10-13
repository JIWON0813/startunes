'use client'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-full w-full flex-col'>
      <div className="pt-20"></div>

      <div className="flex items-center pl-40">
        <svg className="w-[3%] text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <span className="text-white text-[50px]">StarTunes</span>
      </div>
      <div className="pt-10"></div>

      <main className="flex-grow w-full h-[80%] container mx-auto">
        {children}
      </main>
      <div className="pt-10"></div>
      {/* 푸터 (옵션) */}
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 My Website. All rights reserved.
      </footer>   */}
    </div>
  );
}
