'use client';

import { useEffect, useState } from 'react';
import { getTest } from './api/test';
import { useSearchParams } from "next/navigation";

export default function Detail() {
    // 랜덤 색상 생성 함수
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
  const [imageUrl, setImageUrl] = useState({ link: '', profile: '' });
  const [videos, setVideos] = useState(Array(8).fill(0).map(() => getRandomColor()));
  const [currentIndex, setCurrentIndex] = useState(0);

  const params = useSearchParams();

  useEffect(() => {
    const fetchChannel = async () => {
      const data = await getTest(params.get('id')!);
      setImageUrl(data!);
      console.log(data?.link);
    };

    fetchChannel();
  }, [params]);

  if (imageUrl.link === '') {
    return (
      <div>
        TEST
      </div>
    );
  }



  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="relative w-full h-[600px] mx-auto overflow-hidden">
      {/* 이미지 컨테이너 */}
      <img
        src={imageUrl!.link}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
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

      {/* 오른쪽 상단의 프로필 이미지 */}
      <div
        className="absolute top-[50px] right-[50px] w-[170px] h-[170px] bg-cover rounded-lg"
        style={{
          backgroundImage: `url(${imageUrl!.profile})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* 비디오 목록 섹션 추가 */}
     
    </div>
  );
}


// <div className="absolute bottom-0 left-0 w-full p-5 bg-white bg-opacity-80">
// <h2 className="text-xl font-bold text-center">Explore The Artist</h2>
// <div className="flex justify-between items-center mt-4">
//   <button onClick={handlePrev} className="p-2 border rounded-md">
//     &lt;
//   </button>

//   <div className="flex space-x-4 overflow-hidden">
//     {/* 현재 인덱스에 따라 비디오 목록을 렌더링 */}
//     <div className="flex">
//       <div
//         className="w-[200px] h-[120px] flex items-center justify-center text-white font-bold"
//         style={{ backgroundColor: videos[currentIndex] }}
//       >
//         Video {currentIndex + 1}
//       </div>
//     </div>
//   </div>

//   <button onClick={handleNext} className="p-2 border rounded-md">
//     &gt;
//   </button>
// </div>
// </div>