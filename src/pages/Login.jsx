/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const LS = localStorage.getItem("OrusSystem");
  const storage = LS ? JSON.parse(LS) : {};
  const [state, setState] = useState({
    load: false,
    email: "",
    password: "",
    txtHost: `${storage.protocol}://${storage.host}:${storage.port}`,
    hostShow: false,
  });

  const COMPANY = "Optica Madero";
  const inputEmail = useRef();
  const inputPassword = useRef();

  // Functions
  const handleLogin = () => {
    if (!state.email) {
      return window.Swal.fire({
        icon: "error",
        text: "El campo de correo electronico es requerido",
        showConfirmButton: false,
        timer: 2500,
        position: "top center",
      }).then(() => {
        inputEmail.current.focus();
      });
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      return window.Swal.fire({
        icon: "error",
        text: "El usuario debe de ser un correo valido",
        showConfirmButton: false,
        timer: 2500,
        position: "top center",
      }).then(() => {
        inputEmail.current.focus();
      });
    }

    if (
      !["domain.com", "opticamadero.com"].includes(state.email.split("@")[1])
    ) {
      return window.Swal.fire({
        icon: "error",
        text: "El dominio de este correo no es aceptado",
        showConfirmButton: false,
        timer: 2500,
        position: "top center",
      }).then(() => {
        setState({
          ...state,
          email: "",
        });
      });
    }

    if (!state.password) {
      return window.Swal.fire({
        icon: "error",
        text: "El campo de constraseña es requerido",
        showConfirmButton: false,
        timer: 2500,
        position: "top center",
      }).then(() => {
        inputPassword.current.focus();
      });
    }

    if (state.password.length < 8) {
      return window.Swal.fire({
        icon: "error",
        text: "El password debe de tener al menos 8 caracteres",
        showConfirmButton: false,
        timer: 2500,
        position: "top center",
      }).then(() => {
        inputPassword.current.focus();
      });
    }

    setState({
      ...state,
      load: true,
    });

    auth
      .setSession({ email: state.email, password: state.password })
      .then((res) => {
        setState({
          ...state,
          load: false,
        });

        if (!res.status) {
          let message = res.message;

          if (res.data?.errors) {
            message = res.data?.errors[Object.keys(res.data.errors)[0]][0];
          }

          if (!message && res.data) message = res.data.message;

          return window.Swal.fire({
            icon: "error",
            text: message,
            showConfirmButton: false,
            timer: 2500,
            position: "top center",
          });
        }

        history.push("/");
      });
  };
  const handleKeyEnter = (key, fn) => {
    if (key === "Enter") {
      fn();
    }
  };
  const handleChangeServer = () => {
    const { txtHost } = state,
      server = txtHost.split(":");
    let host, port, protocol;

    if (server.length === 2) {
      protocol = "http";
      host = server[0].replace("//", "");
      port = server[1];
    } else if (server.length === 3) {
      protocol = server[0];
      host = server[1].replace("//", "");
      port = server[2];
    } else {
      protocol = "http";
      host = window.location.hostname;
      port = "";
    }

    localStorage.setItem(
      "OrusSystem",
      JSON.stringify({
        ...storage,
        protocol,
        host,
        port,
        token: "",
      })
    );

    setState({
      ...state,
      hostShow: false,
    });

    window.Swal.fire({
      icon: "success",
      text: "Cambio de servidor exitoso",
      showConfirmButton: false,
      timer: 2500,
      position: "top center",
    });
  };
  const handleEmailEnter = () => {
    if (state.email) inputPassword.current.focus();
  };

  useEffect(() => {
    if (auth.auth?.isLogged) {
      history.push("/");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="#logo" onClick={(e) => e.preventDefault()}>
            <b className="text-primary">Orus</b> LTE
          </a>
        </div>

        <div className="rounded shadow-lg card">
          <div className="card-body login-card-body">
            <p className="login-box-msg text-uppercase">
              <span className="p-2 badge badge-secondary">{COMPANY}</span>
            </p>
            <form autoComplete="off">
              <div className="mb-0 input-group">
                <input
                  type="email"
                  className="form-control text-lowercase"
                  placeholder="Correo electonico"
                  onChange={({ target }) =>
                    setState({ ...state, email: target.value.toLowerCase() })
                  }
                  onKeyPress={({ key }) =>
                    handleKeyEnter(key, handleEmailEnter)
                  }
                  defaultValue={state.email}
                  autoComplete="false"
                  ref={inputEmail}
                  autoFocus={state.email ? false : true}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>

              <div className="mt-3 input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={({ target }) =>
                    setState({ ...state, password: target.value })
                  }
                  onKeyPress={({ key }) => handleKeyEnter(key, handleLogin)}
                  defaultValue={state.password}
                  autoComplete="false"
                  ref={inputPassword}
                  autoFocus={
                    state.email ? (state.password ? false : true) : false
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="my-3 col-12">
                  <a
                    href="#tools"
                    onClick={() =>
                      setState({ ...state, hostShow: !state.hostShow })
                    }
                    className="text-muted"
                  >
                    <i className="mx-1 fas fa-wifi"></i> Servidor
                  </a>
                  {state.hostShow ? (
                    <div className="mb-3 input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Servidor"
                        autoComplete="off"
                        onChange={({ target }) => handleChangeServer(target)}
                        defaultValue={state.txtHost}
                        onKeyPress={({ key }) =>
                          handleKeyEnter(key, handleChangeServer)
                        }
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
                      state.load
                        ? "btn btn-outline-secondary btn-block"
                        : "btn btn-primary btn-block"
                    }
                    onClick={handleLogin}
                    disabled={state.load ? true : false}
                  >
                    {state.load ? (
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
