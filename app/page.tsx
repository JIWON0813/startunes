"use client"; // this is a client component 👈🏽

import { useState } from 'react';
import classes from "./Home.module.css";

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
  };

  return (
    <div>
      <div className={classes.button_container}>
        <button className={classes.customButton} onClick={changeVideos}>
          click button🎰 
        </button>
      </div>
      <div className={classes.video_container}>
        {videos.map((videoId, index) => (
          <iframe 
            key={index}
            src={`https://www.youtube.com/embed/${videoId}`} 
            allowFullScreen
          />
        ))}
      </div>
      <div className={classes.empty_container}>
      </div>
    </div>
  );
}