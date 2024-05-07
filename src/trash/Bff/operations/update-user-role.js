import { setUserRole } from "../api/set-user-role";
import { sessions } from "../sessions";
import { ROLE } from "../../constants/role";

export const updateUserRole = async (userId, newUserRoleId) => {

  return setUserRole(userId, newUserRoleId);
};
