import { getComments, getUsers } from "../api";

export const getProductIdCommentsWithAuthor = async (productId) => {
  const comments = await getComments(productId);

  console.log("comments",comments);
  const users = await getUsers();

  return comments.map((comment) => {
    const user = users.find(({ id }) => id === comment.authorId);

    return {
      ...comment,
      author: user?.login,
    };
  });
};
