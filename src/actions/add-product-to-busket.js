import { addBusketData } from "./add-busket-data";

export const addProductToBusketAction =
  (requestServer, userId, productId, productName, quantity, price) =>
  (dispatch) => {
    requestServer(
      "addProductToBusketOperation",
      userId,
      productId,
      productName,
      quantity,
      price
    ).then((busketData) => {
      dispatch(addBusketData(busketData.res));
    });
  };
