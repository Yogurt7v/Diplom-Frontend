export const addUser = (
  login,
  password,
  address,
  homeNumber,
  flatNumber,
  phone
) =>
  fetch("http://localhost:3005/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      login,
      password,
      address,
      homeNumber,
      flatNumber,
      phone,
    }),
  }).then((createdUser) => createdUser.json());
