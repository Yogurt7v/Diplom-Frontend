export const transformProducts = (dbProducts) =>  ({
    id: dbProducts.id,
    productName: dbProducts.productName,
    description: dbProducts.description,
    image_url: dbProducts.image_url,
    category: dbProducts.category,
    price: dbProducts.price
})