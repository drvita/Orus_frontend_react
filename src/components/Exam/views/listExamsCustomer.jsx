import React from "react";
import moment from "moment";

const ListExamComponent = (props) => {
  const { exams = [], allSelect = false, ChangeInput: _ChangeInput } = props;

  return (
    <table className="table m-0">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Folio</th>
          <th scope="col">Registro</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody>
        {!exams.length ? (
          <tr>
            <th colSpan="4" className="text-center">
              <i className="fas fa-info-circle mr-1"></i>
              No hay registros
            </th>
          </tr>
        ) : null}
        {exams.map((row) => {
          return (
            <tr
              key={row.id}
              className={
                moment(new Date()).isSame(moment(row.created_at), "day")
                  ? "table-active"
                  : ""
              }
            >
              <td>
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    name={"exam_" + row.id}
                    id={"exam_" + row.id}
                    onChange={(e) => _ChangeInput(row)}
                    disabled={allSelect ? false : row.estado ? false : true}
                  />
                  <label htmlFor={"exam_" + row.id}></label>
                </div>
              </td>
              <th scope="row">
                <span className="text">#{row.id}</span>
              </th>
              <td>
                <i className="fas fa-clock mr-2"></i>
                {moment(row.created_at).fromNow()}
              </td>
              <td>
                {row.estado ? (
                  <span className="badge badge-success">
                    <i className="fas fa-check"></i> Terminado
                  </span>
                ) : (
                  <span className="badge badge-secondary">
                    <i className="fas fa-hourglass"></i> Activo
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListExamComponent;
