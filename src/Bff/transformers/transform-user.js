export const transformUser = (dbUser) => ({
    id: dbUser.id,
    login: dbUser.login,
    role_id: dbUser.role_id,
    password: dbUser.password,
    registeredAt: dbUser.registed_at,
    location:{
        adress: dbUser.location.adress,
        homeNumber: dbUser.location.homeNumber,
        flatNumber: dbUser.location.flatNumber,
    },
    phone: dbUser.phone,
    registed_at: dbUser.registed_at,
})