export const removeUserFetch = async (userId) => {
    console.log("removeUserFetch", userId);
  fetch(`http://localhost:3005/users/${userId}`, {
    method: "DELETE",
  });
  };