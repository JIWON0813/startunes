"use client"; // 이 컴포넌트는 클라이언트에서만 렌더링

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getVideos } from '../admin/home/videos/api/video';

export default function MainList() {
  const videoUrlLists = [
    ['Y2E71oe0aSM', 'Y2E71oe0aSM', 'Y2E71oe0aSM'],
    ['xaVq4FhbD6Q', 'xaVq4FhbD6Q', 'xaVq4FhbD6Q'],
    ['ZncbtRo7RXs', 'ZncbtRo7RXs', 'ZncbtRo7RXs']
  ];

  const videoTitles = [
    { title: "10,000 Hours", artist: "Dan + Shay" },
    { title: "Young One", artist: "AP" },
    { title: "Some Random Song", artist: "Artist Name" }
  ];

  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const songsData = await getVideos({});
    };

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
    <div className="h-full w-full rounded-[50px] flex flex-col">
      <div className="pt-5"></div>
      <div className="flex justify-center w-full">
        <span className="relative z-10 text-white text-[40px] glow-effect">
          Discover music<br />
          that shines like stars
        </span>
      </div>
      <div className="pt-5"></div>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-3 gap-4 w-full h-auto">
        {videos.map((videoId, index) => (
          <div key={index} className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 비율 */}
            <Image
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} // YouTube 썸네일 URL
              alt={`Video thumbnail for ${videoId}`} // 접근성 alt 추가
              layout="fill" // 이미지가 부모 요소를 채우도록
              objectFit="cover" // 이미지를 꽉 채우되 비율을 유지
              className="cursor-pointer" // 클릭 가능
              onClick={() => handleClick(videoId)} // 클릭 시 라우팅
            />
            {/* 노래 제목과 가수 이름 */}
            <div className="absolute bottom-2 left-2 text-white text-sm">
              <p className="font-semibold shadow">{videoTitles[index]?.title}</p>
              <p className="text-xs shadow">{videoTitles[index]?.artist}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-20"></div>
      <div className="flex justify-center w-full">
        <button className="relative overflow-hidden px-20 py-6 rounded-full text-black text-[20px] font-bold transition-all duration-500 ease-in-out bg-gradient-to-r from-yellow-300 via-green-200 to-orange-300 bg-size-400 bg-pos-0 hover:bg-pos-200">
          <span className="relative z-10">Shuffle</span>
        </button>
      </div>
    </div>
  );
}
