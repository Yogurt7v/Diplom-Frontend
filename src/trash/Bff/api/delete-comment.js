export const deleteComment = async (commentId) => {

    fetch(`http://localhost:3004/comments/${commentId}`, {
      method: "DELETE",
    });
  };
  