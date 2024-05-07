import { sessions } from "../fetchs/sessions";

export const loginUser = async (authLogin, authPassword) => {
  const user = await fetch("http://localhost:3005/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ login:authLogin, password:authPassword }),
  }).then((res) => res.json());

  console.log("loginUser", user);

  if (user.error) {
    return {
      error: user.error,
      res: null,
    };
  }

  return {
    error: null,
    res: {
      id: user.res._id,
      login: user.res.login,
      roleId: user.res.role_id,
      session: sessions.create(user),
    },
  };
};
