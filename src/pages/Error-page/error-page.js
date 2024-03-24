import style from "./error-page.module.css";
import { VideoBackground } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const ErrorPage = ({  error }) =>{

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <>
    <div className={style.ErrorPage}>
      <h2 className={style.ErrorPageTitle}>Ошибка</h2>
      <div className={style.ErrorPageText}>{error}</div>
      <button className={style.ErrorPageButton}>Вернуться на главную</button>
    </div>
    <VideoBackground />
    </>

  )
}