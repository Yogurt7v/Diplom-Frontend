import { getProduct } from "../api";
import { getProductIdCommentsWithAuthor } from "../utils";

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

  const commentsWithAuthor = await getProductIdCommentsWithAuthor(productId);

  return {
    error: null,
    res: {
      ...product,
      comments: commentsWithAuthor,
    },
  };
};
