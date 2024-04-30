import { addProductToBusket } from "../api";
// import { ROLE } from "../../constants/role";
// import { sessions } from "../sessions";
// import { getProductIdCommentsWithAuthor } from "../utils";

export const addProductToBusketOperationFetch = async (hash, items) => {
  const [item] = items;

  let dataBusket = {
    userId: item.userId,
    delivered: false,
    paid: false,
    items: items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    }),
    ),
  };
  
  addProductToBusket(dataBusket);


  return {
    error: null,
    res: { ...dataBusket },
  };
};
