/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login(props) {
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
    error: {},
  });
  const {
    load: LOADDING,
    email: U,
    password: P,
    txtHost: H_TXT,
    hostShow: HSHOW,
    error: E,
  } = state;
  const { company: COMPANY, errors: ERRORS } = props;

  // Functions
  const handleLogin = () => {
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
          let message = res.data.message;

          if (res.data?.errors) {
            message = res.data?.errors[Object.keys(res.data.errors)[0]][0];
          }

          window.Swal.fire({
            icon: "error",
            text: message,
            showConfirmButton: false,
            timer: 3500,
            position: "top",
          });
          return;
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
                  placeholder="Correo electonico"
                  autoFocus={HSHOW ? false : true}
                  onChange={({ target }) =>
                    setState({ ...state, email: target.value })
                  }
                  defaultValue={U}
                  autoComplete="false"
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
                    <i className="mx-2 fas fa-info"></i>Los datos son erroneos
                  </small>
                </span>
              ) : null}
              <div className="mt-3 input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={({ target }) =>
                    setState({ ...state, password: target.value })
                  }
                  onKeyPress={({ key }) => handleKeyEnter(key, handleLogin)}
                  defaultValue={P}
                  autoComplete="false"
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
                    <i className="mx-2 fas fa-info"></i>Los datos son erroneos
                  </small>
                </span>
              ) : null}
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
                  {HSHOW ? (
                    <div className="mb-3 input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Servidor"
                        autoComplete="off"
                        autoFocus={HSHOW ? true : false}
                        onChange={({ target }) =>
                          setState({ ...state, txtHost: target.value })
                        }
                        defaultValue={H_TXT}
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
                      LOADDING
                        ? "btn btn-outline-secondary btn-block"
                        : "btn btn-primary btn-block"
                    }
                    onClick={handleLogin}
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
