import React, { Component } from "react";

export default class SalesOutStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [],
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentDidMount() {
    this.getStockOut();
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Pedido</th>
            <th scope="col">Faltante</th>
          </tr>
        </thead>
        {this.state.stock.length ? (
          <tbody>
            {this.state.stock.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.producto}</td>
                  <td>{item.pedido}</td>
                  <td>{item.faltante}</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    );
  }

  getStockOut = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/salesItems",
      stock = "?stock=false";

    //Realiza la peticion de los productos faltantes
    console.log("Descargando stock faltante");
    fetch(url + stock, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Hubo un error, intentelo mas tarde");
          console.log(res);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Almacenando datos descargados");
        this.setState({
          stock: data.data,
        });
      });
  };
}
