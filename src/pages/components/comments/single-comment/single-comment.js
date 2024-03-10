import style from "./single-comment.module.css";
import userLogo from "../../../../icons/user.svg";

export const SingleComment = ({ id, author, content, publishedAt }) => {
  return (
    <>
      <div className={style.comment}>
        <div className={style.content}>{content}</div>
        <div className={style.author}>
          <img src={userLogo} alt="userLogo" className={style.userLogo} />
          {author}
        </div>
      </div>
    </>
  );
};
