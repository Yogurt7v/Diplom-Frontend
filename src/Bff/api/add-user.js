import { generateDate } from "../utils";
export const addUser = (login, password, address,homeNumber, flatNumber, phone) =>
  fetch("http://localhost:3004/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
      location: {
        address,
        homeNumber,
        flatNumber,
      },
      phone,
      registed_at: generateDate(),
      role_id: 2,

    }),
  }).then((createdUser) => createdUser.json());
