// import { addBusketData } from "./add-busket-data";

export const addProductToBusketAction =
  (requestServer, items, userOnPage) =>
  (dispatch) => {
    requestServer(
      "addProductToBusketOperation",
      items,
      userOnPage
    ).then((busketData) => {
      // dispatch(addBusketData(busketData.res));
    });
  };
