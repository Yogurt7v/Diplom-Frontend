import style from "./single-comment.module.css";
import userLogo from "../../../../icons/user.svg";
import trash from "../../../../icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { openModal, CLOSE_MODAL } from "../../../../actions";
import { selectUserRole } from "../../../../selectors";
import { ROLE } from "../../../../constants";
import { deleteCommentFetch } from "../../../../fetchs/deleteComment";

export const SingleComment = ({ id, author, productId, content }) => {

  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментрарий?",
        onConform: () => {
          deleteCommentFetch(id);
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

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
