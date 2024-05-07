import { sessions } from "../../fetchs/sessions";
import { getUserFetch } from "../../fetchs/getUser";

export const authorize = async (authLogin, authPassword) => {
  const user = await getUserFetch(authLogin);


  if (!user) {
    return {
      error: "Пользователь не найден",
      res: null,
    };
  }
  const { id, login, password, roleId } = user;


  if (authPassword !== password) {
    return {
      error: "Неверный пароль",
      res: null,
    };
  }

  return {
    error: null,
    res: {
      id: id,
      login: login,
      roleId: roleId,
      session: sessions.create(user.res),
    },
  };
};
