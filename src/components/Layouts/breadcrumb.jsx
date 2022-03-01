import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { configActions } from "../../redux/config";
import { userActions } from "../../redux/user";

import Modal from "../../layouts/modal";

class BreadcrumbComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("LLLL"),
      showChangeBranchs: false,
      currentBranch: null,
      idUser: null,
      selectBranch: null,
    };
    this.timerNotify = null;
  }

  componentDidMount() {
    const { currentUser } = this.props,
      { branch: currentBranch = {}, idUser } = currentUser;

    this.timerNotify = setInterval(() => {
      console.log("[Orus System] Actualizando hora de sistema");
      this.setState({
        date: moment().format("LLLL"),
      });
    }, 60000);

    this.setState({
      date: moment().format("LLLL"),
      idUser,
      currentBranch,
    });
    this.getBranchs();
  }
  
  componentWillUnmount() {
    if (this.timerNotify) clearInterval(this.timerNotify);
  }

  render() {
    const { namePage, host: HOST, currentUser, config } = this.props,
      { name: USER_NAME, branch = {}, permissions } = currentUser,
      { date, showChangeBranchs } = this.state,
      branches = [];

    if (config && config.length) {
      config.forEach((co) => {
        branches.push({
          id: co.id,
          ...co.values,
        });
      });
    }

    // console.log("[DEBUG] includes", permissions.includes("auth.changeBranch"));

    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="m-0 text-dark text-capitalize">
                <i className="mr-1 fas fa-file"></i> {namePage}
              </h1>
            </div>
            <div className="text-center col">
              <small
                className="p-2 badge badge-secondary text-capitalize"
                alt="conectado a"
                title="conectado a"
              >
                <i className="mr-1 fas fa-wifi text-success"></i>
                {HOST}
              </small>
              <small
                className="p-2 mt-1 ml-1 badge badge-secondary text-capitalize"
                alt="Almacenando en"
                title="Almacenando en"
              >
                <i className="mr-1 fas fa-server text-success"></i>
                {permissions.includes("auth.changeBranch") ? (
                  <a
                    href="#link"
                    className="text-white"
                    onClick={this.handleChangeBranch}
                  >
                    {branch.name}
                  </a>
                ) : (
                  branch.name
                )}
              </small>
              <small
                className="p-2 mt-1 ml-2 badge badge-secondary text-capitalize"
                alt="Usuario conectado"
                title="Usuario conectado"
              >
                <i className="mr-1 fas fa-user text-info"></i> {USER_NAME}
              </small>
              {showChangeBranchs ? (
                <Modal
                  title="Cambiar de sucursal"
                  body={this.getHtmlBody(branches, branch.id)}
                  handleCancel={this.handleCancelModal}
                />
              ) : null}
            </div>
            <div className="col">
              <h6 className="text-right text-muted">
                <i className="mr-1 fas fa-calendar"></i> {date}
              </h6>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  handleCancelModal = () => this.setState({ showChangeBranchs: false });
  handleChangeBranch = (e) => {
    e.preventDefault();

    this.setState({
      showChangeBranchs: true,
    });
  };
  getBranchs = () => {
    const options = {
        page: 1,
        name: "branches",
        itemsPage: 10,
      },
      { _getListBranches } = this.props;
    _getListBranches(options);
  };
  getHtmlBody = (branches, currentBranch) => {
    const { selectBranch: branchState } = this.state;

    return (
      <div className="form-group">
        <label>Seleccione la sucursal</label>
        <select
          className="form-control text-capitalize"
          onChange={this.handleChangeSelectBranchs}
          value={branchState ? branchState : currentBranch}
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <div className="mt-2 text-right">
          <button
            className="btn btn-default"
            type="button"
            onClick={this.handleClickChangeBranch}
          >
            Cambiar
          </button>
        </div>
      </div>
    );
  };

  handleChangeSelectBranchs = (branch) => {
    const { value } = branch.target;
    console.log('[Sucursal Seleccionada en el select]' , value)

    this.setState({
      selectBranch: parseInt(value),
    });
  };

  handleClickChangeBranch = () => {
    const { _saveUser } = this.props,
      { selectBranch: branch_id, idUser } = this.state;
    const branch_id = selectBranch ? selectBranch : currentBranch.id;
    this.handleCancelModal();

    if (!branch_id) {
      console.error("[Orus System][ERROR] branch id is empty");
      window.location.reload();
      return;
    }

    window.Swal.fire({
      text: "El cambio de sucursal, necesita volver a cargar la pagina",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        _saveUser({
          data: {
            branch_id,
          },
          id: idUser,
          currentUser: idUser,
        });
        setTimeout(() => document.location.reload(), 1500);
        return true;
      }
    });
  };
}

const mapStateToProps = ({ default: system, users, config }) => {
    return {
      company: system.company,
      host: system.host,
      currentUser: users.dataLoggin,
      config: config.list,
      namePage: system.namePage,
    };
  },
  mapActionsToProps = {
    _getListBranches: configActions.getListConfig,
    _saveUser: userActions.saveUser,
  };
export default connect(mapStateToProps, mapActionsToProps)(BreadcrumbComponent);
