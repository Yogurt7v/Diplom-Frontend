export const removeUserFetch = async (userId) => 
  fetch(`http://localhost:3005/users/${userId}`, {
    method: "DELETE",
  });