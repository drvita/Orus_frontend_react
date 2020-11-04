import React, { Component } from "react";

export default class ReportPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: props.data.host,
      token: props.data.token,
      total: 0,
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
  }
  componentDidUpdate(props, state) {
    if (props.date !== this.props.date || props.user !== this.props.user) {
      console.log("Recarga datos de char");
      this.getSaleDay();
    }
  }

  render() {
    const { total } = this.state;
    const { data } = this.props;
    return (
      <div className="card card-success card-outline">
        <div className="card-header">
          <h3 className="card-title">
            {data.rol ? "Mis ventas del dia" : "Ventas del dia"}
          </h3>
        </div>
        <div className="card-body">
          <canvas id="donutChart"></canvas>
          Venta: <strong>$ {total.toFixed(2)}</strong>
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
      url = "http://" + host + "/api/saleday",
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
        .then((res) => {
          if (!res.ok) {
            window.Swal.fire({
              title: "Error!",
              text: "Ups!\n Hubo un error al descargar las ventas",
              icon: "error",
              confirmButtonText: "Ok",
            });
            console.log(res);
          }
          return res.json();
        })
        .then(async (data) => {
          var donutChartCanvas = window
              .$("#donutChart")
              .get(0)
              .getContext("2d"),
            donutOptions = {
              maintainAspectRatio: true,
              responsive: true,
            },
            labels = [],
            values = [],
            total = 0.0,
            donutData = {};
          if (this.char) this.char.destroy();

          if (!data.message) {
            console.log("Mostrando datos de la venta del dia");
            if (data && data.length) {
              await data.map((mp) => {
                labels.push(this.SetMethodPayment(mp.metodopago));
                values.push(mp.total.toFixed(2));
                if (mp.metodopago === 1)
                  this.props.changeState("ventas", mp.total);
                total += mp.total;
                return null;
              });
            } else {
              labels = ["No hay datos"];
              values = [100];
            }

            this.setState({
              total,
            });
          } else {
            console.error("Error al cargar la venta del dia", data.message);
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
        })
        .catch((e) => {
          console.error(e);
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error de usuario, intentelo mas tarde",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
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
