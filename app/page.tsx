import classes from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <div className={classes.button_container}>
        <button className={classes.customButton}>
          click button🎰 
        </button>
      </div>
      <div className={classes.video_container}>
        <iframe src={`https://www.youtube.com/embed/UKQ1OL6LWPM`} allowFullScreen/>
        <iframe src={`https://www.youtube.com/embed/UKQ1OL6LWPM`} allowFullScreen/>
        <iframe src={`https://www.youtube.com/embed/5mAgMFNhTBY`} allowFullScreen />
      </div>
      <div className={classes.empty_container}>
      </div>
    </div>
  );
}
