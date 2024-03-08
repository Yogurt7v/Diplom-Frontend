import style from "./register-page.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../Bff/";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { setUser } from "../../actions";
import { ROLE } from "../../constants/role";
import { useResetForm } from "../../hooks";
import { VideoBackground } from "../components";

const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/\w+$/, "Логин не подходит. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Логин слишком мал")
    .max(15, "Неверный логин. Логин слишком большой"),
  password: yup
    .string()
    .required("Пустой пароль")
    .matches(/^[\w#%]+$/, "Неподходящий пароль. Допускаются только буквы, цифры и символы")
    .min(8, "Неверный пароль. Слишком мал. Не меньше 8 символов")
    .max(30, "Неверный пароль. Пароль слишком большой. Не больше 30 символов"),
  passcheck: yup
    .string()
    .required("Пустой пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать!"),
  address: yup.string().required("Заполните адрес"),
  homeNumber: yup.string().required("Заполните домашний номер"),
  flatNumber: yup.string().required("Заполните квартиру"),
  phone: yup
  .string()
  .matches(phoneRegExp, 'Телефонный номер не подходит')
  .required('Заполните телефон')
  .min(10, 'Неверный телефон. Не меньше 9 символов')
  .max(10, 'Неверный телефон. Не больше 9 символов'),
});

export const RegisterPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
      address: "",
      homeNumber: "",
      flatNumber: "",
      phone: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  const [serverError, setServerError] = useState();
  const roleId = useSelector(selectUserRole);
  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ login, password, address,homeNumber, flatNumber, phone  }) => {
    server.register(login, password, address,homeNumber, flatNumber, phone).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка запроса ${error}`);
        return;
      }
      dispatch(setUser(res));
      sessionStorage.setItem("userData", JSON.stringify(res));
    });
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;
  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={style.registerPageWrapper}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Логин"
            {...register("login", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="password"
            placeholder="Пароль"
            autoComplete="on"
            {...register("password", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="password"
            placeholder="Повтор пароля"
            autoComplete="on"
            {...register("passcheck", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="text"
            placeholder="Адрес"
            autoComplete="on"
            {...register("address", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="text"
            placeholder="Номер дома"
            autoComplete="on"
            {...register("homeNumber", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="text"
            placeholder="Номер квартиры"
            autoComplete="on"
            {...register("flatNumber", {
              onChange: () => setServerError(null),
            })}
          ></input>
          <input
            type="tel"
            pattern="8-([0-9]{3})-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            autoComplete="on"
            {...register("phone", {
              onChange: () => setServerError(null),
            })}
          ></input>

          <button
            type="submit"
            disabled={!!formError}
            children={"Зарегистрироваться"}
          ></button>
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
        </form>
      </div>
      <VideoBackground/>
    </>
  );
};
