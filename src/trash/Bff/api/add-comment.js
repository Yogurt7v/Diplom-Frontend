import { generateDate } from "../utils/generated-date";
export const addComment = (userId, productId, content) =>
  fetch("http://localhost:3004/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      authorId: userId,
      productsId: productId,
      publishedAt: generateDate(),
     content,
    }),
  });
