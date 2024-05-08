export const getOrderByUserIdFetch = async (userId) => {  

    const orders = await fetch(`http://localhost:3005/buskets/${userId}`)
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => 
      loadedOrder)
      
    return orders
  }