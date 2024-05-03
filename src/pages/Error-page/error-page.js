import style from "./error-page.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 7000);
  }, []);

  return (
    <>

    <div className={style.ErrorPage}>
      <h2 className={style.ErrorPageTitle}>Ошибка</h2>
      <div className={style.ErrorPageText}>{error}</div>
      <section className={style.errorContainer}>
        <span className={style.Numbers}>
          <span className={style.Numbers}>4</span>
        </span>
        <span className={style.Numbers}>0</span>
        <span className={style.Numbers}>
          <span className={style.Numbers}>4</span>
        </span>
      </section>
      <button className={style.ErrorPageButton} onClick={() => navigate("/")}>Вернуться на главную</button>
    </div>
    </>
  );
};
