export const getSinlgeProduct = async (productId) => {
    const transformProducts = (dbProducts) =>  ({
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
    


    let product;
    let error;
  
    try {
      product =   await fetch(`http://localhost:3004/products/${productId}`)
  .then((res)=> {
    if (res.ok) {
       return res
    }

    const error = res.status === 404 ? "Такого не существует" : "Ошибка";

    return Promise.reject(error);

  })
    .then((loadedProduct) => loadedProduct.json())
    .then((loadedPr) => loadedPr && transformProducts(loadedPr));
    } catch(postError) {
      error = postError;
    }
  
    if (error) {
      return {
        error,
        res:null,
      }
    }
  
    const commentsWithAuthor = await getProductIdCommentsWithAuthor(productId);
  
    return {
      error: null,
      res: {
        ...product,
        comments: commentsWithAuthor,
      },
    };
  };
  