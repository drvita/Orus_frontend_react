import React, { Component } from "react";

export default class printPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContact: [],
    };
  }
  componentDidMount() {
    this.getContact(this.props.contact);
  }
  componentDidUpdate(props, state) {
    if (props.contact !== this.props.contact) {
      this.getContact(this.props.contact);
    }
  }

  render() {
    const { id } = this.props;
    let client = this.state.dataContact;

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
              <h2 className="text-center">Abono</h2>
            </center>
          </div>
        </div>
      </div>
    );
  }

  getContact = (id) => {
    if (id) {
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
    }
  };
}
