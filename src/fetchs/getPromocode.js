export const getPromocodeFetch = async () => {
    const promo = await fetch("http://localhost:3005/promocodes/")
    .then((loadedOrders) => loadedOrders.json())
    .then((loadedOrder) => 
      loadedOrder)
    return promo
  }