export const getAllProducts = async (searchPhrase, searchCategory) => {
  if (!searchPhrase && !searchCategory) {
    const response = await fetch("http://localhost:3005/products");
    const res = await response.json();
    return res;
  }
  if (searchPhrase || searchCategory) {
    const response = await fetch(`http://localhost:3005/products/withFilter`, {
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
    return res;
  }
};
