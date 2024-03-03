import { sessions } from "../sessions";
import { getUser } from "../api/get-user";

export const authorize = async (authLogin, authPassword) => {
  const user = await getUser(authLogin);

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
      session: sessions.create(user),
    },
  };
};
