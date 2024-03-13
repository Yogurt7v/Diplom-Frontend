import { generateDate } from "../utils/generated-date";
export const addProductToBusket = (userId, productId, productName, quantity, price) =>
  fetch("http://localhost:3004/busket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      userId: userId,
      productId:productId,
      productName: productName,
      quantity: quantity,
      price: price,
      publishedAt: generateDate(),
    }),
  });
