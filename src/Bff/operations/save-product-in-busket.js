import { updatedProduct, addProduct } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../../constants/role";

export const saveProductInBusket = async (hash, newProductData) => {

    console.log("saveProductInBusket", newProductData);

//   const accessRoles = [ROLE.ADMIN];

//   const access = await sessions.access(hash, accessRoles);

//   if (!access) {
//     return {
//       error: "Доступ запрещен",
//       res: null,
//     };
//   }

//   const savedProduct =
//     newProductData.id === ""
//       ? await addProduct(newProductData)
//       : await updatedProduct(newProductData);

//   return {
//     error: null,
//     res: savedProduct,
//   };
};
