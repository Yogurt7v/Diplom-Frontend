export const getComments = async (productId) => {
    const comments = await fetch(`http://localhost:3005/comments/${productId}`);
    const commentsJson = await comments.json();
    return commentsJson;
}