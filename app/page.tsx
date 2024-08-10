import classes from "./Home.module.css";

export default function Home() {
  return (
    <div className={classes.video_container}>
      <iframe src={`https://www.youtube.com/embed/UKQ1OL6LWPM`} />
      <iframe src={`https://www.youtube.com/embed/UKQ1OL6LWPM`} />
      <iframe src={`https://www.youtube.com/embed/5mAgMFNhTBY`} allowFullScreen />
    </div>
  );
}
