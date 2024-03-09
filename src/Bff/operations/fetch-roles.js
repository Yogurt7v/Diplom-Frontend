import { ROLE } from "../../constants";
import { sessions } from "../sessions";
import { getRoles } from "../api/get-roles";

export const fetchRoles = async (hash) => {

    const accessRoles = [ROLE.ADMIN]


    const access = await sessions.access(hash, accessRoles)
    
    if (!access) {
      return {
        error: "Доступ запрещен",
        res: null,
      };
    }

    const roles = await getRoles();

    return {
      error: null,
      res: roles, 
    };
  }