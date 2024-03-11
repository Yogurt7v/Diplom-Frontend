import style from "./sort.module.css";
import price from "../../../icons/price.svg"
import weight from "../../../icons/weight.svg"
import Kcal from "../../../icons/calories.svg"


export const SortBar = () => {
  return (
    <div className={style.SortBarContent}>
      <div className={style.SortBarSpan}>
        <img src={price} alt="price" className={style.SortBarIcon}></img>
      </div>
      <div className={style.SortBarSpan}>
        <img src={weight} alt="weight" className={style.SortBarIcon}></img>
      </div>
      <div className={style.SortBarSpan}>
        <img src={Kcal} alt="Kcal" className={style.SortBarIcon}></img>
      </div>
    </div>
  );
};

export default SortBar;