export const transformComment = (dbComment) => {
    return {
        id: dbComment.id,
        authorId: dbComment.authorId,
        productsId: dbComment.productsId,
        publishedAt: dbComment.publishedAt,
        content: dbComment.content,
    };
}
