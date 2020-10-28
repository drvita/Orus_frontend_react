import React, { Component } from "react";

export default class printSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContact: [],
    };
  }
  componentDidUpdate(props, state) {
    if (props.contact !== this.props.contact) {
      this.getContact(this.props.contact);
    }
  }

  render() {
    const {
      items,
      descuento,
      total,
      saldo,
      abonado,
      folio,
      date,
      id,
    } = this.props;
    let totalItems = 0,
      client = this.state.dataContact;

    return (
      <div className="d-none d-print-block" style={{ width: 340 }} id={id}>
        <div className="row">
          <div className="col">
            <div className="card m-0">
              <div className="card-body">
                <h2 className="text-center">
                  <center>
                    <strong>Óptica Madero</strong>
                  </center>
                </h2>
                <h4>
                  <em>
                    Julio Cesar Cardenas Martinez
                    <br />
                    Tel: 312 312 5353
                    <br />
                    Av. Tecnologico 38-A, Vistahermosa, Colima, Col.
                  </em>
                </h4>
                <h4>
                  <i>Folio: {folio}</i>
                  <br />
                  <i>Fecha: {date}</i>
                </h4>
                <hr />
                <h4 className="text-capitalize">
                  {client.nombre}
                  <br />
                  {client.telefonos
                    ? client.telefonos[0]
                      ? client.telefonos[0]
                      : client.telefonos[2]
                    : "--"}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <center>
              <h2 className="text-center">Pedido</h2>
            </center>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <h4>Cant</h4>
                  </th>
                  <th>
                    <h4>Descripcion</h4>
                  </th>
                  <th>
                    <h4>Precio</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  totalItems += item.cantidad * item.precio;
                  return (
                    <tr key={item.id}>
                      <td>
                        <h5>{item.cantidad}</h5>
                      </td>
                      <td>
                        <h4>{item.producto}</h4>
                      </td>
                      <td className="text-right">
                        <h5>{item.precio.toFixed(2)}</h5>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    className="text-right"
                    colSpan="3"
                    style={{ textAlign: "right" }}
                  >
                    <h4>
                      Subtotal: <label>$ {totalItems.toFixed(2)}</label>
                    </h4>
                    <h4>
                      Descuento: <label>$ {descuento.toFixed(2)}</label>
                    </h4>
                    <h4>
                      Total: <label>$ {total.toFixed(2)}</label>
                    </h4>
                    <h4>
                      Abonado: <label>$ {abonado.toFixed(2)}</label>
                    </h4>
                    <h4>
                      Saldo: <label>$ {saldo.toFixed(2)}</label>
                    </h4>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr />
            <div className="card">
              <div className="card-body text-center">
                <h4>
                  Armazones usados, viejos y/o resecos son responsabilidad del
                  cliente
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getContact = (id) => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    //Realiza busqueda de contacto
    fetch("http://" + varLocalStorage.host + "/api/contacts/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Descargando contacto");
        this.setState({
          dataContact: data.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
