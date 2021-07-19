import React, { Component } from "react";
import { connect } from "react-redux";
//Compinentes
import Inbox from "./views/Inbox";
import Inventario from "./inventory";
import CardMenu from "../../layouts/card_menu";
import NewOrEdit from "./add";
//Actions
import { storeActions } from "../../redux/store/index";
import { contactActions } from "../../redux/contact/";

class IndexStoreComponent extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    //let sdd = JSON.parse(localStorage.getItem("OrusContacts"));
    this.state = {
      load: false,
      panel: "inbox",
    };
  }
  componentDidMount() {
    const { match } = this.props,
      { id } = match.params;

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

    this.getSuppliers();
  }
  componentDidUpdate(props) {
    const { messages: MSGS, item, history } = this.props;

    if (props.item.id !== item.id && item.id) {
      this.setState({
        panel: "neworedit",
      });
      history.push(`/almacen/${item.id}`);
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

  render() {
    const { options, suppliers, item } = this.props,
      { panel } = this.state;

    //console.log("[DEBUG] Render", list);

    return (
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <button
            className="btn bg-primary btn-block mb-3"
            type="button"
            disabled={panel !== "inbox"}
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                panel: "neworedit",
              });
              this.props.history.push(`/almacen/new`);
            }}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo producto
          </button>
          {panel === "inbox" && (
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
                    this.props.history.push(`/almacen/inventario`);
                  }}
                >
                  Inventario
                </a>
              </li>
              <li className="nav-item p-2">
                <label htmlFor="supplier">Proveedor</label>
                <select
                  className="form-control "
                  name="supplier"
                  id="supplier"
                  value={options.supplier}
                  onChange={this.handleSetSelectOptions}
                >
                  <option value="">-- Todos --</option>
                  {suppliers.map((supplier) => {
                    return (
                      <option value={supplier.id} key={supplier.id}>
                        {supplier.nombre}
                      </option>
                    );
                  })}
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
          )}
        </div>
        <div className="col-sm-12 col-md-10">
          {panel === "inventory" && <Inventario />}
          {panel === "inbox" && <Inbox />}
          {panel === "neworedit" && <NewOrEdit item={item} />}
        </div>
      </div>
    );
  }

  handleSetSelectOptions = ({ target }) => {
    const { name, value } = target,
      { _setOptions } = this.props;
    let val = value;

    if (name === "itemsPage") val = parseInt(value);

    //console.log("[DEBUG] manejando filtros", name, value, val);
    _setOptions({
      key: name,
      value: val,
    });
  };
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
  getSuppliers() {
    const { _getContacts } = this.props;

    _getContacts({
      type: 1,
      business: 0,
    });
  }
}

const mapStateToProps = ({ storeItem, contact }) => {
    return {
      list: storeItem.list,
      item: storeItem.item,
      messages: storeItem.messages,
      meta: storeItem.metaList,
      loading: storeItem.loading,
      options: storeItem.options,
      suppliers: contact.list,
    };
  },
  mapActionsToProps = {
    _getList: storeActions.getListStore,
    _setOptions: storeActions.setOptions,
    _getContacts: contactActions.getListContacts,
  };

export default connect(mapStateToProps, mapActionsToProps)(IndexStoreComponent);
