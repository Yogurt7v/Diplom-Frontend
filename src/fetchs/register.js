// import { sessions } from "../fetchs/sessions";
export const registerFetch = async (
  regLogin,
  regPassword,
  address,
  homeNumber,
  flatNumber,
  phone
) => {
  const user = await fetch("http://localhost:3005/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login: regLogin,
      password: regPassword,
      address: address,
      homeNumber: homeNumber,
      flatNumber: flatNumber,
      phone: phone,
    }),
  }).then((createdUser) => createdUser.json());
  return user;
};
