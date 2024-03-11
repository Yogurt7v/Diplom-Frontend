import {
  authorize,
  register,
  logout,
  fetchProducts,
  fetchProduct,
  saveProductAsync,
  fetchUsers,
  fetchRoles,
  updateUserRole,
  removeUser,
  addProductComment,
  removeProductComment
} from "./operations";

export const server = {
  authorize,
  register,
  logout,
  fetchProducts,
  fetchProduct,
  fetchUsers,
  fetchRoles,
  updateUserRole,
  removeUser,
  saveProductAsync,
  addProductComment,
  removeProductComment
};
