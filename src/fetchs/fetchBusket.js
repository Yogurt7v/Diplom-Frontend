export const fecthBusket = async () => {

    const busket = await fetch(`http://localhost:3005/buskets`)
    .then((loadedBusket) => loadedBusket.json())
    .then((loadedBusk) => loadedBusk);

  
    return {
      error: null,
      res: busket
    }
  }