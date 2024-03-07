import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../../selectors";
import {removeProduct, openModal, CLOSE_MODAL} from "../../../actions";
import {ROLE} from "../../../constants/role";
import { checkAccess } from "../../../utils";

export const SpecialPanel = ({  id , editButton }) => {

    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);
  
    const onPostRemove = (id) => {
      dispatch(
        openModal({
          text: "Удалить продукт?",
          onConform: () => {
            dispatch(removeProduct(requestServer, id)).then(() => {
              navigate(`/`);
            });
            dispatch(CLOSE_MODAL);
          },
          onCancel: () => dispatch(CLOSE_MODAL),
        })
      );
    };
  
    const isAdmin = checkAccess([ROLE.ADMIN], userRole);
  
    return (
      <div>
        <div className="special-panel">
          {/* {publishedAt && (
            <div className="published-at">
              <img alt="datepublish"
              />
            </div>
          )}
          {publishedAt} */}
        </div>
        {isAdmin && (<div className="buttons">
          {editButton}
             <div onClick={() => onPostRemove(id)}>
            <img alt="delete"/>
          </div>
        </div>)}
      </div>
    );
  };