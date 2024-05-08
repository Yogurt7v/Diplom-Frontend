export const addProductFetch = async({ productName, image_url, description, category, price, weight, calories, ingredients }) =>{
    fetch("http://localhost:3005/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          productName,
          image_url,
          description,
          weight,
          calories,
          ingredients,
          category,
          price,
        }),
      }).then((createdPost) => createdPost.json())
    }