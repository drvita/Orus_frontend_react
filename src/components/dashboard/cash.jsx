import { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class Cash extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      atms: [],
      efectivo: 0,
      tipo: 1,
      host: ls.host,
      token: ls.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentDidMount() {
    this.getAtms();
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidUpdate(props, state) {
    if (props.date !== this.props.date || props.user !== this.props.user) {
      this.getAtms();
    }
  }

  render() {
    const { atms, efectivo, tipo } = this.state;
    let total = 0;
    return (
      <div className="card card-dark card-outline">
        <div className="card-header">
          <h3 className="card-title text-dark">Movimientos de caja</h3>
        </div>
        <div className="card-body">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Usuario</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              {atms.length ? (
                atms.map((atm) => {
                  total += atm.efectivo;
                  return (
                    <tr
                      key={atm.id}
                      className={
                        atm.efectivo > 0 ? "text-success" : "text-danger"
                      }
                    >
                      <td>{moment(atm.created_at).format("LT")}</td>
                      <td>{atm.created_user}</td>
                      <td>{atm.tipo ? "Ingreso" : "Egreso"}</td>
                      <td>
                        $
                        {atm.efectivo > 0
                          ? atm.efectivo.toFixed(2)
                          : (atm.efectivo * -1).toFixed(2)}
                      </td>
                      <th className="text-right">
                        <a
                          href="#delete"
                          className="text-dark"
                          onClick={(e) => {
                            e.preventDefault();
                            this.deleteAtm(
                              atm.id,
                              atm.tipo,
                              atm.efectivo.toFixed(2)
                            );
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </a>
                      </th>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay datos
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right">
                  <label>Total</label>
                </td>
                <td className="text-right">$ {total.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="card-footer">
          <div className="form-group row">
            <label className="col-4 col-form-label">Efectivo</label>
            <div className="col">
              <select
                className="form-control"
                name="tipo"
                value={tipo}
                onChange={this.changeState}
              >
                <option value="1">Ingresos</option>
                <option value="0">Egreso</option>
              </select>
            </div>
            <div className="col">
              <input
                type="number"
                name="efectivo"
                className="form-control text-right"
                min="0"
                max="10000"
                value={efectivo}
                onChange={this.changeState}
              />
            </div>
            <div className="col">
              <button
                className="btn btn-dark"
                onClick={this.sendAtm}
                disabled={efectivo > 0 ? false : true}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  deleteAtm = (id, tipo, efectivo) => {
    efectivo = efectivo > 0 ? efectivo : efectivo * -1;
    tipo = tipo ? "la ENTRADA" : "el EGRESO";

    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar " + tipo + " de " + efectivo + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        let { host, token } = this.state;

        if (confirm && efectivo) {
          return fetch("http://" + host + "/api/atms/" + id, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then(async (response) => {
              let back = {};
              if (response.status !== 204) back = await response.json();
              if (!response.ok) {
                throw new Error(back.message);
              }
              return back;
            })
            .catch((e) => {
              if (e.code === 20) {
                console.error(
                  "[Orus system] Salida por error:",
                  e.code,
                  e.message
                );
                return false;
              }

              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error",
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        window.Swal.fire({
          icon: "success",
          title: "Entrada eliminada con exito",
          showConfirmButton: false,
          timer: 3000,
        }).then((res) => this.getAtms());
      } else if (result && !result.dismiss) {
        console.log("Orus res: ", result);
        window.Swal.fire(
          "Error",
          "Se perdio la conexion con el servidor",
          "error"
        );
      }
    });
  };
  changeState = (e) => {
    let { value, name } = e.target;
    if (name === "tipo") value = value * 1;
    this.setState({
      [name]: value,
    });
  };
  sendAtm = () => {
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de agregar un movimiento a la caja?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        let { host, token, efectivo, tipo } = this.state,
          body = {
            efectivo: tipo ? efectivo : efectivo * -1,
            type: tipo,
          },
          url = "http://" + host + "/api/atms";
        if (confirm && efectivo) {
          return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((e) => {
              if (e.code === 20) {
                console.error(
                  "[Orus system] Salida por error:",
                  e.code,
                  e.message
                );
                return false;
              }

              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;

        if (data.data) {
          window.Swal.fire({
            icon: "success",
            title: "Movimiento almacenado con exito",
            showConfirmButton: false,
            timer: 3000,
          }).then((res) => this.getAtms());
        } else {
          window.Swal.fire("Error", "al almacenar el movimiento", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  getAtms = () => {
    let { host, token } = this.state,
      { date, user } = this.props,
      url = "http://" + host + "/api/atms",
      atmDate = "?date=" + date,
      atmUser = user ? "&user=" + user : "";

    fetch(url + atmDate + atmUser, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok && res.status !== 401) {
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error, intentelo mas tarde",
            icon: "error",
            timer:3000,
          });
        }
        return res.json();
      })
      .then(async (data) => {
        if (!data.message) {
          let efectivo = 0;
          await data.data.map((atm) => {
            efectivo += atm.efectivo;
            return null;
          });
          this.props.changeState("caja", efectivo);
          this.setState({
            atms: data.data,
            efectivo: 0,
          });
        }
      })
      .catch((e) => {
        if (e.code === 20) {
          console.error("[Orus system] Salida por error:", e.code, e.message);
          return false;
        }

        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
}
