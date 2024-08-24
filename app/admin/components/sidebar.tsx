'use client'

import Link from 'next/link';

export default function Sidebar() {
    return (
      <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-8">My Sidebar</h2>
        <nav className="flex flex-col gap-4">
        <Link href="/admin/songs" className="hover:bg-gray-700 p-2 rounded">
          Songs
        </Link>
        <Link href="/admin/videos" className="hover:bg-gray-700 p-2 rounded">
          Videos
        </Link>
        <Link href="/admin/videos" className="hover:bg-gray-700 p-2 rounded">
          Artist
        </Link>
        </nav>
      </div>
    );
  }