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
      list: {},
      newOrEdit: false,
      contactSelected: "",
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
      console.log("[Orus System] Recargando contactos");
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
      { newOrEdit, contactSelected, options, panel } = this.state;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-3">
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
            Nuevo contacto
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
                <select
                  className="form-control "
                  name="orderby"
                  value={options.orderby}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="">-- Seleccione orden --</option>
                  <option value="created_at">Fecha de registro</option>
                  <option value="updated_at">Fecha de modificacion</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <select
                  className="form-control "
                  name="order"
                  value={options.order}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="asc">Ultimos</option>
                  <option value="desc">Primeros</option>
                </select>
              </li>
              <li className="nav-item p-2">
                <select
                  className="form-control "
                  name="itemsPage"
                  value={options.itemsPage}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="10">-- ver 10 --</option>
                  <option value="20">-- ver 20 --</option>
                  <option value="50">-- ver 50 --</option>
                  <option value="100">-- ver 100 --</option>
                </select>
              </li>
            </CardMenu>
          ) : null}
        </div>
        <div className="col-sm-12 col-md-9">
          {panel === "inventory" ? (
            <Inventario />
          ) : (
            <Inbox
              title="Lista de contactos"
              icon="id-badge"
              color="primary"
              loading={loading}
              meta={meta}
              itemSelected={contactSelected}
              handlePagination={this.handleChangePage}
              handleSearch={this.handleSearch}
              handleDeleteItem={this.handleDelete}
              handleEditItem={this.handleEditItem}
              handleSync={this.handleSync}
            >
              <table className="table table-hover table-striped">
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
                                  contactSelected === item.id ? true : false
                                }
                                onChange={this.handleChangeCheckbox}
                              />
                              <label
                                htmlFor={"contact_" + item.id}
                                className="sr-only"
                              ></label>
                            </td>
                            <td className="icheck-primary">
                              <div className="badge badge-primary">
                                # {item.codigo}
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
                            <td className="mailbox-attachment text-lowercase text-truncate">
                              <span>{item.marca.marca}</span>
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
                      <th className="text-center text-muted">
                        No hay contactos registrados
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
  handleEditItem = (contact) => {
    const { contactSelected } = this.state,
      { contacts } = this.props;
    let contactToSave = {};

    if (contactSelected) {
      contacts.every((contact) => {
        if (contact.id === contactSelected) {
          contactToSave = contact;
          return false;
        }

        return true;
      });
    } else if (contact.id) {
      contactToSave = contact;
    }
    if (contactToSave.id) {
      this.props.history.push(`/almacen/${contactToSave.id}`);
      this.setState({
        contact: contactToSave,
        contactSelected: contactToSave.id,
        newOrEdit: true,
      });
    } else {
      this.props.history.push(`/almacen`);
      this.setState({
        contact: {},
        contactSelected: "",
        newOrEdit: false,
      });
    }
  };
  handleChangeCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      this.setState({
        contactSelected: parseInt(value),
      });
    } else {
      this.setState({
        contactSelected: "",
      });
    }
  };
  handleSearch = (search) => {
    const { options } = this.state;

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
    const { contactSelected, options } = this.state,
      { _deleteContact } = this.props;

    console.log("[DEBUG] handele delete", contactSelected);

    if (!contactSelected) {
      window.Swal.fire({
        title: "Verificacion",
        text: "Debe de selecionar al menos un contacto para eliminar",
        icon: "warning",
      });
      return false;
    }

    //Confirmación de eliminacion
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el contacto?",
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
          contactSelected
        );
        _deleteContact({
          id: contactSelected,
          options,
        });
      }
      this.setState({
        contactSelected: "",
      });
    });
  };
  getContacts() {
    const { _getListContact } = this.props,
      { options } = this.state;

    _getListContact({
      ...options,
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
