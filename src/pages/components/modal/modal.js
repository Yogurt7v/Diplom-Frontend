import style from "./modal.module.css";
import { useSelector } from "react-redux";
import { selectModalIsOpen, selectModalText, selectModalOnConform, selectModalOnCancel } from "../../../selectors";


export const Modal =()=>{

    const isOpen = useSelector(selectModalIsOpen)
    const text = useSelector(selectModalText)
    const onConform = useSelector(selectModalOnConform)
    const onCancel = useSelector(selectModalOnCancel)

    if (!isOpen) {
        return null
    }

    return (
        <div className={style.modal}>
        <div className={style.overlay}></div>
        <div className={style.modalContent}>
            <h3>{text}</h3>
            <div className={style.modalButtons}>
                <button onClick={onConform} className={style.modalButton}>Ок</button>
                <button onClick={onCancel} className={style.modalButton}>Отмена</button>
            </div>
        </div>
    </div>
    )
}