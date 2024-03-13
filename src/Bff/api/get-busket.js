export const getBusket = () =>
  fetch(`http://localhost:3004/busket`)
    .then((loadedBusket) => loadedBusket.json())
    .then((loadedBusk) => loadedBusk);
