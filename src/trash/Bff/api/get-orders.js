
export const getOrders = async () => {
  return fetch(`http://localhost:3004/busket`)
  .then((loadedOrders) => loadedOrders.json())
  .then((loadedOrder) => 
    loadedOrder)
};

