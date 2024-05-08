import { ACTION_TYPE } from "./action-type";

export const removeBusketData = (busketData) => ({
  type: ACTION_TYPE.REMOVE_BUSKET_DATA,
  payload: busketData,
});