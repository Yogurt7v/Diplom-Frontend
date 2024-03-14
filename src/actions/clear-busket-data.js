import { ACTION_TYPE } from "./action-type";

export const clearBusketData = (busketData) => ({
  type: ACTION_TYPE.CLEAR_BUSKET_DATA,
  payload: busketData,
});