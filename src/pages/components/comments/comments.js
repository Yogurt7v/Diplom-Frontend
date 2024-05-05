import style from "./comments.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../../icons/edit.svg";
import { SingleComment } from "./single-comment";
import { selectUserId, selectUserRole } from "../../../selectors";
import { useEffect } from "react";
import { ROLE } from "../../../constants";
import { getComments, getRolesFetch,addCommentFetch, deleteCommentFetch } from "../../../fetchs";
import { useParams } from "react-router-dom";
import {setProductData} from "../../../actions";
import { openModal, CLOSE_MODAL } from "../../../actions";



export const Comments = () => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const productId = useParams();
  const [comments, setComments] = useState([]);
  const [roles, setRoles] = useState([]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onNewCommentAdded = (userId, productId, content) => {

    addCommentFetch (userId, productId.id, content).then(
      (productData) => {
        dispatch(setProductData(productData.res));
      })
    setNewComment("");
    
  };

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

  const isGuest = userRole === ROLE.GUEST;


  useEffect(() => {
    Promise.all([
      getComments(productId.id),
      getRolesFetch(setRoles),
    ]).then(([comments, rolesRes]) => {
      setComments(comments);
      setRoles(rolesRes);
    })
    }, [productId.id, onNewCommentAdded, onCommentRemove])



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
          {comments?.map(({ _id, author, content },) => (
            <SingleComment
              key={_id}
              productId={productId}
              id={_id}
              author={author}
              content={content}
              roles={roles}
              onCommentRemove={onCommentRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
};
