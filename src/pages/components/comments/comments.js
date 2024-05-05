import style from "./comments.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../../icons/edit.svg";
import { SingleComment } from "./single-comment";
import { selectUserId, selectUserRole } from "../../../selectors";
import { useEffect } from "react";
import { ROLE } from "../../../constants";
import { getComments,addCommentFetch, deleteCommentFetch } from "../../../fetchs";
import { useParams } from "react-router-dom";
import {setProductData} from "../../../actions";
import { openModal, CLOSE_MODAL } from "../../../actions";



export const Comments = () => {
  const [newComment, setNewComment] = useState(null);
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const productId = useParams();
  
  const isGuest = userRole === ROLE.GUEST;
  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментрарий?",
        onConform: () => {
          deleteCommentFetch(id);
          setComments(comments.filter((comment) => comment._id !== id));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onNewCommentAdded = (userId, productId, content) => {
    if (!content || content.trim() === "") {
      setErrorMessage("Комментарий не может быть пустым");
      return;
    }
    addCommentFetch (userId, productId, content).then(
      (productData) => {
        setComments([...comments, productData]);
      })
    setNewComment(null);
  };


  useEffect(() => {
    getComments(productId.id).then((comments) => setComments(comments));
    }, [productId.id, setComments]);

  return (
    <>
      <div className={style.commentsWrapper}>
        {!isGuest && (
          <>
            <div className={style.errorMessage}>{errorMessage}</div>
            <div className={style.inputWrapper}>
              <textarea
                className={style.Textaria}
                name="comment"
                value={newComment}
                placeholder="Ваш комментарий..."
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
    
          <div className={style.commentTitle}>Комментарии</div>
          {comments?.map(({ _id, authorId, productId, content },) => (
            <SingleComment
              key={_id}
              productId={productId}
              id={_id}
              author={authorId}
              content={content}
              onCommentRemove={onCommentRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
};
