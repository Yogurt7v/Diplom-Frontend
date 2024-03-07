import style from "./error-page.module.css";


export const ErrorPage = ({  error }) => 
  error && (
    <div>
      <h2>Ошибка</h2>
      <div>{error}</div>
    </div>
  )