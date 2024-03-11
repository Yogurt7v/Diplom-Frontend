import style from "./error-page.module.css";


export const ErrorPage = ({  error }) => 
  error && (
    <div className={style.ErrorPage}>
      <h2 className={style.ErrorPageTitle}>Ошибка</h2>
      <div className={style.ErrorPageText}>{error}</div>
    </div>
  )