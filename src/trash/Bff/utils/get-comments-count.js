export const getCommentsCount =  (productsId, comments  = []) => {

    const postComments = comments.filter(({postId: commentPostId}) => commentPostId === productsId)

    return postComments.length
}