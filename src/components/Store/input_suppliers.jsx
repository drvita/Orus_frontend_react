import React, { Component } from "react";

export default class SuppliersInput extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      suppliers_data: [],
      text: "",
      load: false,
      host: ls.host,
      token: ls.token,
    };
  }
  componentDidMount() {
    this.setState({
      suppliers_data: [],
    });
    this.getSuppliers();
  }
  render() {
    const { suppliers_data } = this.state,
      { supplier, handleChangeSupplier, supplierRef } = this.props;
    return (
      <div className="row">
        <div className="col">
          <small>
            <label>Proveedor</label>
          </small>
          {suppliers_data.length ? (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className={
                    supplier
                      ? "input-group-text bg-primary"
                      : "input-group-text bg-warning"
                  }
                >
                  <i className="fas fa-address-book"></i>
                </span>
              </div>
              <select
                className="custom-select text-uppercase"
                name="supplier"
                value={supplier}
                ref={supplierRef}
                onChange={(e) => {
                  const { value } = e.target;
                  handleChangeSupplier(parseInt(value));
                }}
              >
                <option value="0">Seleccione un Proveedor</option>
                {suppliers_data.map((sp) => {
                  return (
                    <option value={sp.id} key={sp.id}>
                      {sp.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="text-left">
              <span className="text-dark">Descargando proveedores</span>
              <div className="spinner-border text-primary ml-4" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  getSuppliers = () => {
    //Variables
    let { host, token } = this.state;

    console.log("solicitando proveedores al API");
    fetch("http://" + host + "/api/contacts?type=1", {
      method: "GET",
      signal: this.signal,
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
      .then((data) => {
        if (data.data !== null) {
          console.log("Cargando proveedores");
          this.setState({
            suppliers_data: data.data,
          });
        } else {
          console.error("Orus: ", data.message);
          window.Swal.fire(
            "Error",
            "Error al descargar los proveedores",
            "error"
          );
        }
      })
      .catch((error) => {
        console.log("Orus:", error);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
        this.setState({
          load: false,
        });
      });
  };
}
