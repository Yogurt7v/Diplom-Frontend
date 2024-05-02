import style from "./payment-page.module.css";
import { Header } from "../components";

export const PaymentPage = () => {
  return (
    <>
      <Header />
      <div className={style.PaymentPage}>Здесь будет страница оплаты</div>;
    </>
  );
};
