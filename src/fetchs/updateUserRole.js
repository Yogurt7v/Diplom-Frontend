export const updateUserUpdateFetch = async (
  userId,
  newRoleId,
  newAddress,
  newHomeNumber,
  newFlatNumber,
  newPhone
) => {
  const response = await fetch(`http://localhost:3005/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      role_id: newRoleId,
      address: newAddress,
      homeNumber: newHomeNumber,
      flatNumber: newFlatNumber,
      phone: newPhone,
    }),
  });
  const updatedRole = await response.json();
  return updatedRole;
};
