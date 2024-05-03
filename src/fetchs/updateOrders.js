// const setBusketOrdersParams = (id, paidParam, deliveryParam) => {
//     fetch(`http://localhost:3005/buskets/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify({
//         paid: paidParam,
//         delivered: deliveryParam,
//       }),
//     }).then((updatedOrder) => updatedOrder.json());
// }
import { setBusketOrdersParams } from "../fetchs/setBusketOrdersParams";

export const updateBusketOrdersFetch = async ( objParams) => {

    const id = objParams.id;
    const paidParam = JSON.parse(objParams.paid);
    const deliveryParam = JSON.parse(objParams.delivery)
  
    setBusketOrdersParams(id, paidParam, deliveryParam);
  
  
    return {
      error: null,
      res: true,
    };
  };