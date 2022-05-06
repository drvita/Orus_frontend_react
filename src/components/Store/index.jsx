import React, { Component } from "react";
import { connect } from "react-redux";
//Compinentes
import Inbox from "./views/Inbox";
import Filter from "./views/Filters";
import NewOrEdit from "./Add";
import Inventario from "./inventory";
import Categories from "./categories";
import Brands from "./brands";

//Actions
import { storeActions } from "../../redux/store/index";
import { defaultActions } from "../../redux/default/";

class IndexStoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: "inbox",
      //panel:'inventory'
    };
  }
  componentDidMount() {
    const { match, history, _getItem, _setItem, _setPageName } = this.props,
      { id } = match.params;

    if (parseInt(id)) {
      _getItem(parseInt(id));
    } else if (id === "new") {
      this.setState({
        panel: "neworedit",
      });
      history.push(`/almacen/new`);
      _setItem({});
    }

    _setPageName("almacen");

    //console.log("Productos del almacen----INDEX------");
  }
  componentDidUpdate(props) {
    const { messages: MSGS, item, history, _setMessage, _setList } = this.props;

    if (props.item.id !== item.id && item.id) {
      this.setState({
        panel: "neworedit",
      });
      history.push(`/almacen/${item.id}`);
      _setList({
        result: {
          list: [],
          metaList: {},
        },
      });
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
      _setMessage([]);
    }
  }
  componentWillUnmount() {
    const { _setList } = this.props;
    _setList({
      result: {
        list: [],
        metaList: {},
        item: {},
        brands: [],
      },
    });
  }

  render() {
    const { panel } = this.state;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <button
            className="btn bg-primary btn-block mb-3"
            type="button"
            disabled={panel !== "inbox"}
            onClick={this.handleNewItem}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo producto
          </button>
          <Filter panel={panel} handleChangePage={this.handleChangePanel} />
        </div>
        <div className="col-sm-12 col-md-10">
          {panel === "inventory" && (
            <Inventario handleClose={this.handleChangePanel} />
          )}
          {panel === "inbox" && <Inbox />}
          {panel === "neworedit" && (
            <NewOrEdit handleClose={this.handleChangePanel} />
          )}
          {panel === "category" && <Categories />}
          {panel === "brands" && <Brands />}
        </div>
      </div>
    );
  }

  handleChangePanel = (panel) => {
    const { _setItem, history } = this.props;

    if (this.state.panel !== panel) {
      _setItem({});
      this.setState({
        panel,
      });
      if (panel === "inbox") history.push(`/almacen`);
      if (panel === "inventory") history.push(`/almacen/inventario`);
      if (panel === "category") history.push(`/almacen/categorias`);
      if (panel === "brands") history.push(`/almacen/marcas`);
    }
  };
  handleNewItem = () => {
    this.setState({
      panel: "neworedit",
    });
    this.props.history.push(`/almacen/new`);
  };
}

const mapStateToProps = ({ storeItem }) => {
    return {
      item: storeItem.item,
      messages: storeItem.messages,
      loading: storeItem.loading,
    };
  },
  mapActionsToProps = {
    _getItem: storeActions.getItem,
    _setItem: storeActions.setItem,
    _setMessage: storeActions.setMessagesStore,
    _setList: storeActions.setListStore,
    _setPageName: defaultActions.changeNamePage,
  };

export default connect(mapStateToProps, mapActionsToProps)(IndexStoreComponent);
