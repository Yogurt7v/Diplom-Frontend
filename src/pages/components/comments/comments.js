import style from "./comments.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../../icons/edit.svg";
import { SingleComment } from "./single-comment";
import { useServerRequest } from "../../../hooks";
import { addCommentAsync } from "../../../actions";
import { selectUserId, selectUserRole } from "../../../selectors";
import { ROLE } from "../../../constants";

export const Comments = ({ comments, productId }) => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);

  const onNewCommentAdded = (userId, productId, content) => {
    dispatch(addCommentAsync(requestServer, userId, productId, content));
    setNewComment("");
  };

  const isGuest = userRole === ROLE.GUEST;

  return (
    <>
      <div className={style.commentsWrapper}>
        {!isGuest && (
          <>
            <div className={style.inputWrapper}>
              <textarea
                className={style.Textaria}
                name="comment"
                value={newComment}
                placeholder="Your comment..."
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />

              <div className={style.EditIconWrapper}
                onClick={() => onNewCommentAdded(userId, productId, newComment)}
              >
                <img src={edit} alt="edit" className={style.EditIcon} />
              </div>
            </div>
          </>
        )}
        <div className={style.comments}>
          <div className={style.commentTitle}>Комментарий</div>
          {comments.map(({ id, author, content, publishedAt }) => (
            <SingleComment
              key={id}
              postId={productId}
              id={id}
              author={author}
              content={content}
              publishedAt={publishedAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};
