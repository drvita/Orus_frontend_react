import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";

import Main from "../../../layouts/list_inbox";
import helper from "../helpers";
import useOrder from "../../../hooks/useOrder";
import { Order } from "../../../context/OderContext";

const InboxOrderComponent = (props) => {
  const orderContext = Order();
  const orderHook = useOrder();
  const options = orderContext?.options;

  const [pedidos, setPedidos] = useState({
    data: [],
    meta: {},
    loading: false,
  });

  const { _saveOrder } = props;

  const history = useHistory();

  const [orderSelected, setOrderSelected] = useState({ id: 0 });

  const getList = () => {
    if (!options) return null;

    setPedidos({
      ...pedidos,
      loading: true,
    });

    orderHook.getListOrders(options).then((data) => {
      if (data) {
        setPedidos({
          data: data.data,
          meta: data.meta,
        });
      } else {
        console.error("Error al obtener la lista de pedidos");
      }
    });
  };

  const handleChangeOptions = (key, value) => {
    orderContext?.set({
      ...orderContext,
      options: {
        ...options,
        [key]: value,
      },
    });
  };

  const handleSelectOrder = (e, order = { id: 0 }) => {
    if (e) e.preventDefault();
    if (order.id !== 0) {
      history.push(`/pedidos/${order.id}`);
    } else {
      history.push(`pedidos/${orderSelected.id}`);
    }
  };

  const handleOrderSelect = ({ checked }, pedido) => {
    if (!checked) pedido = { id: 0 };
    setOrderSelected(pedido);
  };

  const deleteOrder = () => {
    window.Swal.fire({
      title: "¿Estás seguro de eliminar la orden?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(({ dismiss }) => {
      if (!dismiss) {
        orderHook.deleteOrder(orderSelected.id);

        window.Swal.fire({
          icon: "success",
          title: "Orden eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        orderContext.set({
          ...orderContext,
          options: {
            page: 1,
            orderby: "created_at",
            order: "desc",
            itemsPage: 10,
            status: 0,
            search: "",
          },
        });
      }
    });
  };

  const handleStatus = () => {
    if (orderSelected.id && orderSelected.estado < 3) {
      helper.handleSaveOrder(
        orderSelected.id,
        { status: 3 },
        options,
        _saveOrder
      );
    }
    setOrderSelected({ id: 0 });
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, [options]);

  return (
    <Main
      title="Listado de pedidos"
      icon="clipboard-list"
      color="warning"
      meta={pedidos.meta}
      itemSelected={orderSelected.id}
      loading={pedidos.loading}
      defaultSearch={options?.search}
      handlePagination={(page) => handleChangeOptions("page", page)}
      handleSearch={(search) => handleChangeOptions("search", search)}
      handleEditItem={handleSelectOrder}
      handleDeleteItem={deleteOrder}
      handleSync={() => {
        orderContext.set({
          ...orderContext,
          options: {
            page: 1,
            orderby: "created_at",
            order: "desc",
            itemsPage: 10,
            status: 0,
            search: "",
          },
        });
      }}
      handleStatus={handleStatus}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Nota</th>
            <th>
              {options?.orderby === "created_at" ? "Registrado" : "Modificado"}
            </th>
          </tr>
        </thead>
        <tbody>
          {pedidos.data.length ? (
            pedidos.data.map((pedido) => {
              return (
                <tr key={pedido.id}>
                  <td>
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        className="form-check-input mt-4"
                        value={pedido.id}
                        id={"order_" + pedido.id}
                        checked={orderSelected.id === pedido.id ? true : false}
                        disabled={pedido.status > 2}
                        onChange={({ target }) =>
                          handleOrderSelect(target, pedido)
                        }
                      />
                      <label
                        htmlFor={"order_" + pedido.id}
                        className="sr-only"
                      ></label>
                    </div>
                  </td>
                  <td>#{pedido.id}</td>
                  <td
                    className="mailbox-name text-truncate text-capitalize text-bold"
                    style={{ cursor: "pointer" }}
                  >
                    <a
                      href="#edit"
                      onClick={(e) => handleSelectOrder(e, pedido)}
                    >
                      <span
                        className={
                          pedido.status > 2
                            ? "text-muted"
                            : "text-dark text-bold"
                        }
                      >
                        <i className="fas fa-user text-sm mr-2"></i>
                        {pedido.paciente.name}
                      </span>
                    </a>
                  </td>
                  <td className="mailbox-subject">
                    <span
                      className={`badge badge-${
                        pedido.status < 3 ? "primary" : "secondary"
                      } mr-2 text-uppercase`}
                    >
                      {helper.handleStatusString(pedido.status)}
                    </span>
                    {pedido.status === 1 ? (
                      <div>
                        <span className="mr-1 text-dark">
                          {pedido.lab ? pedido.lab.nombre : "Sin asignar"}
                        </span>
                        {pedido.lab ? "/ " + pedido.npedidolab : ""}
                      </div>
                    ) : pedido.status === 2 ? (
                      <small>
                        {pedido.ncaja
                          ? "CAJA: " + pedido.ncaja
                          : "Caja no asignada"}
                      </small>
                    ) : !pedido.status ? (
                      <small>
                        {pedido.exam
                          ? pedido.exam.status === 1
                            ? "Examen completado"
                            : "Examen no realizado"
                          : "Examen no asignado"}
                      </small>
                    ) : pedido.status === 3 ? (
                      <small className="text-dark">Sin entregar</small>
                    ) : null}
                  </td>
                  <td className="mailbox-attachment">
                    {pedido.sale ? (
                      <Link to={"/notas/registro/" + pedido.sale.id}>
                        <span className="badge badge-success">
                          {pedido.sale.id}
                        </span>
                      </Link>
                    ) : (
                      "--"
                    )}
                  </td>
                  <td className="mailbox-date">
                    {options.orderby === "created_at"
                      ? moment(pedido.created_at).format("ll")
                      : moment(pedido.updated_at).fromNow()}
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
    </Main>
  );
};

export default InboxOrderComponent;
