const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const siblingCount = 1;
  const pageNumbers = [];

  // Define un rango de páginas para mostrar dependiendo de la página actual
  let startPage = Math.max(1, currentPage - siblingCount);
  let endPage = Math.min(currentPage + siblingCount, nPages);

  // Agrega puntos suspensivos y la primera página si no es la primera página
  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  // Agrega las páginas intermedias
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Agrega puntos suspensivos y la última página si no es la última página
  if (endPage < nPages) {
    if (endPage + 1 !== nPages) {
      pageNumbers.push("...");
    }
    pageNumbers.push(nPages);
  }

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
              currentPage === startPage
                ? "disabled opacity-50"
                : "active cursor-pointer"
            }`}
            onClick={goToPrevPage}>
            Anterior
          </a>
        </li>
        {pageNumbers.map((pgNumber, index) => (
          <li
            key={index}
            className={`text-title ${
              currentPage == pgNumber
                ? "active"
                : pgNumber === "..."
                ? "opacity-50"
                : "opacity-50 cursor-pointer"
            } `}>
            {pgNumber === "..." ? (
              <span>{pgNumber}</span>
            ) : (
              <a onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</a>
            )}
          </li>
        ))}

        <li>
          <a
            className={`text-title ${
              currentPage === endPage
                ? "disabled opacity-50"
                : "active cursor-pointer"
            }`}
            onClick={goToNextPage}>
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
