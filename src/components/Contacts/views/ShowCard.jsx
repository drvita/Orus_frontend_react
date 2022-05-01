import { useHistory } from "react-router-dom";
import Search from "./ShowCardSearch";

export default function ShowContactComponent(props) {
  const { data = {}, readOnly = false, title = "contacto", legend } = props;
  const history = useHistory();

  return (
    <div className="w-100 d-block">
      {legend && !data.id && (
        <span className="text-sm text-muted ml-4 w-100 d-block">
          <label>Primero:</label> {legend}
        </span>
      )}

      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text text-capitalize">
            <i className="fas fa-user mr-2"></i> {title}
          </span>
        </div>
        {data.id ? (
          <>
            <span className="form-control bg-light">
              {data.name.toUpperCase()}
              <span className="badge badge-secondary mx-1">
                <i className="fas fa-envelope mr-1"></i>
                {data.email ? data.email : "--"}
              </span>
              <span className="badge badge-secondary ml-1">
                <i className="fas fa-calendar mr-1"></i>
                {data.age ? `${data.age} años` : "--"}
              </span>
            </span>
            {!readOnly && (
              <div className="float-right">
                <div className="btn-group btn-sm d-print-none">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      window.Swal.fire({
                        title: "Contactos",
                        text: `¿Esta seguro de cambiar de ${props.title}?`,
                        icon: "question",
                        showCancelButton: true,
                        // confirmButtonColor: "#d33",
                        confirmButtonText: "Cambiar",
                        cancelButtonText: "Cancelar",
                        showLoaderOnConfirm: true,
                      }).then(({ dismiss }) => {
                        if (!dismiss) {
                          props.handleContactSelect({ id: 0 });
                        }
                      });
                    }}
                    title="Cambiar"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>
                  <button
                    className="btn bg-indigo btn-sm"
                    onClick={() => history.push(`/contactos/${data.id}`)}
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Search
            title={title}
            handleSelectContact={(contact) => {
              props.handleContactSelect(contact);
            }}
          />
        )}
      </div>
    </div>
  );
}
