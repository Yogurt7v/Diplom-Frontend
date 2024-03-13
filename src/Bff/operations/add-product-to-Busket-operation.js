import { addProductToBusket } from "../api";
// import { ROLE } from "../../constants/role";
// import { sessions } from "../sessions";
// import { getProductIdCommentsWithAuthor } from "../utils";

export const addProductToBusketOperation = async (hash, userId, productId, productName, quantity, price) => {

//воспользуйся хэшем!!

  addProductToBusket(userId, productId, productName, quantity, price);
  let obj = {
    userId,
    productId,
    productName,
    quantity,
    price,
  }

  // console.log("newAddedbusket", newAddedbusket);

//   const access = await sessions.access(hash, accessRoles)


//   if (!access) {
//     return {
//       error: "Доступ запрещен",
//       res: null,
//     };
//   }

  // await addProductToBusket(id, productName, quantity, price, userId);

  // const product = await getProduct(productId);

// //   const commentsWithAuthor = await getProductIdCommentsWithAuthor(productId);

  return {
    error: null,
    res: { ...obj },
  };
};
