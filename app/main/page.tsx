"use client"; // 이 컴포넌트는 클라이언트에서만 렌더링

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MainList() {
  const videoUrlLists = [
    ['UKQ1OL6LWPM', 'QlAvoQPEh80', 'Hjk1lHU_FSM'],
    ['5mAgMFNhTBY', 'IDjUH31pnvA', '7lVE9BQENGg'],
    ['cUT3S4N8fS8', '3j8ecF8Wt4E', 'nkXIpGjVxWU']
  ];

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (videoId: string) => {
    router.push(`/main/detail?id=${videoId}`);
  };

  const [videos, setVideos] = useState(videoUrlLists.map(list => list[0]));

  if (!isMounted || videos === undefined) {
    return <div>wait</div>;
  }

  return (
    <div className="h-[80%] w-full rounded-[50px] p-15 flex flex-col">
      <div className="pt-5"></div>
      <div className="flex justify-center w-full">
        <span className="relative z-10 text-white text-[40px] glow-effect">
          Discover music<br />
          that shines like stars
        </span>
      </div>
      <div className="pt-5"></div>
      <div className="flex-grow w-full pt-5 overflow-hidden">
        <div className="flex h-[100%] overflow-x-auto">
          {videos.map((videoId, index) => (
            <div key={index} className="w-[330px] h-[150px] relative">
              <div className="relative w-full h-full"> 
                <Image
                  src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} // YouTube 썸네일 URL
                  alt={`Video thumbnail for ${videoId}`} // 접근성 alt 추가
                  layout="fill" // fill로 설정
                  objectFit="cover" // cover로 설정
                  className="cursor-pointer" // 클릭 가능
                  onClick={() => handleClick(videoId)} // 클릭 시 라우팅
                />   
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-10"></div>
      <div className="flex justify-center w-full">
        <button className="relative overflow-hidden px-20 py-6 rounded-full text-black text-[20px] font-bold transition-all duration-500 ease-in-out bg-gradient-to-r from-yellow-300 via-green-200 to-orange-300 bg-size-400 bg-pos-0 hover:bg-pos-200">
          <span className="relative z-10">Shuffle</span>
        </button>
      </div>
    </div>
  );
}
