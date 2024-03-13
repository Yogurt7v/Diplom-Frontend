import style from "./sort.module.css";

export const SortBar = ({ onSort, options }) => {
  return (
    <div className={style.SortBarWrapper}>
      <span className={style.SortBarTitle}>Сортировка</span>
      <select onChange={onSort} className={style.SortBarSelect}>
        <option value="" disabled selected hidden className={style.SortBarOption}>
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value} className={style.SortBarOption}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBar;
