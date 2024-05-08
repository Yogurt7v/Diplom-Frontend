import { getBusket } from "../api";

export const fecthBusket = async () => {

  const busket = await getBusket()

  return {
    error: null,
    res: busket
  }
}