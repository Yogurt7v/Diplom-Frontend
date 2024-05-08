import { sessions } from "../../fetchs/sessions"

export const logout = async (userSession) => 
    sessions.remove(userSession);