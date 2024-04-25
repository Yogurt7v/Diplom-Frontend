
export const updateUserRoleFetch = async (userId, newRoleId) => {
  const response = await fetch(
    `http://localhost:3005/users/${userId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ role_id: newRoleId }),
    }
  );
  const updatedRole = await response.json();
  return updatedRole;
}
