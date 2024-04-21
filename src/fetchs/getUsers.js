function transformUser(dbUser) {
  return {
    id: dbUser._id,
    login: dbUser.login,
    roleId: dbUser.role_id,
    registeredAt: dbUser.createdAt,
    address: dbUser.address,
    homeNumber: dbUser.homeNumber,
    flatNumber: dbUser.flatNumber,
    phone: dbUser.phone,
  };
}

export const getUsersFetch = async () => {
  const users = await fetch("http://localhost:3005/users", {
    method: "GET",
  }).then(
    (loadedUsers) => loadedUsers.json()
  );
  const modifyUsers = users.map(transformUser);
  return modifyUsers;
};
