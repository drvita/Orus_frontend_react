import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import StatusToString from "./status_span";

const listInbox = ({
  pedidos,
  editId,
  handleDeleteOrder: _handleDeleteOrder,
  handleSelectOrder: _handleSelectOrder,
}) => {
  return (
    <table className="table table-hover table-striped">
      <tbody>
        {pedidos.length ? (
          pedidos.map((pedido) => {
            return (
              <tr
                key={pedido.id}
                className={
                  editId.length && editId.indexOf(pedido.id) >= 0
                    ? "table-dark"
                    : ""
                }
              >
                <td>
                  <div className="icheck-primary">
                    {!pedido.nota ? (
                      <button
                        className="btn btn-default btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          _handleDeleteOrder(pedido.id);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    ) : null}
                  </div>
                </td>
                <td className="mailbox-name" style={{ cursor: "pointer" }}>
                  <a
                    href="#edit"
                    onClick={(e) => {
                      e.preventDefault();
                      _handleSelectOrder(pedido.id);
                    }}
                  >
                    <div className="w-100">
                      <span className="badge badge-warning">{pedido.id}</span>
                    </div>
                    <label
                      className="p-1 text-dark text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      {pedido.paciente.nombre}
                      <i className="ml-1 fas fa-pencil-alt text-secondary"></i>
                    </label>
                  </a>
                </td>
                <td className="mailbox-subject text-uppercase">
                  <StatusToString status={pedido.estado} />
                  <br />
                  {pedido.estado === 1 ? (
                    <div>
                      <span className="mr-1 text-dark">
                        {pedido.laboratorio
                          ? pedido.laboratorio.nombre
                          : "Sin asignar"}
                      </span>
                      {pedido.laboratorio ? "/ " + pedido.folio_lab : ""}
                    </div>
                  ) : pedido.estado === 2 ? (
                    <small>
                      {pedido.caja
                        ? "CAJA: " + pedido.caja
                        : "Caja no asignada"}
                    </small>
                  ) : !pedido.estado ? (
                    <small>
                      {pedido.examen
                        ? pedido.examen.estado === 1
                          ? "Examen completado"
                          : "Examen no realizado"
                        : "Examen no asignado"}
                    </small>
                  ) : pedido.estado >= 3 ? (
                    <small>Perdido terminado</small>
                  ) : (
                    "--"
                  )}
                </td>
                <td className="mailbox-attachment">
                  <label className="w-100 m-0 p-0">Nota: </label>
                  {pedido.nota ? (
                    <Link to={"/notas/registro/" + pedido.nota.id}>
                      <span className="badge badge-success">
                        {pedido.nota.id}
                      </span>
                    </Link>
                  ) : (
                    "--"
                  )}
                </td>
                <td className="mailbox-date">
                  <label>Registrado:</label>
                  <br />
                  {moment(pedido.created_at).format("ll")}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <th colSpan="10" className="text-center">
              No hay datos para mostrar
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default listInbox;
