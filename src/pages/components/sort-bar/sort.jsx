import style from "./sort.module.css";
export const SortBar = () => {
  return (
    <div className={style.SortBarContent}>
      <span>by price</span>
      <span>by quantity</span>
      <span>by rating</span>
    </div>
  );
};

export default SortBar;
Ы