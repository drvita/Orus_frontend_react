import React, { Component } from "react";
import { api, getUrl } from "../../../redux/sagas/api";

export default class ReportBank extends Component {

  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));

    this.state = {
      host: ls.host,
      token: ls.token,
      listBank: [],

      page: 1,

      data: [],
      meta:{},
      load: false,
    };


    this.char = null;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getSaleDay();
    // this.getBaks();
  }
  componentDidUpdate(props, state) {
    if (
      props.filters.date_start !== this.props.filters.date_start ||
      props.filters.date_end !== this.props.filters.date_end ||
      props.filters.user !== this.props.filters.user ||
      props.filters.branch_id !== this.props.filters.branch_id ||
      state.page !== this.state.page
    ) {
      this.getSaleDay();
    }
  }

  render() {
    const { data, load } = this.state;

    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title text-success">
            Detallado de pagos bancarios
          </h3>
        </div>
        <div className="card-body">
          {load ? (
            <div>
              <div className="spinner-border text-primary mr-4" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <span className="font-weight-light font-italic">
                Espere cargando datos de banco
              </span>
            </div>
          ) : (
            <ul className="list-group">
              {data.length ? (
                data.map((bank, i) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={i}
                    >
                      <label className="text-uppercase">{bank.name}</label>
                      <span className="badge badge-primary badge-pill">
                        $ {bank.total.toFixed(2)}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <h6 className="text-warning">
                    <i className="fas fa-info mr-2"></i>
                    No hay datos para este dia
                  </h6>
                </li>
              )}
            </ul>
          )}
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


  getSaleDay = async () => {
    const { filters } = this.props;

    const newFiltersBank = {
      ...filters,
    }

    newFiltersBank.itemsPage = 12;
    newFiltersBank.page = this.state.page;
    newFiltersBank.type = 'banks';


    const url = getUrl("payments", null, newFiltersBank);

    const {data, meta, message} = await api(url);

    //console.log("URl STRING",url);

    //console.log("Report bank DATA", data);

    if(data){
      this.setState({
        data:data,
        meta:meta,
        load:false
      })
    }else if(message){

      this.setState({
        load:false
      })
      console.error("[Orus system] Error in report payments details:", message);
      window.Swal.fire("Fallo de conexion", message, "error");
    }

      //url = "http://" + host + "/api/payments?"

      //date_start = "date_start=" + fechaInicial + "&type=banks",

      //date_end = "&date_end=" + fechaFinal + "&type=banks",

      //saleUser = user ? "&user=" + user : "";

   /*  if (token && host) {
      //Realiza la peticion del pedido
      console.log("Solicitando datos a la API");
      this.setState({
        load: true,
      });
      fetch(url + date_start + date_end + saleUser, {
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
        .then(async ({ data }) => {
          if (!data.message) {
            console.log("[reportBank] Almacenando detalles bancarios", data);
            this.setState({
              data,
              load: false,
            });
          } else {
            throw new Error(data.message);
          }
        })
        .catch((e) => {
          this.setState({
            load: false,
          });

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
    } */
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
