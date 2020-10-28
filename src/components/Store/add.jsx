import React, { Component } from "react";
import { Link } from "react-router-dom";
import StoreLote from "./add_lote";

export default class StoreAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      code: "",
      codebar: "",
      grad: "",
      brand: "",
      name: "",
      unit: "PZ",
      cant: 1,
      price: 1,
      category_id: 1,
      category_list: [],
      load: false,
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getItem();
    this.getCategory();
  }

  render() {
    let { load } = this.state;
    return (
      <div className="row">
        <div className={this.state.id ? "col-5" : "col-6"}>
          <form
            className="card card-primary card-outline"
            onSubmit={this.handleSave}
          >
            <div className="card-header">
              <h3 className="card-title text-primary">
                <i className="fas fa-database mr-1"></i>
                {this.state.id ? "Editar producto" : "Registrar nuevo producto"}
              </h3>
            </div>
            <div className="card-body">
              {load ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-5">
                      {this.state.code ? (
                        <small>
                          <label>Codigo</label>
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-code"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control text-uppercase"
                          placeholder="Codigo"
                          name="code"
                          value={this.state.code}
                          onChange={this.catchInputs}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-md-7">
                      {this.state.codebar ? (
                        <small>
                          <label>Codigo de barras</label>
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-barcode"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Codigo de barras"
                          name="codebar"
                          value={this.state.codebar}
                          onChange={this.catchInputs}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.state.name ? (
                        <small>
                          <label>Nombre del producto</label>
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-archive"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nombre del producto"
                          name="name"
                          value={this.state.name}
                          onChange={this.catchInputs}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10">
                      {this.state.brand ? (
                        <small>
                          <label>Marca</label>
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-5">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-copyright"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Marca"
                          name="brand"
                          value={this.state.brand}
                          onChange={this.catchInputs}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {this.state.unit ? (
                        <small>
                          <label>Unidad de presentacion</label>
                        </small>
                      ) : (
                        <br />
                      )}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-balance-scale"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Unidad de presentación"
                          name="unit"
                          value={this.state.unit}
                          onChange={this.catchInputs}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <small>
                        <label>Cantidad en existencia</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-database"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control text-right"
                          placeholder="Cantidades en existencia"
                          name="cant"
                          value={this.state.cant}
                          onChange={this.catchInputs}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <small>
                        <label>Precio</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-money-bill"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control text-right"
                          placeholder="Precio"
                          name="price"
                          value={this.state.price}
                          onChange={this.catchInputs}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <small>
                        <label>Categoria</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-sort-amount-down"></i>
                          </span>
                        </div>
                        <select
                          className="custom-select"
                          name="category_id"
                          value={this.state.category_id}
                          onChange={this.catchInputs}
                        >
                          {this.state.category_list.map((list) => {
                            if (list.depende_de === null) {
                              return (
                                <option value={list.id} key={list.id}>
                                  {list.categoria}
                                </option>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-group float-right" role="group">
                    <Link
                      to="/almacen"
                      className="btn btn-dark"
                      onClick={(e) => {
                        this.changePage("/almacen");
                      }}
                    >
                      <i className="fas fa-ban mr-1"></i>
                      Volver
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save mr-1"></i>
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {this.state.id ? (
          <div className="col">
            <StoreLote
              id={this.state.id}
              price={this.state.price}
              refresh={this.getItem}
            />
          </div>
        ) : null}
      </div>
    );
  }

  changePage = (e) => {
    this.props.page(e);
  };
  catchInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  };
  getCategory = () => {
    //Variables
    let { host, token } = this.state;

    console.log("solicitando categorias al API");
    fetch("http://" + host + "/api/categories", {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Error al solicitar categorias");
        }
        return res.json();
      })
      .then((cat) => {
        if (cat.data) {
          console.log("almacenando categorias");
          this.setState({
            category_list: cat.data,
          });
        } else {
          console.error(cat.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleSave = (e) => {
    e.preventDefault();
    //Maneja el boton de almacenar
    let conf = window.confirm("¿Esta seguro de almacenar este producto?");

    if (conf) {
      let {
          id,
          code,
          codebar,
          brand,
          name,
          unit,
          cant,
          price,
          category_id,
          token,
          host,
          load,
        } = this.state,
        body = {
          code,
          codebar,
          brand,
          name,
          unit,
          cant,
          price,
          category_id,
        },
        url = id
          ? "http://" + host + "/api/store/" + id
          : "http://" + host + "/api/store",
        method = id ? "PUT" : "POST";

      //Verificamos datos del formulario

      //Mandamos señal de procesamiento
      if (!load) {
        this.setState({
          load: true,
        });
      }

      //Actualiza el producto o creamos el producto
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Producto almacenado");
            if (
              window.confirm(
                "Producto almacenado con exito!.\n¿Desea ir al listado?"
              )
            ) {
              this.props.history.goBack();
            } else {
              this.setState({
                load: false,
                id: data.data.id,
              });
            }
          } else {
            window.alert("Error al almacenar el contacto. Intentelo mas tarde");
            console.error(data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          this.setState({
            load: false,
          });
        });
    }
  };
  getItem = () => {
    let id = this.props.match.params.id;

    if (id > 0) {
      //Variables
      let { load, host, token } = this.state;

      //Mandamos señal de carga si no lo he hecho
      if (!load) {
        this.setState({
          load: true,
        });
      }
      //Realiza la peticion al API
      fetch("http://" + host + "/api/store/" + id, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
            console.error(res);
          }
          return res.json();
        })
        .then((data) => {
          if (!data.message) {
            console.log("Mostrando producto");
            this.setState({
              id: data.data.id,
              code: data.data.codigo,
              codebar: data.data.c_barra,
              brand: data.data.marca,
              name: data.data.producto,
              unit: data.data.unidad,
              cant: data.data.cantidades,
              price: data.data.precio,
              category_id: data.data.categoria.id,
              load: false,
            });
          } else {
            console.error("Error al cargar el producto", data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          this.setState({
            load: false,
          });
        });
    }
  };
}
