function transformProducts (dbProducts) {
    return {
    id: dbProducts._id,
    productName: dbProducts.productName,
    description: dbProducts.description,
    image_url: dbProducts.image_url,
    category: dbProducts.category,
    weight: dbProducts.weight,
    calories: dbProducts.calories,
    ingredients: dbProducts.ingredients,
    price: dbProducts.price
    }
}


export const getSingleProduct = async (productId) =>
  await fetch(`http://localhost:3005/getProduct/${productId}`)
  .then((res)=> {
    if (res.ok) {
       return res
    }

    const error = res.status === 404 ? "Такого не существует" : "Ошибка";

    return Promise.reject(error);

  })
    .then((loadedProduct) => loadedProduct.json())
    .then((loadedPr) => loadedPr && transformProducts(loadedPr));
