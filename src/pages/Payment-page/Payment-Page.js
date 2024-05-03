import style from "./payment-page.module.css";
import { Header } from "../components";
import { useSelector } from "react-redux";

export const PaymentPage = () => {

    const user = useSelector(state => state.user)
    
    console.log("user", user);
  return (
    <>
      <Header />
      <div className={style.PaymentPage}>Здесь будет страница оплаты</div>;
    </>
  );
};
