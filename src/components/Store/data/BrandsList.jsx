export default function BrandsList({
  brands,
  handleEdit = null,
  handleDelete = null,
}) {
  return (
    <ul className="card-text list-group">
      {!brands.length ? (
        <li className="list-group-item">  
          <p className="text-danger">
            <i className="fas fa-info-circle mr-1"></i>
            No exiten marcas para este proveedor!
          </p>
        </li>
      ) : (
        brands.map((brand) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={brand.id}
            >
              <span className="text-dark text-uppercase text-truncate">
                <i className="fas fa-thumbtack mr-1"></i>
                {brand.name}
              </span>
              
              <div>
                {handleEdit && (
                  <span
                    className="badge badge-dark badge-pill py-1 mr-2"
                    style={{ cursor: "pointer" }}
                    title="Editar"
                    onClick={() => handleEdit(brand)}
                  >
                    <i className="fas fa-edit"></i>
                  </span>
                )}

                {handleDelete && (
                  <span
                    className="badge badge-danger badge-pill py-1"
                    style={{ cursor: "pointer" }}
                    title="Eliminar"
                    onClick={() => handleDelete(brand)}
                  >
                    <i className="fas fa-trash"></i>
                  </span>
                )}
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
}
