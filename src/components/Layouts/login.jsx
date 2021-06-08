import React, { Component } from "react";
import { connect } from "react-redux";
import { loggin } from "../../redux/user/actions";
import { changeHost } from "../../redux/default/actions";

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
    const { errors: E_VIEJO = {}, changeHostStatus: H_STATUS_VIEJO } = props,
      { errors: E_NEW = {}, changeHostStatus: H_STATUS_NEW } = this.props;

    if (
      E_VIEJO.errors !== E_NEW.errors &&
      E_NEW.errors &&
      E_NEW.errors.toString().length
    ) {
      //Manejamos errores del handle de inicio de sesion
      //Solo quitamos el loadding
      this.setState({
        load: false,
      });
    }
    if (H_STATUS_VIEJO !== H_STATUS_NEW && H_STATUS_NEW) {
      //Manejamos el handle de cambio de host
      //Solo quitamos el loadding
      this.setState({
        load: false,
      });
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
      {
        company: COMPANY,
        errors: ERRORS,
        changeHostStatus: H_STATUS = null,
        host: H_NAME,
      } = this.props;

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
          ) : H_STATUS ? (
            <div className="alert alert-success">
              <span>
                <i className="mx-2 fas fa-info"></i> Direccion de servidor
                cambiada con exito [{H_NAME}]
              </span>
            </div>
          ) : null}

          <div className="rounded shadow-lg card">
            <div className="card-body login-card-body">
              <p className="login-box-msg text-uppercase">
                <span className="p-2 badge badge-secondary">{COMPANY}</span>
              </p>
              <form onSubmit={this.handleLogin}>
                <div
                  className={
                    E.input && E.input === "email"
                      ? "mb-0 input-group"
                      : "mb-3 input-group"
                  }
                >
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Usuario"
                    name="username"
                    autoFocus={HSHOW ? false : true}
                    onChange={this.catchInputs}
                    value={U}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                  {E.input && E.input === "email" ? (
                    <span className="text-center text-danger text-wrap font-weight-bold text-monospace">
                      <small>
                        <i className="mx-2 fas fa-info"></i>Los datos son
                        errones
                      </small>
                    </span>
                  ) : null}
                </div>
                <div
                  className={
                    E.input && E.input === "password"
                      ? "mb-0 input-group"
                      : "mb-3 input-group"
                  }
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    autoComplete="off"
                    onChange={this.catchInputs}
                    value={P}
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
                  <div className="mb-4 col-12">
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
                          onChange={this.catchInputs}
                          value={H_TXT}
                          onKeyPress={this.pressEnter}
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
                      type={LOADDING ? "button" : "submit"}
                      className={
                        LOADDING
                          ? "btn btn-outline-secondary btn-block"
                          : "btn btn-primary btn-block"
                      }
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

  pressEnter = (e) => {
    //Realiza el cambio del host
    e.preventDefault();
    if (e.key === "Enter") {
      const { txtHost } = this.state,
        { 0: PORT, 1: HOST } = txtHost.split("://"),
        { changeHost: _CHANGE_HOST } = this.props;

      this.setState({
        load: true,
      });

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
    } else if (e.target && e.target.name !== "") {
      this.catchInputs(e);
    }
  };
  catchInputs = (e) => {
    //Manejamos las entrados de los inputs: email, password
    const { name: NAME, value: VALUE } = e.target,
      { key: KEY } = e;
    let val = "";

    if (KEY) {
      if (NAME === "txtHost") val = this.state.txtHost;
      val += KEY;
    } else {
      val = VALUE;
    }

    this.setState({
      [NAME]: val,
    });
  };
  showTools = (e) => {
    //Muestra el campo para cambiar el host de conexion
    //Lo realiza a traves del estado local con la variable
    //hostShow
    e.preventDefault();
    this.setState({
      hostShow: !this.state.hostShow,
    });
  };
  validInputs(body) {
    //Valida los campos del formulario para
    //email y password con expresiones regulares
    //Usuario: un email valido
    //Password: de 8 a l6 caracteres, debe de contener mayuscula,
    //un numero y al menos un caracter: !@#$&.*
    const REGEXUSER =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      REGEXPASS = /^(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z]).{8,16}$/,
      { email: U, password: P } = body;

    if (REGEXUSER.test(U)) {
      if (REGEXPASS.test(P)) {
        return {
          isValid: true,
        };
      } else {
        console.error("[Orus System] Fallo validacion de password");
        return {
          isValid: false,
          msg: "Los datos introducidos no son validos",
          input: "password",
        };
      }
    } else {
      console.error("[Orus System] Fallo validacion de email");
      return {
        isValid: false,
        msg: "Los datos introducidos no son validos",
        input: "email",
      };
    }
  }
  handleLogin = (e) => {
    //Conecta con el redux para hacer la validacion de
    //credenciales a traves de una API.
    //Aqui solo validamos datos y manejamos los fallos
    //A traves de estado local
    e.preventDefault();
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

    const DATA_VALID = this.validInputs(BODY);

    if (DATA_VALID.isValid) {
      console.log("[Orus System] enviando credenciales a _LOGGINGPROCESS");
      _LOGGINGPROCESS(BODY);
    } else {
      this.setState({
        load: false,
        error: DATA_VALID,
      });
    }
  };
}

const mapStateToProps = (state) => {
    return {
      company: state.default.company,
      host: state.default.host,
      errors: state.logging.errors,
      changeHostStatus: state.default.success,
    };
  },
  mapDispatchToProps = {
    loggin,
    changeHost,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LogginComponent);
