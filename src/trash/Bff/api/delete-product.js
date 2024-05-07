
export const deleteProduct = (id) =>
  fetch(`http://localhost:3004/products/${id}`, {
    method: "DELETE",
  });
