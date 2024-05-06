import style from "./single-comment.module.css";
import userLogo from "../../../../icons/user.svg";
import trash from "../../../../icons/trash.svg";
import { ROLE } from "../../../../constants";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../../selectors";

export const SingleComment = ({ id, author, content, onCommentRemove }) => {

  const userRole = useSelector(selectUserRole);
  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);


  return (
    <>
    <div className={style.commentWrapper}>
      <div className={style.comment}>
        <div className={style.content}>{content}</div>
        <div className={style.author}>
          <img src={userLogo} alt="userLogo" className={style.userLogo} />
          <div className={style.authorName}>{author}</div>
        </div>
      </div>
      { isAdminOrModerator && <div  onClick={() => onCommentRemove(id)} className={style.commentDeleteWrapper}>
        <img src={trash} alt="delete" className={style.deleteComment} />
        </div>}
      </div>
    </>
  );
};
