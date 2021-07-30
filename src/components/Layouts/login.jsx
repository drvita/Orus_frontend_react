import React, { Component } from "react";
import { connect } from "react-redux";
//Actions
import { changeHost } from "../../redux/default/actions";
import { userActions } from "../../redux/user/";
import helper from "../Users/helpers";

class LogginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      txtHost: "",
      error: {},
      hostShow: false,
      load: false,
    };
  }

  componentDidMount() {
    const { host: HOST } = this.props;
    if (HOST) {
      this.setState({
        txtHost: HOST,
      });
    }
  }

  componentDidUpdate(props, state) {
    const { changeHostStatus: H_STATUS_VIEJO } = props,
      { loading, changeHostStatus: H_STATUS_NEW } = this.props;

    if (props.loading !== loading) {
      this.setState({
        load: loading,
      });
    }

    if (H_STATUS_VIEJO !== H_STATUS_NEW && H_STATUS_NEW) {
      //Manejamos el handle de cambio de host
      //Solo quitamos el loadding
      this.setState({
        load: false,
      });
      window.sendPushMessage("Orus system", "Cambio de host exitoso");
    }
  }

  render() {
    const {
        load: LOADDING,
        username: U,
        password: P,
        txtHost: H_TXT,
        hostShow: HSHOW,
        error: E,
      } = this.state,
      { company: COMPANY, errors: ERRORS } = this.props;

    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#logo" onClick={(e) => e.preventDefault()}>
              <b className="text-primary">Orus</b> LTE
            </a>
          </div>

          {ERRORS && ERRORS.errors && !LOADDING ? (
            <div className="alert alert-danger">
              <span>
                <i className="mx-2 fas fa-info"></i> {ERRORS.errors.toString()}
              </span>
            </div>
          ) : null}

          <div className="rounded shadow-lg card">
            <div className="card-body login-card-body">
              <p className="login-box-msg text-uppercase">
                <span className="p-2 badge badge-secondary">{COMPANY}</span>
              </p>
              <form autoComplete="off">
                <div className="mb-0 input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Usuario"
                    name="username"
                    autoFocus={HSHOW ? false : true}
                    onChange={({ target }) => this.catchInputs(target)}
                    value={U}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
                {E.input && E.input === "email" ? (
                  <span className="text-center text-danger text-wrap font-weight-bold text-monospace">
                    <small>
                      <i className="mx-2 fas fa-info"></i>Los datos son errones
                    </small>
                  </span>
                ) : null}
                <div className="mt-3 input-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    onChange={({ target }) => this.catchInputs(target)}
                    value={P}
                    onKeyPress={({ key }) => this.handleKeyEnter(key)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                {E.input && E.input === "password" ? (
                  <span className="mb-3 text-center text-danger text-wrap font-weight-bold text-monospace">
                    <small>
                      <i className="mx-2 fas fa-info"></i>Los datos son errones
                    </small>
                  </span>
                ) : null}
                <div className="row">
                  <div className="my-3 col-12">
                    <a
                      href="#tools"
                      onClick={this.showTools}
                      className="text-muted"
                    >
                      <i className="mx-1 fas fa-wifi"></i> Servidor
                    </a>
                    {HSHOW ? (
                      <div className="mb-3 input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Servidor"
                          name="txtHost"
                          autoComplete="off"
                          autoFocus={HSHOW ? true : false}
                          onChange={({ target }) => this.catchInputs(target)}
                          value={H_TXT}
                          onKeyPress={({ key }) => this.pressEnter(key)}
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-server"></span>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row">
                  <div className="text-center col-12">
                    <button
                      type="button"
                      className={
                        LOADDING
                          ? "btn btn-outline-secondary btn-block"
                          : "btn btn-primary btn-block"
                      }
                      onClick={this.handleLogin}
                    >
                      {LOADDING ? (
                        <div className="spinner-border text-secondary">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Iniciar session"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleKeyEnter = (key) => {
    if (key === "Enter") {
      this.handleLogin();
    }
  };
  pressEnter = (key) => {
    if (key === "Enter") {
      const { txtHost } = this.state,
        { 0: PORT, 1: HOST } = txtHost.split("://"),
        { changeHost: _CHANGE_HOST } = this.props;

      if (PORT && HOST) {
        _CHANGE_HOST({
          host: HOST,
          port: PORT,
        });
      } else if (PORT && !HOST) {
        _CHANGE_HOST({
          host: PORT,
          port: undefined,
        });
      }
    }
  };
  catchInputs = ({ name, value }) => {
    this.setState({
      [name]: value,
    });
  };
  showTools = (e) => {
    e.preventDefault();
    this.setState({
      hostShow: !this.state.hostShow,
    });
  };
  handleLogin = () => {
    console.log("[Orus System] Validando integracion de credenciales");
    const { username: U, password: P, load: LOADING } = this.state,
      { loggin: _LOGGINGPROCESS } = this.props,
      BODY = {
        email: U.toString().replace(/\s/g, "").trim().toLocaleLowerCase(),
        password: P.toString().trim(),
      };

    if (!LOADING) {
      this.setState({
        load: true,
        error: {},
      });
    }

    const DATA_VALID = helper.validInputs(BODY);

    if (DATA_VALID.isValid) {
      console.log("[Orus System] enviando credenciales al servidor");
      _LOGGINGPROCESS(BODY);
    } else {
      this.setState({
        load: false,
        error: DATA_VALID,
      });
    }
  };
}

const mapStateToProps = ({ default: system, users }) => {
    return {
      company: system.company,
      host: system.host,
      messages: users.messages,
      loading: users.loading,
      changeHostStatus: system.success,
    };
  },
  mapDispatchToProps = {
    loggin: userActions.loggin,
    setMessage: userActions.setMessages,
    changeHost,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LogginComponent);
