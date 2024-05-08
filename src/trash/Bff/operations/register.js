import { sessions } from "../sessions";
export const register = async (regLogin, regPassword, address,homeNumber, flatNumber, phone) => {

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
  
    return {
      error: null,
      res: {
        login: user.login,
        location:{
          address: user.address,
          homeNumber: user.homeNumber,
          flatNumber: user.flatNumber,
        },
        phone: user.phone,
        role_id: user.role_id,
        session: sessions.create(user),
        card: null,
      },
    };
  }