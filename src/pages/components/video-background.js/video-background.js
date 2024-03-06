import style from "./video-background.module.css";

export const VideoBackground = () => {
  return (
    <>
      <iframe
        className={style.videoBackground}
        src="https://www.youtube.com/embed/gKKLbQbXpw4?autoplay=1&mute=1&controls=0&loop=1&playlist=gKKLbQbXpw4"
        title="YouTube video player"
      ></iframe>
    </>
  );
};
