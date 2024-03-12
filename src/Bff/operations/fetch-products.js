import { getProducts, getComments } from "../api";
import { getCommentsCount } from "../utils";

export const fetchProducts = async (searchPhrase, searchCategory) => {

  const [{ products }, comments] = await Promise.all([
    getProducts(searchPhrase, searchCategory),
    getComments(),
  ]);

  return {
    error: null,
    res: {
      products: products.map((prod) => ({
        ...prod,
        commentsCount: getCommentsCount(prod.id, comments),
      })),
    },
  };
};
