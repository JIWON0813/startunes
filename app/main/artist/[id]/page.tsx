'use client';

import { useEffect, useState } from 'react';
import * as api from '../api/api'
import { Button } from "@material-tailwind/react";

export default function Artist({params} : any) {
  const [videos, setVideos] = useState(Array(12).fill(0).map(() => getRandomColor()));
  const [data, setData] = useState<api.VideoRow[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 랜덤 색상 생성 함수
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    const fetchChannel = async () => {
      const id = params.id;
      if (id) {
        const songsData = await api.getVideosByChannel(id);
        setData(songsData);
      }
    };
    fetchChannel();
  }, [params]);

  const loadMore = () => {
    setCurrentIndex((prev) => prev + 3);
  };

  return (
    <div className="flex h-screen p-4 gap-5"> {/* 바깥쪽 두 박스 사이 간격 20px (gap-5) */}
      {/* Left Box */}
      <div className="w-1/5 border border-[#F0E079] p-4 relative">
        <div className="w-[180px] h-[180px] bg-green-500 mx-auto mt-10 rounded-lg"></div> 
        {/* 초록색 박스 크기 확대, 모서리 둥글게, 위쪽 여백 추가 */}
        <p className="text-center mt-2">해리안윤소안</p>
      </div>

      {/* Right Box */}
      <div className="w-4/5 bg-white p-4 overflow-hidden">
        <h1 className="text-xl font-bold mb-4">Artist</h1>
        <div className="grid grid-cols-3 gap-4">
          {videos.slice(currentIndex, currentIndex + 9).map((color, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center text-white font-bold"
              style={{
                backgroundColor: color,
                aspectRatio: '16 / 9',
              }}
            >
              Video {currentIndex + idx}
            </div>
          ))}
        </div>
        {videos.length > currentIndex + 9 && (
          <div className="text-center mt-4">
            <Button onClick={loadMore}>더 보기</Button>
          </div>
        )}
        <p className="text-center mt-4">Original Song tuned by Harryan Yoonsoan 해리안윤소안</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {videos.slice(currentIndex + 9, currentIndex + 12).map((color, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center text-white font-bold"
              style={{
                backgroundColor: color,
                aspectRatio: '16 / 9',
              }}
            >
              Video {currentIndex + 9 + idx}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
