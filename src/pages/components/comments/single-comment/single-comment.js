import style from "./single-comment.module.css";
import userLogo from "../../../../icons/user.svg";
import trash from "../../../../icons/trash.svg";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../selectors";

export const SingleComment = ({ id, author, content, roles, onCommentRemove }) => {

  const userRole = useSelector(selectUserRole);

  const isAdminOrModerator = [roles[0].id, roles[1].id].includes(userRole);

  return (
    <>
    <div className={style.commentWrapper}>
      <div className={style.comment}>
        <div className={style.content}>{content}</div>
        <div className={style.author}>
          <img src={userLogo} alt="userLogo" className={style.userLogo} />
          {author}
        </div>
      </div>
      { isAdminOrModerator && <div  onClick={() => onCommentRemove(id)}>
        <img src={trash} alt="delete" className={style.deleteComment} />
        </div>}
      </div>
    </>
  );
};
