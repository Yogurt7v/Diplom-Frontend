import style from "./pagination.module.css";

export const Pagination = ({
  perPage,
  products,
  paginate,
  nextPage,
  previousPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products.length / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.PaginationWrapper}>
      <ul className={style.Pagination}>
        <button onClick={previousPage} className={style.normal}>
          {"<"}
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={style.normal}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        <button onClick={nextPage} className={style.normal}>
          {">"}
        </button>
      </ul>
    </div>
  );
};
