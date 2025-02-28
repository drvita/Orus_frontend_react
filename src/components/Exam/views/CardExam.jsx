/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";

export default function CardShowExam({
  data,
  disabled,
  handleRemove: _handleRemove,
  handleEdit: _handleEdit,
}) {

 
  return (
    <>
      <p className="card-text">
        <span className="badge badge-success mr-3 mb-2">{`# ${data.id}`}</span>
      </p>
      <p className="font-weight-bold">
        Creado:{" "}
        <span className="font-weight-normal">
          {moment(data.created_at).fromNow()}
        </span>
      </p>
      <p className="font-weight-bold">
        Fecha:{" "}
        <span className="font-weight-normal">
          {moment(data.created_at).format("LL")}
        </span>
      </p>
      <p className="font-weight-bold">
        Estatus:{" "}
        <span className="font-weight-normal">
          {data.status ? "Completo" : "En proceso"}
        </span>
      </p>

      <div>
        <button
          className="btn btn-secondary mr-1"
          disabled={disabled}
          onClick={() => {
            window.Swal.fire({
              icon: "question",
              title: "¿Realmente desea cambiar el examen?",
              showConfirmButton: true,
              confirmButtonText: "Sí",
              showCancelButton: true,
              cancelButttonText: "Cancelar",
            }).then(({ dismiss }) => {
              if (!dismiss) {
                _handleRemove();
              }
            });
          }}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Cambiar
        </button>
        <button
          className="btn btn-info"
          disabled={disabled}
          onClick={_handleEdit}
        >
          <i className="fas fa-edit mr-2"></i>
          Editar
        </button>
      </div>
    </>
  );
}
