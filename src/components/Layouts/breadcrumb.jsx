import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { configActions } from "../../redux/config";
import Modal from "../../layouts/modal";

class BreadcrumbComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("LLLL"),
      showChangeBranchs: false,
      currentBranch: null,
    };
    this.timerNotify = null;
  }
  componentDidMount() {
    this.timerNotify = setInterval(() => {
      console.log("[Orus System] Actualizando hora de sistema");
      this.setState({
        date: moment().format("LLLL"),
      });
    }, 60000);
    this.getBranchs();
  }
  componentWillUnmount() {
    if (this.timerNotify) clearInterval(this.timerNotify);
  }

  render() {
    const { title: TITLE, host: HOST, currentUser, config } = this.props,
      { name: USER_NAME, branch = {}, rol } = currentUser,
      { date, showChangeBranchs } = this.state,
      branchs = [];

    if (config && config.length) {
      config.forEach((co) => {
        branchs.push({
          id: co.id,
          ...co.values,
        });
      });
    }

    //console.log("[DEBUG] State", showChangeBranchs);

    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="m-0 text-dark text-capitalize">
                <i className="mr-1 fas fa-file"></i> {TITLE}
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
                {!rol ? (
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
                  body={this.getHtmlBody(branchs, branch.id)}
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
      { _getListExams } = this.props;
    _getListExams(options);
  };
  getHtmlBody = (branchs, currentBranch) => {
    const { currentBranch: branchState } = this.state;

    return (
      <div className="form-group">
        <label>Seleccione la sucursal</label>
        <select
          className="form-control text-capitalize"
          onChange={this.handleChangeSelectBranchs}
          value={branchState ? branchState : currentBranch}
        >
          {branchs.map((branch) => (
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

    this.setState({
      currentBranch: value,
    });

    console.log("[DEBUG] Cambio de branch", value);
  };
  handleClickChangeBranch = () => {
    console.log("[DEBUG] Guardar");
  };
}

const mapStateToProps = ({ default: system, users, config }) => {
    return {
      company: system.company,
      host: system.host,
      currentUser: users.dataLoggin,
      config: config.list,
    };
  },
  mapActionsToProps = {
    _getListExams: configActions.getListConfig,
  };
export default connect(mapStateToProps, mapActionsToProps)(BreadcrumbComponent);
