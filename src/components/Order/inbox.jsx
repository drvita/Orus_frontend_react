import React, { Component } from "react";
import Pagination from "../Layouts/pagination";
import InboxList from "./inbox_list";

class inboxOrderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };

    this.timeSearch = null;
  }

  componentDidMount() {
    const { searchText: search } = this.props;

    if (search) {
      this.setState({
        search,
      });
    }
  }

  componentDidUpdate(props, state) {
    const { search } = this.state;

    if (state.search !== search && search.length > 3) {
      if (this.timeSearch) clearTimeout(this.timeSearch);
      this.timeSearch = setTimeout(() => {
        this.handleSearchOrder();
      }, 1000);
    }
  }

  render() {
    const {
        editId,
        orders: pedidos = [],
        meta = {},
        loading: LOADING,
        handlePageOrder: _handlePageOrder,
        handleDeleteOrder: _handleDeleteOrder,
        handleSelectOrder: _handleSelectOrder,
      } = this.props,
      { search } = this.state;

    return (
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="mr-1 fas fa-clipboard-list"></i>
            Listado de pedidos
          </h3>
          <div className="card-tools">
            <div className="input-group input-group-sm position-relative">
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
              <div
                className="position-absolute"
                style={{ top: 5, left: -20, color: "#ced4da" }}
              >
                <i className="fas fa-search"></i>
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
            <div className="float-right">
              <Pagination meta={meta} handleChangePage={_handlePageOrder} />
            </div>
          </div>
          <InboxList
            pedidos={pedidos}
            editId={editId}
            handleDeleteOrder={_handleDeleteOrder}
            handleSelectOrder={_handleSelectOrder}
          />
        </div>
        {LOADING ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
      </div>
    );
  }

  handleSearchErase = () => {
    //Elimina el contenido del campo de busqueda
    const { handleSearchOrdes: _handleSearchOrdes } = this.props;

    _handleSearchOrdes("");

    this.setState({
      search: "",
    });
  };
  handleSearchOrder = () => {
    //Ejecuta la orden de busqueda
    const { handleSearchOrdes: _handleSearchOrdes } = this.props,
      { search } = this.state;

    if (this.timeSearch) clearTimeout(this.timeSearch);
    _handleSearchOrdes(search);
    //_getListOrder(OPT);
  };
  handleChangeSearchInput = (e) => {
    //Maneja el cambio de contenido en el campo de busqueda
    const { value } = e.target;

    this.setState({
      search: value,
    });
  };
}

export default inboxOrderComponent;
