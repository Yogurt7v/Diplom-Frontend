import style from "./sort.module.css";
export const SortBar = () => {
  return (
    <div className={style.SortBarContent}>
      <span className={style.SortBarSpan}>by price</span>
      <span className={style.SortBarSpan}>by quantity</span>
      <span className={style.SortBarSpan}>by rating</span>
    </div>
  );
};

export default SortBar;