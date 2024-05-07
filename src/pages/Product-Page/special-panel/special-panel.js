import style from "./special-panel.module.css";
import trash from "../../../icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserRole } from "../../../selectors";
import { openModal, CLOSE_MODAL } from "../../../actions";
import { ROLE } from "../../../constants/role";
import { checkAccess } from "../../../utils";
import { deleteProductFetch } from "../../../fetchs";

export const SpecialPanel = ({ id, editButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);

  const onProductRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить продукт?",
        onConform: () => {
          deleteProductFetch(id).then(() => {
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
    <div className={style.SpecialPanel}>
      {isAdmin && (
        <div className={style.SpecialPanelButtons}>
          {editButton}
          <div>
            <img
              src={trash}
              alt="delete"
              onClick={() => onProductRemove(id)}
              className={style.TrashIcon}
            />
          </div>
        </div>
      )}
    </div>
  );
};
