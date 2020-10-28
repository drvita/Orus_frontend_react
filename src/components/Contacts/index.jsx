import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import Header from "../Layouts/headerTable";
import Filter from "./index_filter";
import Pagination from "../Layouts/pagination";
import Actions from "../Layouts/actionsTable";

export default class Contacts extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let sdd = JSON.parse(localStorage.getItem("OrusContacts"));
    this.state = {
      contacts: {
        data: [],
        meta: {},
      },
      load: true,
      page: sdd ? sdd.page : 1,
      orderby: sdd ? sdd.orderby : "created_at",
      order: sdd ? sdd.order : "asc",
      search: sdd ? sdd.search : "",
      type: sdd ? sdd.type : "",
      business: sdd ? sdd.business : "",
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getContacts();
    moment.locale("es");
    localStorage.setItem(
      "OrusContacts",
      JSON.stringify({
        page: this.state.page,
        orderby: this.state.orderby,
        order: this.state.order,
        search: this.state.search,
        type: this.state.type,
        business: this.state.business,
      })
    );
  }
  componentDidUpdate(props, state) {
    if (state.load === false && this.state.load === true) {
      console.log("Recargando contactos");
      this.getContacts();
      localStorage.setItem(
        "OrusContacts",
        JSON.stringify({
          page: this.state.page,
          orderby: this.state.orderby,
          order: this.state.order,
          search: this.state.search,
          type: this.state.type,
          business: this.state.business,
        })
      );
    }
  }

  render() {
    let { contacts, load } = this.state,
      dataHeaders = [
        { name: "Nombre", type: "name", filter: true },
        { name: "RFC", type: "name", filter: true },
        { name: "E-mail", type: "email", filter: true },
        { name: "Tipo", type: "type", filter: true },
        { name: "Telefono" },
        { name: "Domicilio" },
        { name: "Cumpleaños" },
        { name: "Actualizado", type: "updated_at", filter: true },
        { name: "Registrado", type: "created_at", filter: true },
      ];

    return (
      <div className="card card-danger card-outline">
        <div className="card-header">
          <h2 className="card-title text-danger">
            <i className="fas fa-address-book mr-1"></i>
            Lista de contactos
          </h2>
          <div className="card-tools">
            <Filter
              search={this.state.search}
              type={this.state.type}
              business={this.state.business}
              changeFilters={this.onchangeSearch}
              handleChangePage={this.handleChangePage}
            />
            <Pagination
              meta={contacts.meta}
              handleChangePage={this.handleChangePage}
            />
          </div>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-bordered table-hover table-nowrap">
            <Header
              orderby={this.state.orderby}
              order={this.state.order}
              data={dataHeaders}
              actions={true}
              handleOrder={this.handleOrder}
            />
            <tbody>
              {load ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    <div className="spinner-border text-danger" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(contacts.data).length ? (
                contacts.data.map((contact) => {
                  return (
                    <tr key={contact.id}>
                      <td>
                        <Link to={"/contactos/registro/" + contact.id}>
                          <span className="badge badge-danger text-capitalize p-1">
                            {contact.nombre}
                            <i className="fas fa-pencil-alt ml-1"></i>
                          </span>
                        </Link>
                      </td>
                      <td className="text-uppercase">
                        {contact.rfc ? contact.rfc : "--"}
                      </td>
                      <td className="text-lowercase">
                        {contact.email ? contact.email : "--"}
                      </td>
                      <td className="text-uppercase">
                        {contact.tipo ? (
                          <span className="text-purple">Proveedor</span>
                        ) : (
                          <span className="text-green">Cliente</span>
                        )}
                      </td>
                      <td>
                        {contact.telefonos[2]
                          ? contact.telefonos[2]
                          : contact.telefonos[0]
                          ? contact.telefonos[0]
                          : "--"}
                      </td>
                      <td className="text-capitalize">
                        {contact.domicilio[0] ? contact.domicilio[0] : "--"}
                      </td>
                      <td className="text-center">
                        {contact.f_nacimiento
                          ? moment(contact.f_nacimiento).format("D/MMM")
                          : "--"}
                      </td>
                      <td className="text-capitalize">
                        {moment(contact.updated_at).fromNow()}
                      </td>
                      <td className="text-capitalize">
                        {moment(contact.created_at).format("LL")}
                      </td>
                      <Actions
                        id={contact.id}
                        item={contact.nombre}
                        delete={this.handleDelete}
                        edit={"/contactos/registro/"}
                      />
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
        <div className="card-footer text-right">
          <Link
            to="/contactos/registro"
            className="btn btn-outline-danger"
            onClick={this.changePage}
            id="/contactos/registro"
          >
            <i className="fas fa-plus" id="/contactos/registro"></i>
            &nbsp; Nuevo contacto
          </Link>
        </div>
      </div>
    );
  }

  onchangeSearch = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  handleOrder = (item) => {
    this.setState({
      orderby: item,
      order: this.state.order === "desc" ? "asc" : "desc",
      load: true,
    });
  };
  handleChangePage = (id) => {
    this.setState({
      page: id,
      load: true,
    });
  };
  changePage = (e) => {
    this.props.page(e.target.id);
  };
  handleDelete = (id, item) => {
    let conf = window.confirm(
        "¿Esta seguro de eliminar el contacto " + item.toUpperCase() + "?"
      ),
      { host, token } = this.state;
    //Confirmacion de la eliminación
    if (conf && id) {
      //Mandamos señal de eliminación
      this.setState({
        load: true,
      });
      //Inicio de proceso de eliminción por API
      console.log("Solicitud de eliminación por API");
      fetch("http://" + host + "/api/contacts/" + id, {
        method: "DELETE",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("El contacto no puede ser eliminado");
            console.error(res);
          }
          return res.json();
        })
        .then((data) => {
          if (!data.message) {
            console.log("Contacto eliminado");
            this.getContacts();
            window.alert("Contacto eliminado con exito");
          } else {
            console.error("Error al eliminar el contacto", data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          this.setState({
            load: false,
          });
        });
    }
  };
  getContacts() {
    //Variables
    let {
        host,
        token,
        order,
        orderby,
        search,
        page,
        type,
        business,
        load,
      } = this.state,
      url = "http://" + host + "/api/contacts",
      ordenar = `&orderby=${orderby}&order=${order}`,
      buscar = search ? `&search=${search}` : "",
      pagina = page > 0 ? "?page=" + page : "?page=1",
      tipo = type === "" ? "" : "&type=" + type,
      negocio = business === "" ? "" : "&business=" + business;

    //Verificamos datos

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }
    //Realiza la peticion de los contactos
    console.log("Descargando contactos de API");
    fetch(url + pagina + ordenar + buscar + tipo + negocio, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          console.error(res);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.message) {
          console.log("Almacenando contactos");
          this.setState({
            contacts: data,
            load: false,
          });
        } else {
          console.error("Error en la descarga de contactos", data.message);
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        console.error(e);
        window.alert("Ups!\n Hubo un error, intentelo mas tarde");
        this.setState({
          load: false,
        });
      });
  }
}
