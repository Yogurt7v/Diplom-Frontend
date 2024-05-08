export const deleteProductFetch = (id) =>
  fetch(`http://localhost:3005/products/${id}`, {
    method: "DELETE",
  });
