import { sessions } from "../fetchs/sessions";

export const loginUser = async (authLogin, authPassword) => {
  const user = await fetch("http://localhost:3005/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ login:authLogin, password:authPassword }),
  }).then((res) => res.json());

  if (user.error) {
    return {
      error: user.error,
      res: null,
    };
  }

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
