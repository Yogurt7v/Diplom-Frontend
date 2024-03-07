import { getProduct } from "../api";
// import { getPostIdCommentsWithAuthor } from "../utils";

export const fetchProduct = async (productId) => {
  let product;
  let error;

  try {
    product = await getProduct(productId);
  } catch(postError) {
    error = postError;
  }

  if (error) {
    return {
      error,
      res:null,
    }
  }

//   const commentsWithAuthor = await getPostIdCommentsWithAuthor(postId);

  return {
    error: null,
    res: {
      ...product,
    //   comments: commentsWithAuthor,
    },
  };
};
