import { getUsersFetch } from "./getUsers";

export const getComments = async (productId) => {
    const comments = await fetch(`http://localhost:3005/comments/${productId}`);
    const commentsJson = await comments.json();

    const users = await getUsersFetch();

    commentsJson.forEach((comment) => {
        const foundedUser = users.find(({ id }) => id === comment.authorId);
        comment.author = foundedUser?.login;
    });
    return commentsJson;
}