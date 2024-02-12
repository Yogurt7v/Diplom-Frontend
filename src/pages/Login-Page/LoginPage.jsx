import style from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { server } from "../../Bff/";
import { useState } from "react";


const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Пустой логин")
    .matches(/\w/, "Логин не подходит. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Логин слишком мал")
    .max(15, "Неверный логин. Логин слишком большой"),
  password: yup
    .string()
    .required("Пустой пароль")
    .matches(/^[\w#%&   ] +$/, "Допускаются только буквы, цифры и символы")
    .min(8, "Неверный пароль. Слишком мал. Не меньше 8 символов")
    .max(30, "Неверный пароль. Пароль слишком большой. Не больше 30 символов"),
});


export const LoginPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState("");

  // const onSubmit = ({ login, password }) => {
  //   server.authorize(login, password).then((error, res) => {
  //     if (error) {
  //       setServerError(`Ошибка запроса ${error}`);
  //     }
  //   });
  // };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  return (
    <>
      <div className={style.LoginPageWrapper}>
        <div className={style.LoginPageContent}>Login Page</div>
        <input className={style.LoginInput} type="text" placeholder="Login" {...register("login")}/>
        <input className={style.PasswordInput} type="password" placeholder="Password" {...register("password")} />
        <button className={style.LoginButton} type="submit" disabled={!!formError}>Enter</button>
        <div className={style.RegistrationLink}>Registraion</div>

        {errorMessage && <div className={style.ErrorMessage}>{errorMessage}</div>}
      </div>
    </>
  );
};

export default LoginPage;
