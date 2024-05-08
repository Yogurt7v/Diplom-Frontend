export const transformProducts = (dbProducts) =>  ({
    id: dbProducts.id,
    productName: dbProducts.productName,
    description: dbProducts.description,
    image_url: dbProducts.image_url,
    category: dbProducts.category,
    weight: dbProducts.weight,
    calories: dbProducts.calories,
    ingredients: dbProducts.ingredients,
    price: dbProducts.price
})
