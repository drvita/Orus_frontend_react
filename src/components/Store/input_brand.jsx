import React, { Component } from "react";

export default class InputBrand extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      brands: [],
      host: ls.host,
      token: ls.token,
    };
  }
  componentDidMount() {
    this.getBrands();
  }
  componentDidUpdate(props, state) {
    if (props.supplier !== this.props.supplier) {
      this.setState({
        brands: [],
      });
      this.getBrands();
    }
  }

  render() {
    const { brandsName, brand, textSelect, brandRef } = this.props,
      { brands } = this.state;
    return (
      <div className="row">
        <div className="col">
          <small>
            <label>Marca</label>
          </small>
          {brands.length ? (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className={
                    brand
                      ? "input-group-text bg-primary"
                      : "input-group-text bg-warning"
                  }
                >
                  <i className="fas fa-copyright"></i>
                </span>
              </div>
              <select
                className="custom-select text-uppercase"
                name={brandsName}
                value={brand}
                ref={brandRef}
                onChange={this.handleChangeCategory}
              >
                <option value="0">{textSelect}</option>
                {brands.map((brand) => {
                  return (
                    <option value={brand.id} key={brand.id}>
                      {brand.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="text-left">
              <span className="text-dark">Descargando marcas</span>
              <div className="spinner-border text-primary ml-4" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  handleChangeCategory = (e) => {
    const { value } = e.target,
      { handleChangeBrand } = this.props;
    handleChangeBrand(parseInt(value));
  };
  getBrands = () => {
    //Constantes
    const { host, token } = this.state,
      { supplier } = this.props;

    console.log("[DEBUG] solicitando marcas al API", supplier);
    fetch("http://" + host + "/api/brands?supplier=" + supplier, {
      method: "GET",
      signal: this.signal,
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
      .then((data) => {
        if (data.data !== null) {
          console.log("descargando marcas");
          this.setState({
            brands: data.data,
          });
        } else {
          console.error("Orus: ", data.message);
          window.Swal.fire("Error", "Error al descargar las marcas", "error");
        }
      })
      .catch((error) => {
        console.error("Orus:", error);
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
