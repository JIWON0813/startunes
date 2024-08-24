'use client'

import { useEffect, useState } from 'react';
// import { JSDOM } from 'jsdom';
import Image from 'next/image';
import { getTest } from './api/test';

// 'https://www.youtube.com/watch?v=u8wu6fDGK44'
export default function Test() {
  const fetchData = async () => {
    const html = await getTest();

    console.log(html)
  };

  fetchData();

  return (
    <div>
      <div>
        TEST
      </div>
      <Image
        src="https://i.ytimg.com/vi/u8wu6fDGK44/maxresdefault.jpg"
        alt="YouTube Thumbnail"
        width={480} // 원하는 너비
        height={360} // 원하는 높이
        className="pointer-events-none" // 클릭 비활성화
      />
    </div>
  );
}
