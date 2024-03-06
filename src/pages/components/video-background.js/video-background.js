import style from "./video-background.module.css";

export const VideoBackground = () => {
  return (
    <>
      <iframe
        сlassName={style.videoBackground}
        src="https://www.youtube.com/embed/gKKLbQbXpw4?si=_2nePNO1nIQNEpzV&amp;controls=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; muted; loop; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </>
  );
};

