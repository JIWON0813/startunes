'use client';

import { useEffect, useState } from 'react';
import { getInfoFromUrl } from './api/test';
import * as query from './api/query'
import { useSearchParams } from 'next/navigation';
import { SongRow } from './api/query';
import { useRouter } from 'next/navigation';

export default function Detail() {
  const router = useRouter();

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
  const [videoId, setVideoId] = useState('');
  const [song, setSong] = useState({} as SongRow);
  const [songs, setSongs] = useState([] as SongRow[]);

  const params = useSearchParams();

  useEffect(() => {
    const fetchChannel = async () => {
      const id = params.get('id')!;
      const data = await getInfoFromUrl(id, ''); // 데이터 가져오기
      setSong(await query.getSong(id));
      setImageUrl(data!); // 이미지와 videoId를 state에 저장
      setVideoId(id); // videoId 저장
    };

    fetchChannel();
  }, [params]);

  if (imageUrl.link === '') {
    return <div>Loading...</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, videos.length - 3)
    );
  };

  const handlePlayNow = () => {
    // 유튜브 링크로 이동
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const handleCopyUrl = async () => {
    // URL 복사
    const urlToCopy = `https://www.youtube.com/watch?v=${videoId}`;
    await navigator.clipboard.writeText(urlToCopy);
    alert('복사되었습니다!'); // 알림 메시지
  };

  const handleButtonClick = (artistId : string) => {
    router.push(`/main/artist?id=${artistId}`);
  };

  return (
    <div className="w-full h-full">
      {/* 배경 이미지 섹션 */}
      <div className="relative w-full h-[700px]">
        <img
          src={imageUrl.link}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-40"></div>

        {/* 텍스트와 프로필 이미지 */}
        <div className="absolute top-5 left-5 text-black">
          <h1 className="text-4xl font-bold">title</h1>
          <h2 className="text-lg mt-2">artist</h2>
          <div className="bg-yellow-400 p-4 mt-4 text-sm italic">
            lyrics_part
          </div>
          <div className="flex space-x-4 mt-6">
            {/* Play Now 버튼 */}
            <button
              onClick={handlePlayNow}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Play Now
            </button>

            {/* Copy URL 버튼 */}
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
            >
              Copy URL
            </button>
          </div>
        </div>
        <button
          onClick={() => handleButtonClick(song.artist!)}
          className="absolute top-[50px] right-[50px] w-[170px] h-[170px] bg-cover rounded-lg"
          style={{
            backgroundImage: `url(${imageUrl.profile})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></button>
      </div>

      {/* 비디오 목록 섹션 */}
      <div className="w-full h-[300px] p-5">
        <h2 className="text-4xl text-left pt-7 pb-3" style={{ color: '#F0E079' }}>Cover Video</h2>
        <div className="flex justify-between items-center mt-4">
          {/* 비디오 목록 */}
          <div className="flex w-[90%] space-x-4">
            {videos.slice(currentIndex, currentIndex + 4).map((color, idx) => (
              <div
                key={idx}
                className="flex-1 flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: color,
                  aspectRatio: '16 / 9', // 16:9 비율 유지
                }}
              >
                Video {currentIndex + idx}
              </div>
            ))}
          </div>

          {/* 이전 버튼 */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              currentIndex === 0
                ? 'border-[#F0E079] text-[#F0E079] cursor-not-allowed'
                : 'border-[#F0E079] bg-[#F0E079] text-white hover:opacity-80'
            }`}
          >
            &lt;
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= videos.length - 3}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              currentIndex >= videos.length - 3
                ? 'border-[#F0E079] text-[#F0E079] cursor-not-allowed'
                : 'border-[#F0E079] bg-[#F0E079] text-white hover:opacity-80'
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}


{/* <h1 className="text-4xl font-bold">{song.title}</h1>
          <h2 className="text-lg mt-2">{song.artist}</h2>
          <div className="bg-yellow-400 p-4 mt-4 text-sm italic">
            {song.lyrics_part}
          </div> */}