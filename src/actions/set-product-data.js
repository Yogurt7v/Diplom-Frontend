import { ACTION_TYPE } from "../actions/action-type";

export const setProductData = (productData) => ({
  type: ACTION_TYPE.SET_PRODUCT_DATA,
  payload: productData,
});
