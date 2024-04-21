
export const deleteCommentFetch = (commentId) =>
fetch(`http://localhost:3005/comments/${commentId}`, {
    method: "DELETE",
  });