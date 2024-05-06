import style from "./comments.module.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../../icons/edit.svg";
import { SingleComment } from "./single-comment";
import { selectUserId, selectUserRole } from "../../../selectors";
import { useEffect } from "react";
import { ROLE } from "../../../constants";
import { getComments,addCommentFetch, deleteCommentFetch, getUsersFetch } from "../../../fetchs";
import { useParams } from "react-router-dom";
import { openModal, CLOSE_MODAL } from "../../../actions";



export const Comments = () => {
  const [newComment, setNewComment] = useState(null);
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [author, setAuthor] = useState(null);
  const productId = useParams();
  const ref = useRef(null);

  
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
  const onNewCommentAdded = (author, userId, productId, content) => {
    console.log(author, userId, productId.id, content);
    if (!content || content.trim() === "") {
      setErrorMessage("Комментарий не может быть пустым");
      return;
    }
    addCommentFetch (author, userId, productId.id, content)
    .then(
      (productData) => {
        setComments([...comments, productData]);
      })
      ref.current.value = null;
    setNewComment(null);
  };


  useEffect(() => {
    getUsersFetch().then((users) => {
      const user = users.find((user) => user.id === userId);
      setAuthor(user.login);
    }) 
    getComments(productId.id).then((comments) => setComments(comments));
    }, [productId.id, setComments, userId]);


  return (
    <>
      <div className={style.commentsWrapper}>
        {!isGuest && (
          <>
            <div className={style.errorMessage}>{errorMessage}</div>
            <div className={style.inputWrapper}>
              <textarea
                className={style.Textaria}
                ref={ref}
                name="comment"
                value={newComment}
                placeholder="Ваш комментарий..."
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />

              <div className={style.EditIconWrapper}
                onClick={() => onNewCommentAdded(author, userId, productId, newComment)}
              >
                <img src={edit} alt="edit" className={style.EditIcon} />
              </div>
            </div>
          </>
        )}
        <div className={style.comments}>
    
          <div className={style.commentTitle}>Комментарии</div>
          {comments?.map(({ _id, author, productId, content },) => (
            <SingleComment
              key={_id}
              productId={productId}
              id={_id}
              author={author}
              content={content}
              onCommentRemove={onCommentRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
};
