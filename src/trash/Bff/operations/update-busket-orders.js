import { setBusketOrdersParams } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../../constants/role";

export const updateBusketOrders = async (hash, objParams) => {

  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles)
  
  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }
   const id = objParams.id;
  const paidParam = JSON.parse(objParams.paid);
  const deliveryParam = JSON.parse(objParams.delivery)

  setBusketOrdersParams(id, paidParam, deliveryParam);


  return {
    error: null,
    res: true,
  };
};
