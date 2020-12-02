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
    let id = this.props.match.params.id;
    this.getItem(id);
    this.getCategory();
  }

  render() {
    let { id, load } = this.state;
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
                          value={this.state.brand ? this.state.brand : ""}
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
                          min="0"
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
            <div className="card-footer text-right">
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-group" role="group">
                    <Link
                      to="/almacen/registro"
                      className="btn btn-dark"
                      onClick={this.setNew}
                    >
                      <i className="fas fa-plus mr-1"></i>
                      Nuevo
                    </Link>
                    <Link
                      to="/almacen"
                      className="btn btn-dark"
                      onClick={(e) => {
                        this.changePage("/almacen");
                      }}
                    >
                      <i
                        className={id ? "fas fa-ban mr-1" : "fas fa-undo mr-1"}
                      ></i>
                      {id ? "Cerrar" : "Cancelar"}
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

  setNew = (e) => {
    this.setState({
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
      load: false,
    });
  };
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
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((cat) => {
        if (cat.data) {
          console.log("descargando categorias");
          this.setState({
            category_list: cat.data,
          });
        } else {
          console.error("Orus: ", cat.message);
          window.Swal.fire(
            "Error",
            "Error al descargar las categorias",
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
  handleSave = (e) => {
    e.preventDefault();

    let { id } = this.state;

    //Verificamos campos validos

    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar el producto?"
        : "¿Esta seguro de crear un nuevo producto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
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

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log("Enviando datos del producto a API");
          return fetch(url, {
            method: method,
            body: JSON.stringify(body),
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
            .catch((e) => {
              console.error("Orus fetch", e);
              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;

        if (data.data) {
          console.log("Producto almacenada");
          window.Swal.fire({
            icon: "success",
            title: id
              ? "Producto actualizado con exito"
              : "Producto almacenado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.setState({
              id: data.data.id,
            });
            this.props.history.push(`/almacen/registro/${data.data.id}`);
          });
        } else {
          window.Swal.fire("Error", "al almacenar el producto", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  getItem = (id) => {
    if (id > 0) {
      //Variables
      let { host, token } = this.state;
      //Realiza la peticion al API
      console.log("Solicitando datos de producto a la API");
      fetch("http://" + host + "/api/store/" + id, {
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
          if (data.data) {
            console.log("Descargando producto");
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
            console.error("Orus: ", data.message);
            window.Swal.fire(
              "Error",
              "Error en el sistema, comuniquese con el administrador de sistema",
              "error"
            );
            this.setState({
              load: false,
            });
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
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
