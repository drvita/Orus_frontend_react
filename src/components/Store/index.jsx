import React, { Component } from "react";
import { connect } from "react-redux";
//Compinentes
import Inbox from "./views/Inbox";
import Inventario from "./inventory";
import NewOrEdit from "./add";
import Filter from "./views/Filtros";
//Actions
import { storeActions } from "../../redux/store/index";

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
    const { match, history, _getItem, _setItem } = this.props,
      { id } = match.params;

    if (id) {
      if (Number.isInteger(id)) {
        _getItem(id);
      } else if (id === "new") {
        this.setState({
          panel: "neworedit",
        });
        _setItem({});
      } else {
        history.push(`/almacen`);
      }
    }
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
    const { item } = this.props,
      { panel } = this.state;

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
          {panel === "inbox" && <Filter />}
        </div>
        <div className="col-sm-12 col-md-10">
          {panel === "inventory" && (
            <Inventario handleClose={this.handleChangePanel} />
          )}
          {panel === "inbox" && <Inbox />}
          {panel === "neworedit" && (
            <NewOrEdit handleClose={this.handleChangePanel} />
          )}
        </div>
      </div>
    );
  }

  handleChangePanel = (panel) => {
    this.setState({
      panel,
    });
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
      list: storeItem.list,
      item: storeItem.item,
      messages: storeItem.messages,
      loading: storeItem.loading,
    };
  },
  mapActionsToProps = {
    _getItem: storeActions.getItem,
    _setItem: storeActions.setItem,
  };

export default connect(mapStateToProps, mapActionsToProps)(IndexStoreComponent);
