export const addCommentFetch = (userId, productId, content) =>
  fetch("http://localhost:3005/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      authorId: userId,
      productsId: productId,
     content,
    }),
    }).then((createdUser) => createdUser.json());

