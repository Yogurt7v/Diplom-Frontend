import { addComment, getProduct } from "../api";
import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
import { getProductIdCommentsWithAuthor } from "../utils";

export const addProductComment = async (hash ,userId, productId, content) => {

  const accessRoles =[ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER] 

  const access = await sessions.access(hash, accessRoles)


  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  await addComment(userId, productId, content);

  const product = await getProduct(productId);

  const commentsWithAuthor = await getProductIdCommentsWithAuthor(productId);

  return {
    error: null,
    res: { ...product, comments: commentsWithAuthor },
  };
};
