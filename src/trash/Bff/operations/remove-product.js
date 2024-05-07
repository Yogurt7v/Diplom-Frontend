import { deleteComment, deleteProduct, getComments } from "../api";
import { ROLE } from "../../constants/role";
import { sessions } from "../sessions";
export const removeProduct = async (hash, id) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return {
      error: "Доступ запрещен",
      res: null,
    };
  }

  await deleteProduct(id);

  const comments = await getComments(id);

  await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

  await deleteComment(id);
  return {
    error: null,
    res: true,
  };
};
