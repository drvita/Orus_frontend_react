export default function PaginationComponent({
  meta,
  color,
  handlePagination: _handlePagination,
}) {



  const handleChangePage = (page) => {
    //console.log("Siguiente página",page);
    if (_handlePagination) {
      _handlePagination(page);
    } else {
      console.error("[OrusSystem] Funcion de paginador no definida");
    }
  };

  return (
    <div className="btn-group">
      <ul className="pagination pagination-sm m-0 mb-1">
        <li
          className={
            meta.current_page === 1 ? "page-item disabled" : "page-item test-"
          }
        >
          <a
            className={
              meta.current_page === 1
                ? "page-link text-secondary"
                : "page-link text-" + color
            }
            href="#pageBefore"
            onClick={(e) => {
              e.preventDefault();
              handleChangePage(1);
            }}
          >
            Primero
          </a>
        </li>
        <li
          className={
            meta.current_page === 1 ? "page-item disabled" : "page-item"
          }
        >
          <a
            className={
              meta.current_page === 1
                ? "page-link text-secondary"
                : "page-link text-" + color
            }
            href="#pageBefore"
            onClick={(e) => {
              e.preventDefault();
              handleChangePage(meta.current_page - 1);
            }}
          >
            <i className="fas fa-caret-left"></i>
          </a>
        </li>
        <li className="page-item">
          <span className="page-link text-dark">
            {meta.current_page && meta.last_page ? (
              <>
                {meta.current_page} /{meta.last_page}
              </>
            ) : (
              "..."
            )}
          </span>
        </li>
        <li
          className={
            meta.current_page === meta.last_page
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a
            className={
              meta.current_page === meta.last_page
                ? "page-link text-secondary"
                : "page-link text-" + color
            }
            href="#pageBefore"
            onClick={(e) => {
              e.preventDefault();
              handleChangePage(meta.current_page + 1);
            }}
          >
            <i className="fas fa-caret-right"></i>
          </a>
        </li>
        <li
          className={
            meta.current_page === meta.last_page
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a
            className={
              meta.current_page === meta.last_page
                ? "page-link text-secondary"
                : "page-link text-" + color
            }
            href="#pageBefore"
            onClick={(e) => {
              e.preventDefault();
              handleChangePage(meta.last_page);
            }}
          >
            Ultimo
          </a>
        </li>
      </ul>
    </div>
  );
}
