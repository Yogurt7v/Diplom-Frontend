import { transformUser } from "../transformers";

export const getUserFetch = async (loginToFind) => {
  return fetch(`http://localhost:3004/users?login=${loginToFind}`)
  .then((loadedUser) => loadedUser.json())
  .then(([loadedUser]) => loadedUser && transformUser(loadedUser))
};

