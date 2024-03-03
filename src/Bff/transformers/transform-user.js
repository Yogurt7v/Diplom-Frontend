export const transformUser = (dbUser) => ({
    id: dbUser.id,
    login: dbUser.login,
    roleId: dbUser.role_id,
    password: dbUser.password,
    registeredAt: dbUser.registed_at,
})