import style from "./single-comment.module.css";



export const SingleComment = ({ id, author, content, publishedAt }) => {
    return (
        <>
        <div className={style.comment}>
            <div className={style.content}>{content}</div>
            <div className={style.author}>{author}</div>
        </div>
        </>
    );
}