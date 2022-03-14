import React, { Component } from "react";
import { api, getUrl } from "../../../redux/sagas/api";

export default class ReportPay extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      host: ls.host,
      rol: ls.rol,
      token: ls.token,
      total: 0,
      efectivo: 0,
      page: 1,
    };
    this.char = null;

    this.controller = new AbortController();
    //this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getSaleDay();
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
    const { total, efectivo, rol } = this.state;
    const { data } = this.props;

    //console.log("rooooooooooooooooooool", rol);
    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title text-success">
            {data.rol
              ? "Mis ventas del dia por metodo de pago"
              : "Ventas del dia por metodo de pago"}
          </h3>
        </div>
        <div className="card-body">
          <canvas id="donutChart"></canvas>
          <p>
            {!rol ? (
              <React.Fragment>
                Venta: <strong>$ {total.toFixed(2)}</strong>
                <br />
              </React.Fragment>
            ) : null}
            Efectivo: <strong>$ {efectivo.toFixed(2)}</strong>
          </p>
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
    //Variables en localStorage
    let { page } = this.state,
      { filters } = this.props;

    const newFiltersPays = {
      ...filters,
    };

    newFiltersPays.itemsPage = 12;
    newFiltersPays.page = page;
    newFiltersPays.type = "methods";

    const url = getUrl("payments", null, newFiltersPays);
    const { data, message } = await api(url);

    //console.log("[DATAAA CURRENT]",data);
    //console.log("[URLLL CURRENT]",data);

    if (data) {
      var donutChartCanvas = window.$("#donutChart").get(0).getContext("2d"),
        donutOptions = {
          maintainAspectRatio: true,
          responsive: true,
        },
        labels = [],
        values = [],
        total = 0,
        efectivo = 0,
        donutData = {};
      if (this.char) this.char.destroy();

      if (!data.message) {
        console.log("[ReportPay] Almacenando datos de la venta del dia", data);
        if (data && data.length) {
          await data.map((mp) => {
            labels.push(mp.method);
            values.push(mp.total.toFixed(2));
            if (mp.method === "efectivo") {
              this.props.changeState("ventas", mp.total);
              efectivo = mp.total;
            }
            total += mp.total;
            return null;
          });
        } else {
          labels = ["No hay datos"];
          values = [0];
        }

        this.setState({
          total,
          efectivo,
        });
      } else {
        console.error("[ORUS] Error al cargar la venta del dia", data.message);
        labels = ["No hay datos"];
        values = [100];
      }
      donutData = {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#f56954",
              "#00a65a",
              "#f39c12",
              "#00c0ef",
              "#3c8dbc",
              "#d2d6de",
              "#000",
            ],
          },
        ],
      };
      this.char = new window.Chart(donutChartCanvas, {
        type: "pie",
        data: donutData,
        options: donutOptions,
      });
    } else if (message) {
      window.Swal.fire({
        title: "Error!",
        text: "Ups!\n Hubo un error al descargar las ventas",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return message;
    }

    //url = "http://" + host + "/api/payments?",
    //date_start = "date_start=" + fechaInicial,
    //date_end = "&date_end=" + fechaFinal,
    //method = "&type=methods",
    //saleUser = user ? "&user=" + user : "";
  };

  SetMethodPayment = (status) => {
    switch (status) {
      case 1:
        return "Efectivo";
      case 2:
        return "Tarjeta debito";
      case 3:
        return "Tarjeta de credito";
      case 4:
        return "La marina";
      case 5:
        return "Cheque";
      case 6:
        return "Transferencia";
      default:
        return "Otro";
    }
  };
}
