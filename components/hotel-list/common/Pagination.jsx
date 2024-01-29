"use client";

const Pagination = ({
  pagination,
  currentPage,
  setCurrentPage,
  filterTotalResult,
}) => {
  const handlePageClick = (pageNumber) => {
    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }, 500);
    setCurrentPage(pageNumber);
  };

  const handleMovePage = (direction) => {
    if (direction === "LEFT") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
    } else {
      if (currentPage === pagination.totalPages) return;
      setCurrentPage(currentPage + 1);
    }
    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }, 500);
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderPages = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(i);
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage)
    );
    return pages;
  };

  const renderMaxResult = () => {
    let maxResult = pagination.offset + pagination.limit;
    if (maxResult > filterTotalResult) maxResult = filterTotalResult;
    return (
      <>
        {pagination.offset} – {maxResult} of{" "}
      </>
    );
  };
  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <button
            onClick={() => handleMovePage("LEFT")}
            className="button -blue-1 size-40 rounded-full border-light"
          >
            <i className="icon-chevron-left text-12" />
          </button>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
            {pagination.totalPages > 10 && (
              <>
                <div className="col-auto">
                  <div className="size-40 flex-center rounded-full">...</div>
                </div>
                <div className="col-auto">
                  <div className="size-40 flex-center rounded-full">
                    {pagination.totalPages}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>

          <div className="text-center mt-30 md:mt-10">
            <div className="text-14 text-light-1">
              {renderMaxResult()}
              {filterTotalResult} hotels found
            </div>
          </div>
        </div>

        <div className="col-auto md:order-2">
          <button
            onClick={() => handleMovePage("RIGHT")}
            className="button -blue-1 size-40 rounded-full border-light"
          >
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
