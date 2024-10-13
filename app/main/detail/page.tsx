'use client'

import { useEffect, useState } from 'react';
// import { JSDOM } from 'jsdom';
import Image from 'next/image';
import { getTest } from './api/test';

// 'https://www.youtube.com/watch?v=u8wu6fDGK44'
export default function Detail(param: { id: string }) {
  const [imageUrl, setImageUrl] = useState({link : '', profile : ''});

  useEffect(() => {
    const fetchChannel = async () => {
      const data = await getTest(param.id);
      setImageUrl(data!)
      console.log(data?.link)
    };

    fetchChannel();
  }, [imageUrl, setImageUrl]);

  if(imageUrl.link == ''){
        return(
          <div>
          TEST
        </div>
        )
  }

  return (
<div className="relative w-full h-[500px] mx-auto">
      {/* 이미지 컨테이너 */}
      <div 
        className="w-full h-full absolute inset-0 bg-cover bg-center object-cover"
        style={{ backgroundImage: `url(${imageUrl!.link})` }} // 이미지 경로
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
      <div className="absolute top-[50px] right-[50px] w-[170px] h-[170px] bg-cover rounded-lg"
        style={{ backgroundImage: `url(${imageUrl!.profile})` }} // 오른쪽 상단 아이콘 이미지
      ></div>
    </div>
  );
}
