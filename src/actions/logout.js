import { ACTION_TYPE } from "./action-type";
import { sessions } from "../fetchs/sessions"

export const logout = (session) => {
    sessions.remove(session);
    return {
        type: ACTION_TYPE.LOGOUT,

    }
}