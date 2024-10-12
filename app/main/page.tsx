"use client"; // this is a client component 👈🏽

import { useState } from 'react';


export default function MainList() {
  const videoUrlLists = [
    ['UKQ1OL6LWPM', 'QlAvoQPEh80', 'Hjk1lHU_FSM'],
    ['5mAgMFNhTBY', 'IDjUH31pnvA', '7lVE9BQENGg'],
    ['cUT3S4N8fS8', '3j8ecF8Wt4E', 'nkXIpGjVxWU']
  ];

  const [videos, setVideos] = useState(videoUrlLists.map(list => list[0]));

  return (
      <div className="h-[80%] w-full rounded-[50px] p-15 flex flex-col">
<div className="pt-5"></div>
        <div className='flex justify-center w-full'>
          <span className="relative z-10 text-white text-[40px] glow-effect">
            Discover music<br></br>
            that shines like starts
          </span>

        </div>
        <div className="pt-5"></div>
        <div className='flex-grow w-full pt-5 overflow-hidden'>
          <div className='flex h-[100%] overflow-x-auto'>
            {videos.map((videoId, index) => (
              <div key={index} className='w-[33%] h-[50%]'>
                <div className='relative w-full h-full'>
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    allowFullScreen
                    className='w-full h-full'
                    style={{aspectRatio: '16 / 9'}}
                  />
                </div>
              </div>
            ))}
          </div>
        </div> 
        <div className="pt-10"></div>
        <div className='flex justify-center w-full'>
          <button className="relative overflow-hidden px-20 py-6 rounded-full text-black text-[20px] font-bold transition-all duration-500 ease-in-out bg-gradient-to-r from-yellow-300 via-green-200 to-orange-300 bg-size-400 bg-pos-0 hover:bg-pos-200">
          <span className="relative z-10 ">Shuffle</span>
         </button>
        </div>
      </div>
  );
}