export const getOrdersFetch = async () => {

    const orders = await fetch(`http://localhost:3005/orders`)
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => 
      loadedOrder)

    return {
      error: null,
      res: orders, 
    };
  }