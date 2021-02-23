import React, { Component } from "react";

export default class ReportBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: props.data.host,
      token: props.data.token,
      listBank: [],
      data: [],
    };
    this.char = null;
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getSaleDay();
    this.getBaks();
  }
  componentDidUpdate(props, state) {
    if (props.date !== this.props.date || props.user !== this.props.user) {
      console.log("[ReportBank] Recarga datos de char");
      this.getSaleDay();
    }
  }

  render() {
    const { listBank, data } = this.state;
    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title text-success">
            Detallado de pagos bancarios
          </h3>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {data.map((bank) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={bank.bank_id}
                >
                  <label className="text-uppercase">
                    {listBank.map((bankname) => {
                      if (bankname.id === bank.bank_id) return bankname.name;
                      else return null;
                    })}
                  </label>
                  <span className="badge badge-primary badge-pill">
                    $ {bank.total.toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  changeState = (e) => {
    let { value, name } = e.target;
    if (name === "user") value = value * 1;
    this.setState({
      [name]: value,
    });
  };
  getSaleDay = () => {
    //Variables en localStorage
    let { host, token } = this.state,
      { date, user } = this.props,
      url = "http://" + host + "/api/bankdetails",
      saleDay = "?date=" + date,
      saleUser = user ? "&user=" + user : "";

    if (token && host) {
      //Realiza la peticion del pedido
      console.log("Solicitando datos a la API");
      fetch(url + saleDay + saleUser, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
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
        .then(async (data) => {
          if (!data.message) {
            console.log("[reportBank] Mostrando detalles bancarios");
            this.setState({
              data,
            });
          } else {
            throw new Error(data.message);
          }
        })
        .catch((e) => {
          console.error("[reportBank] " + e);
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error en la consulta, revise la conexion",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };
  getBaks = () => {
    const { host, token } = this.state,
      type = "?name=bank";

    //Peticion ajax de listado de bancos
    console.log("[reportBank] Descargando listado de bancos");
    fetch("http://" + host + "/api/config" + type, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
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
      .then((data) => {
        if (data.meta && data.meta.total) {
          console.log("[reportBank] Listado de bancos descargado");
          this.setState({
            listBank: data.data,
          });
        }
      })
      .catch((e) => {
        console.error("[Orus system] ", e);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
}
