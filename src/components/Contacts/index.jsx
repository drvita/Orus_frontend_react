import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Inbox from "../../layouts/list_inbox";
import AddContact from "./add";
import CardMenu from "../../layouts/card_menu";
import { contactActions } from "../../redux/contact/.";

class IndexContactComponent extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    //let sdd = JSON.parse(localStorage.getItem("OrusContacts"));
    this.state = {
      load: false,
      contact: {},
      newOrEdit: false,
      contactSelected: "",
      options: {
        page: 1,
        orderby: "created_at",
        order: "desc",
        search: "",
        type: "",
        itemsPage: 10,
      },
    };
    this.timeInterval = 0;
  }
  componentDidMount() {
    const { match, _getContact } = this.props,
      { id } = match.params;

    if (id) {
      if (id === "new") {
        this.setState({
          newOrEdit: true,
        });
      }
      if (parseInt(id)) _getContact(id);
    } else {
      this.setState({
        load: true,
      });
    }
  }
  componentDidUpdate(props, state) {
    const { load } = this.state,
      { messages: MSGS, contact, _setMessage } = this.props;

    if (state.load !== load && load) {
      console.log("[Orus System] Recargando contactos");
      this.getContacts();
    }

    if (props.contact.id !== contact.id && contact.id) {
      console.log("[Orus System] Cargando nuevo contacto", contact.id);
      this.setState({
        contact,
        newOrEdit: true,
      });
      this.props.history.push(`/contactos/${contact.id}`);
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
      _setMessage();
    }
  }

  render() {
    const { contacts, loading, meta } = this.props,
      { contact, newOrEdit, contactSelected, options } = this.state;
    //domain = /^.{1,100}@domain(.com)?$/gim;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <button
            className="btn bg-indigo btn-block mb-3"
            type="button"
            disabled={newOrEdit}
            onClick={this.openNew}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo contacto
          </button>
          <CardMenu title={newOrEdit ? "Menu" : "Filtros"}>
            {!newOrEdit ? (
              <>
                <li className="nav-item p-2">
                  <label htmlFor="type">Tipo</label>
                  <select
                    className="form-control "
                    name="type"
                    id="type"
                    value={options.type}
                    onChange={this.handleSetSelectOptions}
                  >
                    <option value="">-- Todos --</option>
                    <option value="0">Clientes</option>
                    <option value="1">Proveedores</option>
                  </select>
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
                  <label htmlFor="itemsPage">Numero de contactos</label>
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
              </>
            ) : (
              <>
                <li className="list-group-item">
                  <a
                    href="#back"
                    className="d-flex justify-content-between align-items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleCloseEdit();
                    }}
                  >
                    Ver listado
                    <span className="badge badge-primary badge-pill">
                      <i className="fas fa-chevron-left"></i>
                    </span>
                  </a>
                </li>
                {contact.id ? (
                  <li className="list-group-item">
                    <a
                      href="#details"
                      className="d-flex justify-content-between align-items-center"
                    >
                      Detalles
                      <span className="badge badge-primary badge-pill">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </a>
                  </li>
                ) : null}
              </>
            )}
          </CardMenu>
        </div>
        <div className="col-sm-12 col-md-10">
          {newOrEdit ? (
            <AddContact handleClose={this.handleCloseEdit} />
          ) : (
            <Inbox
              title="Lista de contactos"
              icon="id-badge"
              color="indigo"
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
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>E-mail</th>
                    <th>Telefono</th>
                    <th>Creado por</th>
                    <th>
                      {options.orderby === "created_at"
                        ? "Registrado"
                        : "Actualizado"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length ? (
                    <>
                      {contacts.map((contact) => {
                        return (
                          <tr key={contact.id}>
                            <td className="icheck-primary pl-2">
                              <input
                                type="checkbox"
                                className="form-check-input mt-4"
                                value={contact.id}
                                id={"contact_" + contact.id}
                                //disabled={contact.enUso}
                                checked={
                                  contactSelected === contact.id ? true : false
                                }
                                onChange={this.handleChangeCheckbox}
                              />
                              <label
                                htmlFor={"contact_" + contact.id}
                                className="sr-only"
                              ></label>
                            </td>
                            <td
                              className="mailbox-name text-capitalize text-truncate"
                              style={{ cursor: "pointer", maxWidth: 180 }}
                              onClick={(e) => this.handleEditItem(contact.id)}
                            >
                              <label
                                style={{ cursor: "pointer" }}
                                className={contact.enUso ? "text-indigo" : ""}
                              >
                                {contact.tipo ? (
                                  <i className="fas fa-store text-sm mr-2"></i>
                                ) : (
                                  <i className="fas fa-user text-sm mr-2"></i>
                                )}
                                {contact.nombre}
                              </label>
                            </td>
                            <th>{contact.edad ? contact.edad : "--"}</th>
                            <td
                              className="mailbox-attachment text-lowercase text-truncate"
                              style={{ maxWidth: 180 }}
                            >
                              <span>
                                <i className="fas fa-envelope text-sm mr-2"></i>
                                <a
                                  href={"mailto:" + contact.email}
                                  className="text-muted"
                                >
                                  {contact.email}
                                </a>
                              </span>
                            </td>
                            <td className="mailbox-date text-muted text-truncate text-right">
                              <span>
                                <i className="fas fa-phone text-sm mr-2"></i>
                                {contact.telefonos.t_movil
                                  ? contact.telefonos.t_movil
                                  : contact.telefonos.t_casa
                                  ? contact.telefonos.t_casa
                                  : contact.telefonos.t_oficina
                                  ? contact.telefonos.t_oficina
                                  : "--"}
                              </span>
                            </td>
                            <td>{contact.created.name}</td>
                            <td>
                              {moment(
                                options.orderby === "created_at"
                                  ? contact.created_at
                                  : contact.updated_at
                              ).fromNow()}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <th className="text-center text-muted" colSpan="7">
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

  openNew = () => {
    const { _setContact } = this.props;

    _setContact();
    this.setState({
      newOrEdit: true,
    });
  };
  handleSync = () => {
    this.getContacts();
  };
  handleCloseEdit = () => {
    this.setState({
      contact: {},
      contactSelected: "",
      newOrEdit: false,
      load: true,
    });
    this.props.history.push(`/contactos`);
  };
  handleEditItem = (item = null) => {
    const { contactSelected } = this.state,
      { _getContact } = this.props,
      id = item ?? contactSelected;

    if (id) {
      _getContact(id);
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
  handleSetSelectOptions = (e) => {
    const { name, value } = e.target,
      { options } = this.state;
    let val = value;

    if (name === "itemsPage") val = parseInt(value);

    this.setState({
      options: {
        ...options,
        page: 1,
        [name]: val,
      },
      load: true,
    });
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
        load: true,
      });
    });
  };
  getContacts() {
    const { loading, _getListContacts } = this.props,
      { options } = this.state;

    if (!loading) {
      _getListContacts({
        ...options,
      });
    }

    this.setState({
      load: false,
    });
  }
}

const mapStateToProps = ({ contact }) => {
    return {
      contacts: contact.list,
      messages: contact.messages,
      meta: contact.metaList,
      loading: contact.loading,
      contact: contact.contact,
    };
  },
  mapActionsToProps = {
    _getListContacts: contactActions.getListContacts,
    _deleteContact: contactActions.deleteContact,
    _saveContact: contactActions.saveContact,
    _getContact: contactActions.getContact,
    _setMessage: contactActions.setMessageContact,
    _setContact: contactActions.setContact,
    //_setList: contactActions.setListContact,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(IndexContactComponent);
