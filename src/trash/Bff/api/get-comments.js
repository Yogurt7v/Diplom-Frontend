import { transformComment } from "../transformers";

const ALL_COMMENTS_URL = `http://localhost:3004/comments`
const POST_COMMENTS_URL = `http://localhost:3004/comments/?productsId=`


export const getComments = async (productId) => {
  const url = productId === undefined ? ALL_COMMENTS_URL : POST_COMMENTS_URL + productId;

  return fetch(url)
    .then((loadedComments) =>loadedComments.json()
    .then((loadedComments) => loadedComments.map(transformComment))
  );
}


