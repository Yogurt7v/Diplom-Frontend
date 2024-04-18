import { sessions } from "../Bff/sessions";
// import { getUser } from "../api/get-user";

export const loginUser = async (authLogin, authPassword) => {
  const user = await fetch("http://localhost:3005/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ login:authLogin, password:authPassword }),
  }).then((res) => res.json());

  console.log("loginUser", user);

  const { _id, login, role_id } = await user

  console.log(_id, login, role_id);

  return {
    error: null,
    res: {
      id: user._id,
      login: user.login,
      roleId: user.role_id,
      session: sessions.create(user),
    },
  };
};
