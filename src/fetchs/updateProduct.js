export const updatedProductFetch = async ({ id, productName, image_url, description, weight, calories, ingredients, category, price }) =>{
  const updatedProduct = await fetch(`http://localhost:3005/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      productName: productName,
      description: description,
      category: category,
      weight: weight,
      calories: calories,
      ingredients: ingredients,
      price: price,
      image_url: image_url,
    }),
  }).then((loadedProd) => loadedProd.json());
  return updatedProduct
}
