import style from "./payment-page.module.css";
import { Header } from "../components";
import { VideoBackground } from "../components/video-background.js/video-background";

export const PaymentPage = () => {
  return (
    <>
      <Header />
      <div className={style.PaymentPage}>Здесь будет страница оплаты</div>;
      <VideoBackground />
    </>
  );
};
