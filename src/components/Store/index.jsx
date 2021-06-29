import React, { Component } from "react";
import { connect } from "react-redux";
import Inbox from "../../layouts/list_inbox";
//import AddContact from "../Contacts/add";
import CardMenu from "../../layouts/card_menu";
import { storeActions } from "../../redux/store/index";
//Extra componentes
import Inventario from "./inventory";

class IndexStoreComponent extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    //let sdd = JSON.parse(localStorage.getItem("OrusContacts"));
    this.state = {
      load: false,
      item: {},
      newOrEdit: false,
      storeSelected: "",
      panel: "inbox",
      options: {
        page: 1,
        orderby: "created_at",
        order: "desc",
        search: "",
        itemsPage: 10,
      },
    };
    this.timeInterval = 0;
  }
  componentDidMount() {
    const { match } = this.props,
      { id } = match.params;

    this.setState({
      load: true,
    });

    if (id) {
      this.timeInterval = setInterval(() => {
        const { list } = this.props;
        if (list.length) {
          clearInterval(this.timeInterval);

          list.every((contact) => {
            if (contact.id === parseInt(id)) {
              this.handleEditItem(contact);
              return false;
            }
            return true;
          });
        }
      }, 1000);
    }
  }
  componentDidUpdate(props, state) {
    const { load } = this.state,
      { messages: MSGS } = this.props;

    if (state.load !== load && load === true) {
      console.log("[Orus System] Recargando productos");
      this.getContacts();
    }

    if (props.messages.length !== MSGS.length && MSGS.length) {
      MSGS.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
    }
  }

  handleSetSelectOptions = (e) => {
    const { name, value } = e.target,
      { options } = this.state;
    let val = value;

    if (name === "itemsPage") val = parseInt(value);

    console.log("[DEBUG] manejando filtros", name, value, val);
    this.setState({
      options: {
        ...options,
        [name]: val,
      },
      load: true,
    });
  };

  render() {
    const { list, loading, meta } = this.props,
      { newOrEdit, storeSelected, options, panel } = this.state;

    //console.log("[DEBUG] Render", list);

    return (
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <button
            className="btn bg-primary btn-block mb-3"
            type="button"
            disabled={newOrEdit}
            onClick={(e) => {
              e.preventDefault();
              this.props.history.push(`/almacen/registro`);
              /*
              this.setState({
                newOrEdit: true,
              });
              */
            }}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo producto
          </button>
          {!newOrEdit ? (
            <CardMenu title="Menu y filtros">
              <li className="nav-item">
                <a
                  href="#item"
                  className={"nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push(`/almacen/categorias`);
                  }}
                >
                  Categorias
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#item"
                  className={"nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push(`/almacen/marcas`);
                  }}
                >
                  Marcas
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#item"
                  className={"nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      panel: "inventory",
                    });
                  }}
                >
                  Inventario
                </a>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="orderby">Ordenar por</label>
                <select
                  className="form-control "
                  name="orderby"
                  id="orderby"
                  value={options.orderby}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="created_at">Fecha de registro</option>
                  <option value="updated_at">Fecha de modificacion</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="order">Mostrar por</label>
                <select
                  className="form-control "
                  name="order"
                  id="order"
                  value={options.order}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="asc">Antiguos</option>
                  <option value="desc">Recientes</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="itemsPage">Numero de productos</label>
                <select
                  className="form-control "
                  name="itemsPage"
                  id="itemsPage"
                  value={options.itemsPage}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="10">ver 10</option>
                  <option value="20">ver 20</option>
                  <option value="50">ver 50</option>
                  <option value="100">ver 100</option>
                </select>
              </li>
            </CardMenu>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-10">
          {panel === "inventory" ? (
            <Inventario />
          ) : (
            <Inbox
              title="Lista de productos"
              icon="id-badge"
              color="primary"
              loading={loading}
              meta={meta}
              itemSelected={storeSelected}
              handlePagination={this.handleChangePage}
              handleSearch={this.handleSearch}
              handleDeleteItem={this.handleDelete}
              handleEditItem={this.handleEditItem}
              handleSync={this.handleSync}
            >
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th></th>
                    <th>Codigo</th>
                    <th>Describción</th>
                    <th>Marca</th>
                    <th>Proveedor</th>
                    <th>Cant</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length ? (
                    <>
                      {list.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="icheck-primary pl-2">
                              <input
                                type="checkbox"
                                className="form-check-input mt-4"
                                value={item.id}
                                id={"contact_" + item.id}
                                checked={
                                  storeSelected === item.id ? true : false
                                }
                                onChange={this.handleChangeCheckbox}
                              />
                              <label
                                htmlFor={"contact_" + item.id}
                                className="sr-only"
                              ></label>
                            </td>
                            <td className="icheck-primary">
                              <div className="badge badge-primary text-uppercase">
                                {item.codigo}
                              </div>
                            </td>
                            <td
                              className="mailbox-name text-capitalize text-truncate"
                              onClick={(e) => this.handleEditTemp(item.id)}
                            >
                              <label style={{ cursor: "pointer" }}>
                                {item.producto}
                              </label>
                            </td>
                            <td className="mailbox-attachment text-uppercase text-truncate text-muted">
                              <span>
                                {item.marca ? item.marca.marca : "--"}
                              </span>
                            </td>
                            <td className="mailbox-attachment text-capitalize text-truncate text-muted">
                              <span>
                                {item.proveedor ? item.proveedor.nombre : "--"}
                              </span>
                            </td>
                            <td className="mailbox-date text-muted text-truncate text-right">
                              <span>{item.cantidades}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <th className="text-center text-muted" colSpan="6">
                        No hay productos registrados
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </Inbox>
          )}
        </div>
      </div>
    );
  }

  handleSaveContact = (id, data) => {
    const { _saveContact } = this.props,
      { options } = this.state;

    _saveContact({
      data,
      id,
      options,
    });
    this.handleCloseEdit();
  };
  handleCloseEdit = () => {
    this.props.history.push(`/almacen`);
    this.setState({
      newOrEdit: false,
      contact: {},
      contactSelected: "",
    });
  };
  handleSync = () => {
    this.getContacts();
  };
  handleEditTemp = (id) => {
    this.props.history.push(`/almacen/registro/${id}`);
  };
  handleEditItem = (item) => {
    const { storeSelected } = this.state,
      { list } = this.props,
      id = item ?? storeSelected,
      store = list.filter((e) => e.id === id);

    if (store.length) {
      console.log("[Orus System] Editar producto", id);
      this.setState({
        item: store[0],
        newOrEdit: true,
        storeSelected: id,
      });
      this.props.history.push(`/almacen/registro/${id}`);
    } else {
      this.setState({
        newOrEdit: false,
        item: {},
        storeSelected: "",
        load: true,
      });
      this.props.history.push(`/almacen`);
    }
  };
  handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      this.setState({
        storeSelected: parseInt(value),
      });
    } else {
      this.setState({
        storeSelected: "",
      });
    }
  };
  handleSearch = (search) => {
    const { options } = this.state;
    console.log("[DEBUG] handle search", search);
    this.setState({
      options: {
        ...options,
        search,
      },
      load: true,
    });
  };
  handleChangePage = (page) => {
    const { options } = this.state;

    this.setState({
      options: {
        ...options,
        page,
      },
      load: true,
    });
  };
  handleDelete = () => {
    const { storeSelected, options } = this.state,
      { _deleteContact } = this.props;

    //console.log("[DEBUG] handele delete", storeSelected);

    if (!storeSelected) {
      window.Swal.fire({
        title: "Verificacion",
        text: "Debe de selecionar al menos un producto para eliminar",
        icon: "warning",
      });
      return false;
    }

    //Confirmación de eliminacion
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el producto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (dismiss !== "cancel") {
        console.log(
          "[Orus System] Enviando datos para eliminar",
          storeSelected
        );
        _deleteContact({
          id: storeSelected,
          options,
        });
      }
      this.setState({
        storeSelected: "",
      });
    });
  };
  getContacts() {
    const { _getListContact } = this.props,
      { options } = this.state;

    _getListContact({
      options,
    });

    this.setState({
      load: false,
    });
  }
}

const mapStateToProps = ({ storeItem }) => {
    return {
      list: storeItem.list,
      messages: storeItem.messages,
      meta: storeItem.metaList,
      loading: storeItem.loading,
    };
  },
  mapActionsToProps = {
    _getListContact: storeActions.getListStore,
  };

export default connect(mapStateToProps, mapActionsToProps)(IndexStoreComponent);
