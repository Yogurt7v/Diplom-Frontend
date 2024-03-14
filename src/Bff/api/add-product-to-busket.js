import { generateDate } from "../utils/generated-date";
export const addProductToBusket = (dataBusket) =>{
  console.log("addProductToBusket", dataBusket);
  fetch("http://localhost:3004/busket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ...dataBusket,
      publishedAt: generateDate(),
    }),
  });
}
