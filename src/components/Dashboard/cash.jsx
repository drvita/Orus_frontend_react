import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class Cash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atms: [],
      efectivo: 0,
      tipo: 1,
      host: props.data.host,
      token: props.data.token,
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
                      <td className="text-right">
                        $
                        {atm.efectivo > 0
                          ? atm.efectivo.toFixed(2)
                          : (atm.efectivo * -1).toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
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

  changeState = (e) => {
    let { value, name } = e.target;
    if (name === "tipo") value = value * 1;
    this.setState({
      [name]: value,
    });
  };
  sendAtm = () => {
    //Variables en localStorage
    let { host, token, efectivo, tipo } = this.state,
      body = {
        efectivo: tipo ? efectivo : efectivo * -1,
        type: tipo,
      },
      url = "http://" + host + "/api/atms";

    if (efectivo > 0) {
      //Realiza la peticion de los productos faltantes
      console.log("Enviando al API el efectivo");
      fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
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
            });
            console.log(res);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Almacenando datos de efectivo");
          if (!data.message) {
            window.Swal.fire(
              "success!",
              "Efectivo almacenado con exito.",
              "success"
            ).then((res) => this.getAtms());
          }
        })
        .catch((e) => {
          console.error(e);
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error, intentelo mas tarde",
            icon: "error",
          });
        });
    }
  };
  getAtms = () => {
    //Variables en localStorage
    let { host, token } = this.state,
      { date, user } = this.props,
      url = "http://" + host + "/api/atms",
      atmDate = "?date=" + date,
      atmUser = user ? "&user=" + user : "";

    //Realiza la peticion de los productos faltantes
    console.log("Descargando datos de efectivo");
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
          });
          console.log(res);
        }
        return res.json();
      })
      .then(async (data) => {
        console.log("Almacenando datos de efectivo");
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
        console.error(e);
        window.Swal.fire({
          title: "Error!",
          text: "Ups!\n Hubo un error, intentelo mas tarde",
          icon: "error",
        });
      });
  };
}
