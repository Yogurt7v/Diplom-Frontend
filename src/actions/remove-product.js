export const removeProduct = (requestServer, id) => () => 
  requestServer("removeProduct", id);

