import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "../Layouts/pagination";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const sdd = JSON.parse(localStorage.getItem("OrusOrderList"));
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));

    this.state = {
      pedidos: {
        data: [],
        meta: {},
      },
      orderSelect: 0,
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd ? sdd.orderby : "updated_at",
      order: sdd ? sdd.order : "desc",
      search: sdd ? sdd.search : "",
      host: ls.host,
      token: ls.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getPedidos(false);
    localStorage.setItem(
      "OrusOrderList",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
      })
    );
  }
  componentDidUpdate(props, state) {
    if (
      (state.load === false && this.state.load === true) ||
      props.status !== this.props.status ||
      (this.props.update && props.update !== this.props.update)
    ) {
      this.getPedidos(props.status !== this.props.status ? true : false);
    }
    localStorage.setItem(
      "OrusOrderList",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
      })
    );
  }

  render() {
    const { pedidos, orderSelect, search, load } = this.state,
      { editId } = this.props;
    return (
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="mr-1 fas fa-clipboard-list"></i>
            Listado de pedidos
          </h3>
          <div className="card-tools">
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar pedido"
                value={search}
                onChange={this.handleChangeSearchInput}
                onKeyPress={(e) => {
                  const { key } = e;
                  if (key === "Enter") {
                    this.handleSearchOrder();
                  }
                }}
              />
              <div className="input-group-append">
                <div
                  className="btn btn-primary"
                  onClick={this.handleSearchOrder}
                >
                  <i className="fas fa-search"></i>
                </div>
              </div>
              {search.length > 2 ? (
                <div className="input-group-append">
                  <div
                    className="btn btn-secondary"
                    onClick={this.handleSearchErase}
                  >
                    <i className="fas fa-window-close"></i>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="p-0 card-body table-responsive">
          <div className="mailbox-controls">
            <div className="btn-group">
              <button
                className="btn btn-default btn-sm"
                onClick={this.handleDelete}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
            <div className="float-right">
              <Pagination
                meta={pedidos.meta}
                handleChangePage={this.handleChangePage}
              />
            </div>
          </div>
          <table className="table table-hover table-striped">
            <tbody>
              {pedidos.data.length ? (
                pedidos.data.map((pedido) => {
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
                          <input
                            type="checkbox"
                            name={"order_" + pedido.id}
                            id={"order_" + pedido.id}
                            value={pedido.id}
                            checked={orderSelect === pedido.id ? true : false}
                            onChange={this.handleCheckboxOrder}
                            disabled={pedido.nota ? true : false}
                          />
                          <label htmlFor={"order_" + pedido.id}></label>
                        </div>
                      </td>
                      <td className="mailbox-name">
                        {editId.length && editId.indexOf(pedido.id) >= 0 ? (
                          <React.Fragment>
                            <span className="badge badge-secondary">
                              {pedido.id}
                            </span>
                            <br />
                            <span className="p-1 badge badge-secondary text-capitalize">
                              {pedido.paciente.nombre}
                              <i className="ml-1 fas fa-pencil-alt"></i>
                            </span>
                            <span
                              className="ml-1 badge badge-warning"
                              title="Bloqueado"
                            >
                              <i className="fas fa-ban"></i>
                            </span>
                          </React.Fragment>
                        ) : (
                          <a
                            href="#edit"
                            onClick={(e) => this.handleEditOrder(e, pedido.id)}
                          >
                            <span className="badge badge-warning">
                              {pedido.id}
                            </span>
                            <br />
                            <span className="p-1 badge badge-danger text-capitalize">
                              {pedido.paciente.nombre}
                              <i className="ml-1 fas fa-pencil-alt"></i>
                            </span>
                          </a>
                        )}
                      </td>
                      <td className="mailbox-subject text-uppercase">
                        {this.setStatusString(pedido.estado)}
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
                              ? pedido.examen.estado === "Terminado"
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
                        <label>Nota: </label>
                        <br />
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
        </div>
        {load ? (
          <div className="overlay">
            <i className="fas fa-2x fa-sync-alt"></i>
          </div>
        ) : null}
      </div>
    );
  }

  handleEditOrder = (e, id) => {
    e.preventDefault();
    const { handleChangeInput } = this.props;
    handleChangeInput("orderId", id);
  };
  handleSearchErase = (e) => {
    //Elimina el contenido del campo de busqueda
    this.setState({
      search: "",
      load: true,
    });
  };
  handleSearchOrder = (e) => {
    //Ejecuta la orden de busqueda
    this.getPedidos();
  };
  handleChangeSearchInput = (e) => {
    //Maneja el cambio de contenido en el campo de busqueda
    const { value } = e.target;
    this.setState({
      search: value,
    });
  };
  handleCheckboxOrder = (e) => {
    //Selecciona el pedido
    const { value } = e.target;
    let orderSelect = parseInt(value);
    if (this.state.orderSelect === orderSelect) {
      orderSelect = 0;
    }
    this.setState({
      orderSelect,
    });
  };
  setStatusString = (status) => {
    //Maneja los codigos de estado
    switch (status) {
      case 0:
        return <span className="text-warning text-uppercase">En proceso</span>;
      case 1:
        return <span className="text-info text-uppercase">En laboratorio</span>;
      case 2:
        return <span className="text-primary text-uppercase">Bicelación</span>;
      case 3:
        return <span className="text-success text-uppercase">Terminado</span>;
      case 4:
        return <span className="text-info text-uppercase">Entregado</span>;
      default:
        return <span className="text-secondary text-uppercase">Garantia</span>;
    }
  };
  handleChangePage = (id) => {
    //Maneja el cambia la pagina del paginador
    this.setState({
      page: id,
      load: true,
    });
  };
  handleDelete = (e) => {
    const { host, token, orderSelect } = this.state;

    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el pedido de " + orderSelect + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          //Inicio de proceso de eliminción por API
          console.log("Solicitud de eliminación de order por API");
          return fetch("http://" + host + "/api/orders/" + orderSelect, {
            method: "DELETE",
            signal: this.signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then(async (response) => {
              let back = {};
              if (response.status !== 204) back = await response.json();
              if (!response.ok) {
                throw new Error(back.message ? back.message : response.status);
              }
              return back;
            })
            .catch((e) => {
              const debugTxt = e.toString(),
                txtObj = debugTxt.split(":");

              console.error("[Orus fetch] ", txtObj);
              if (txtObj.length > 2) {
                let txt = "Error desconocido verifique la consola";
                if (txtObj[1].toString().replace(" ", "") === "SQLSTATE[23000]")
                  txt =
                    "El pedido esta ligado a una nota de venta, no se puede eliminar";

                window.Swal.fire("Fallo de datos", txt, "error");
              } else if (txtObj.length === 2) {
                window.Swal.fire(
                  "Fallo de conexion",
                  "Verifique la conexion al servidor: " + txtObj[1],
                  "error"
                );
              }
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        console.log("Pedido eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Pedido eliminado con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getPedidos());
      } else if (result && !result.dismiss) {
        console.log("Orus res: ", result);
        window.Swal.fire(
          "Error",
          "Se perdio la conexion con el servidor",
          "error"
        );
      }
    });
  };
  getPedidos(update) {
    //Variables en localStorage
    const { status, handleChangeInput } = this.props;
    const { search, page, order, orderby, host, token, load } = this.state,
      url = "http://" + host + "/api/orders",
      ordenar = `&orderby=${orderby}&order=${order}`,
      buscar = search ? `&search=${search}` : "",
      estado = status >= 0 ? "&status=" + status : "",
      pagina = page > 0 && !update ? "?page=" + page : "?page=1",
      itemsPage = "&itemsPage=20";

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }

    //Realiza la peticion de los contactos
    console.log("[Inbox order] Descargando pedidos de API");
    fetch(url + pagina + ordenar + buscar + estado + itemsPage, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          console.log("[Inbox Order] Almacenando pedidos");
          this.setState({
            pedidos: data,
            load: false,
            page: !update ? page : 1,
          });
          //Quitando update
          handleChangeInput("update", false);
        } else {
          console.error("[Inbox Order] Error en los datos de pedido \n", data);
          window.Swal.fire(
            "Error",
            "al almacenar los datos de pedido",
            "error"
          );
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        const debugTxt = e.toString(),
          txtObj = debugTxt.split(":");

        console.error("[Orus fetch] ", txtObj);
        if (txtObj.length > 2) {
          let txt = "Error desconocido verifique la consola";
          if (txtObj[1].toString().replace(" ", "") === "SQLSTATE[23000]")
            txt =
              "El pedido esta ligado a una nota de venta, no se puede eliminar";

          window.Swal.fire("Fallo de datos", txt, "error");
        } else if (txtObj.length === 2 && txtObj[0] !== "AbortError") {
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor: " + txtObj[1],
            "error"
          );
        }
        this.setState({
          load: false,
        });
      });
  }
}
