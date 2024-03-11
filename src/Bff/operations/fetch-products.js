import { getProducts, getComments } from "../api";
import { getCommentsCount } from "../utils";

export const fetchProducts = async (searchPhrase, page, limit) => {

  const [{ products, links }, comments] = await Promise.all([
    getProducts(searchPhrase, page, limit),
    getComments(),
  ]);

  return {
    error: null,
    res: {
      products: products.map((prod) => ({
        ...prod,
        commentsCount: getCommentsCount(prod.id, comments),
      })),
      links,
    },
  };
};
