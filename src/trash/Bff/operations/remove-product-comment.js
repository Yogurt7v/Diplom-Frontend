import { deleteComment, getProduct } from "../api";
import { getProductIdCommentsWithAuthor } from "../utils";
import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
export const removeProductComment = async (hash, productId, id) => {

  const accessRoles =[ROLE.ADMIN, ROLE.MODERATOR] 

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  await deleteComment(id);

  const product = await getProduct(productId);

  const commentsWithAuthor = await getProductIdCommentsWithAuthor(productId);

  return {
    error: null,
    res: { ...product, comments: commentsWithAuthor },
  };
};
