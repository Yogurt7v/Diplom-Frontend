export const setBusketOrdersParams = (id, paidParam, deliveryParam) => {
fetch(`http://localhost:3004/busket/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
    paid: paidParam,
    delivered: deliveryParam,
  }),
}).then((updatedOrder) => updatedOrder.json());
}