import { ACTION_TYPE } from "./action-type";

export const addBusketData = (busketData) => ({
  type: ACTION_TYPE.ADD_BUSKET_DATA,
  payload: busketData,
});