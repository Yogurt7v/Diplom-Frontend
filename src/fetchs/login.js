import { sessions } from "../Bff/sessions";

export const loginUser = async (authLogin, authPassword) => {
  const user = await fetch("http://localhost:3005/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ login:authLogin, password:authPassword }),
  }).then((res) => res.json());

  return {
    error: null,
    res: {
      id: user.user._id,
      login: user.user.login,
      roleId: user.user.role_id,
      session: sessions.create(user),
    },
  };
};
