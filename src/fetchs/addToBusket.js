const addProductToBusket = (dataBusket) =>{
    console.log("addProductToBusket", dataBusket);
    fetch("http://localhost:3005/buskets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ...dataBusket,
      }),
    });
  }
  
  export const addProductToBusketOperationFetch = async (hash, items) => {
    const [item] = items;
  
    let dataBusket = {
      userId: item.userId,
      delivered: false,
      paid: false,
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      }),
      ),
    };
    
    addProductToBusket(dataBusket);
  
  
    return {
      error: null,
      res: { ...dataBusket },
    };
  };
  