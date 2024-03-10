import style from "./pagination.module.css";

export const Pagination = ({ setPage, lastPage, page }) => {
  return (
    <div className={style.Pagination}>
      <button
        onClick={() => setPage(1)}
        className={page === 1 ? style.disabled : style.normal}

      >
        Start page
      </button>
      <button
        onClick={() => setPage(page - 1)}
        className={page === 1 ? style.disabled : style.normal}

      >
        Previous page
      </button>
      <div className={style.currentPage} >
        Page: {page}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        className={page === lastPage ? style.disabled : style.normal}

      >
        Next page
      </button>
      <button
        onClick={() => setPage(lastPage)}
        className={page === lastPage ? style.disabled : style.normal}

      >
        End page
      </button>
    </div>
  );
};
