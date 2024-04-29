import style from "./comments.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../../icons/edit.svg";
import { SingleComment } from "./single-comment";
import { useServerRequest } from "../../../hooks";
import { addCommentAsync } from "../../../actions";
import { selectUserId, selectUserRole } from "../../../selectors";
import { useEffect } from "react";
import { ROLE } from "../../../constants";
import { getComments } from "../../../fetchs/getComments";
import { useParams } from "react-router-dom";
import {addCommentFetch} from "../../../fetchs/addComment";
import {setProductData} from "../../../actions";



export const Comments = () => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);
  const productId = useParams();
  const [comments, setComments] = useState([]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onNewCommentAdded = (userId, productId, content) => {

    dispatch(addCommentAsync(requestServer, userId, productId, content));
    addCommentFetch (userId, productId.id, content).then(
      (productData) => {
        dispatch(setProductData(productData.res));
      })
    setNewComment("");
    window.location.reload();
    
  };

  const isGuest = userRole === ROLE.GUEST;


  useEffect(() => {
    getComments(productId.id).then((com) => {
      setComments(com);
    })
    }, [productId.id])



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
            />
          ))}
        </div>
      </div>
    </>
  );
};
