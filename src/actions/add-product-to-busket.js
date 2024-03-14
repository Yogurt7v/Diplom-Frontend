import { addBusketData } from "./add-busket-data";

export const addProductToBusketAction =
  (requestServer, items) =>
  (dispatch) => {
    requestServer(
      "addProductToBusketOperation",
      items
    ).then((busketData) => {
      // dispatch(addBusketData(busketData.res));
    });
  };
