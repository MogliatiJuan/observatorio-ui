const Pagination = ({ nPages, currentPage, setCurrentPage, updateData }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="m-2 flex justify-center gap-x-4">
        <li>
          <a
            className={`text-title ${
              currentPage === 1 ? "disabled" : "active cursor-pointer"
            }`}
            onClick={goToPrevPage}
          >
            Anterior
          </a>
        </li>

        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`text-title ${
              currentPage == pgNumber ? "active" : "opacity-50 cursor-pointer"
            } `}
          >
            <a onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</a>
          </li>
        ))}

        <li>
          <a
            className={`text-title ${
              currentPage === nPages
                ? "disabled opacity-50"
                : "active cursor-pointer"
            }`}
            onClick={goToNextPage}
          >
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
