import { useState } from "react";

export default function Pagination({ pagination, onChangePage }) {
  const total = Math.ceil(pagination.total / pagination.limit);
  const [page, setPage] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
    onChangePage(page);
  };

  const renderPaginationItems = () => {
    const pagesToShow = Math.min(10, total);
    const currentPageGroup = Math.floor(page / pagesToShow);

    return Array.from({ length: pagesToShow }, (_, index) => {
      const result = index + currentPageGroup * pagesToShow;
      if (result >= total) return null;

      return (
        <li
          key={result}
          className={`page-item ${result === page ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(result)}
          >
            {result + 1}
          </button>
        </li>
      );
    });
  };

  return (
    <nav className="mt-3">
      <ul className="pagination pagination-sm justify-content-end">
        <li className={`page-item ${page === 0 && "disabled"}`}>
          <button onClick={() => handlePageChange(0)} className="page-link">
            {"<<"}
          </button>
        </li>
        <li className={`page-item ${page === 0 && "disabled"}`}>
          <button
            onClick={() => handlePageChange(page - 1)}
            className="page-link"
          >
            {"<"}
          </button>
        </li>
        {renderPaginationItems()}
        <li className="page-item">
          <button
            className={`page-link ${page + 1 === total && "disabled"}`}
            onClick={() => handlePageChange(page + 1)}
          >
            {">"}
          </button>
        </li>
        <li className={`page-item ${page + 1 === total && "disabled"}`}>
          <button
            onClick={() => handlePageChange(total - 1)}
            className="page-link"
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
