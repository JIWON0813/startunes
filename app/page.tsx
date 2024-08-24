"use client"; // this is a client component 👈🏽

import { useState } from 'react';
import classes from "./Home.module.css";
import Header from './components/Header';

export default function MainList() {
  const videoUrlLists = [
    ['UKQ1OL6LWPM', 'QlAvoQPEh80', 'Hjk1lHU_FSM'],
    ['5mAgMFNhTBY', 'IDjUH31pnvA', '7lVE9BQENGg'],
    ['cUT3S4N8fS8', '3j8ecF8Wt4E', 'nkXIpGjVxWU']
  ];

  const [videos, setVideos] = useState(videoUrlLists.map(list => list[0]));

  const changeVideos = () => {
    const newVideos = videoUrlLists.map(list => {
      const randomIndex = Math.floor(Math.random() * list.length);
      return list[randomIndex];
    });
    setVideos(newVideos);
  }

  return (
    <div className='h-screen w-full bg-black flex-col pl-20 pr-40'>

      <div className="pt-20"></div>

      <div className="flex items-center">
        <svg className="h-full w-[3%] text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <span className="text-white text-[50px]">StarTunes</span>
      </div>
      <div className="pt-10"></div>

      <div className="h-[70%] w-full bg-white rounded-[50px] p-11 flex flex-col">
        <div className='text-[30px]'>
          Home
        </div>

        <div className='flex justify-between w-full pt-3'>
          <div className='text-[20px]'>
            Discouver music<br />
            that shines like stars
          </div>

          <button className="relative overflow-hidden px-20 py-6 rounded-full text-black text-[20px] font-bold transition-all duration-500 ease-in-out bg-gradient-to-r from-yellow-300 via-green-200 to-orange-300 bg-size-400 bg-pos-0 hover:bg-pos-200">
          <span className="relative z-10 ">Shuffle</span>
         </button>
        </div>

        <div className='flex-grow w-full pt-5 overflow-hidden'>
          <div className='flex flex-row h-full overflow-x-auto justify-between'>
            {videos.map((videoId, index) => (
              <div key={index} className='w-[30%] h-[90%] flex-shrink-0'>
                <div className='relative w-full h-full'>
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    allowFullScreen
                    className='absolute top-0 left-0 w-full h-full'
                    style={{aspectRatio: '16 / 9'}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}