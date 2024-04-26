export const getAllProducts = async (searchPhrase, searchCategory) => {
  if (!searchPhrase && !searchCategory) {
    const response = await fetch("http://localhost:3005/products");
    const res = await response.json();
    return res;
  }
  if (searchPhrase || searchCategory) {
    console.log("searchPhrase", searchPhrase);
    const response = await fetch(`http://localhost:3005/productsWithFilter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        searchPhrase: searchPhrase,
        searchCategory: searchCategory,
      }),
    });
    const res = await response.json();
    console.log("getAllProducts", res);
    return res;
  }
};
