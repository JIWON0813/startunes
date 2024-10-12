'use client'

import { useEffect, useState } from 'react';
// import { JSDOM } from 'jsdom';
import Image from 'next/image';
import { getTest } from './api/test';

// 'https://www.youtube.com/watch?v=u8wu6fDGK44'
export default function Test() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchChannel = async () => {
      const link = await getTest('');
      setImageUrl(link!)
      console.log(link)
    };

    fetchChannel();
  }, [imageUrl, setImageUrl]);

  if(imageUrl == ''){
        return(
          <div>
          TEST
        </div>
        )
  }

  return (
<div className="relative w-full h-[650px] mx-auto">
      {/* 이미지 컨테이너 */}
      <div 
        className="absolute inset-0 bg-cover bg-center object-cover"
        style={{ backgroundImage: `url(${imageUrl})` }} // 이미지 경로
      >
      </div>

      <div className="absolute inset-0 bg-white bg-opacity-40"></div>
      <div className="absolute top-5 left-5 text-black">
        <h1 className="text-4xl font-bold">10,000 Hours</h1>
        <h2 className="text-lg mt-2">Dan + Shay, Justin Bieber - 10,000 Hours (Official Music Video)</h2>
        <div className="bg-yellow-400 p-4 mt-4 text-sm italic">
          Id spend ten thousand hours and ten thousand more<br />
          if thats what it takes to learn that sweet heart of yours<br />
          - Dan + Shay, Justin Bieber &lt;10,000 Hours&gt;
        </div>
        <div className="flex space-x-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Play Now</button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md">Copy URL</button>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md">
        2:56
      </div>
      <div className="absolute top-3 right-3 w-12 h-12 bg-cover rounded-lg"
        style={{ backgroundImage: "url('/plus-icon.jpg')" }} // 오른쪽 상단 아이콘 이미지
      ></div>
    </div>
  );
}
