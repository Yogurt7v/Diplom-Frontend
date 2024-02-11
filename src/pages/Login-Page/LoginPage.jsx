import style from "./LoginPage.module.css";
import Header from "../components/header/Header";

export const LoginPage = () => {
  return (
    <>
      <Header />
      <div className={style.LoginPageWrapper}>
        <div className={style.LoginPageContent}>Login Page</div>
        <input className={style.LoginInput} type="text" placeholder="Login" />
        <input className={style.PasswordInput} type="password" placeholder="Password" />
        <button className={style.LoginButton}>Enter</button>
        <div className={style.RegistrationLink}>Registraion</div>
      </div>
    </>
  );
};

export default LoginPage;
