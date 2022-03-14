import React, { Component } from "react";
import Pagination from "../../../layouts/pagination";

export default class ToolsCategory extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      category_list: [],
      category_select: [],
      category_hijos: [],
      category_hijos_3: [],
      meta: {},
      add: false,
      name: "",
      category_id: 0,
      category_id_2: 0,
      category_id_3: 0,
      newItem: 0,
      page: 1,
      host: ls.host,
      token: ls.token,
      load: true,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getCategories();
  }
  componentDidUpdate(props, state) {
    if (state.page !== this.state.page) {
      console.log("Recargando categorias");
      this.getCategories();
    }
  }

  render() {
    let { category_list, meta, load } = this.state,
      category_hijos = this.state.category_hijos,
      category_hijos_3 = this.state.category_hijos_3;

    return (
      <div className="card card-primary card-outline">
        <div className="card-body">
          <h5 className="card-title">Categorias</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Padre</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {!load ? (
                category_list.map((cat) => {
                  let padre = "";

                  if (cat.depende_de != null) {
                    if (cat.depende_de.depende_de != null) {
                      padre = cat.depende_de.depende_de.categoria;
                    }
                    padre = padre
                      ? padre + "/" + cat.depende_de.categoria
                      : cat.depende_de.categoria;
                  }
                  padre = padre ? padre : "--";

                  return (
                    <tr
                      key={cat.id}
                      className={
                        cat.id === this.state.newItem ? "table-success" : ""
                      }
                    >
                      <td className="text-capitalize">{cat.categoria}</td>
                      <td className="text-capitalize">{padre}</td>
                      <td>
                        <button
                          className="btn btn-outline-light btn-sm"
                          onClick={(e) => {
                            this.handleClickDelete(cat.id, cat.categoria);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            {this.state.add && !load ? (
              <tfoot>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      autoComplete="off"
                      value={this.state.name}
                      onChange={this.catchInputs}
                      ref={(input) => {
                        this.nameInput = input;
                      }}
                    />
                  </td>
                  <td>
                    <select
                      name="category_id"
                      className="form-control"
                      value={this.state.category_id}
                      onChange={this.handleCategoryChange}
                    >
                      <option value="0">Inicial</option>
                      {this.state.category_select.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.categoria}
                          </option>
                        );
                      })}
                    </select>
                    {category_hijos.length ? (
                      <select
                        name="category_id_2"
                        className="form-control mt-2"
                        value={this.state.category_id_2}
                        onChange={this.handleCategoryChange}
                      >
                        <option value="0">Raiz</option>
                        {this.state.category_hijos.map((cat) => {
                          return (
                            <option key={cat.id} value={cat.id}>
                              {cat.categoria}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      ""
                    )}
                    {category_hijos_3.length ? (
                      <select
                        name="category_id_3"
                        className="form-control mt-2"
                        value={this.state.category_id_3}
                        onChange={this.handleCategoryChange}
                      >
                        <option value="0">Raiz</option>
                        {this.state.category_hijos_3.map((cat) => {
                          return (
                            <option key={cat.id} value={cat.id}>
                              {cat.categoria}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={this.handleClickSave}
                    >
                      <i className="fas fa-save"></i>
                    </button>
                  </td>
                </tr>
              </tfoot>
            ) : (
              <tfoot>
                <tr>
                  <td colSpan="3">
                    <Pagination
                      meta={meta}
                      handleChangePage={this.handleChangePage}
                    />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <div className="card-footer text-right">
          <button
            className="btn btn-primary btn-sm"
            onClick={this.handleClickAdd}
          >
            {this.state.add ? (
              <i className="fas fa-undo"></i>
            ) : (
              <i className="fas fa-plus"></i>
            )}
          </button>
        </div>
      </div>
    );
  }

  handleCategoryChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      if (value) {
        this.state.category_select.map((cat) => {
          if (cat.id === value * 1) {
            this.setState({
              category_hijos: cat.hijos,
            });
          }
          return null;
        });
      }
    }
    if (name === "category_id_2") {
      if (value) {
        this.state.category_hijos.map((cat) => {
          if (cat.id === value * 1) {
            this.setState({
              category_hijos_3: cat.hijos,
            });
          }
          return null;
        });
      }
    }
    this.setState({
      [name]: value,
    });
  };
  handleChangePage = (id) => {
    this.setState({
      page: id,
    });
  };
  handleClickDelete = (id, name) => {
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar la categoria " + name.toUpperCase() + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm && id) {
          let { host, token } = this.state;

          //Inicio de proceso de eliminción por API
          console.log("Solicitud de eliminación de categoria por API");
          return fetch("http://" + host + "/api/categories/" + id, {
            method: "DELETE",
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
            .catch((e) => {
              if (e.code === 20) {
                console.error(
                  "[Orus system] Salida por error:",
                  e.code,
                  e.message
                );
                return false;
              }

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
        console.log("Categoria eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Categoria eliminada con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => this.getCategories());
      } else if (result && !result.dismiss) {
        console.log("Orus res: ", result);
        window.Swal.fire(
          "Error",
          "Se perdio la conexion con el servidor",
          "error"
        );
      }
    });
  };
  handleClickSave = () => {
    //Verificamos campos validos
    if (this.state.name.length < 4) {
      window.Swal.fire(
        "Verificación",
        "Debe de escribir el nombre de la categoria",
        "warning"
      );
      this.nameInput.focus();
      return false;
    }

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear una nueva categoria?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          //Variables
          let { host, token } = this.state,
            body = {
              name: this.state.name,
              category_id: this.state.category_id_3
                ? this.state.category_id_3
                : this.state.category_id_2
                ? this.state.category_id_2
                : this.state.category_id,
            };

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log("Enviando datos a API para almacenar");
          return fetch("http://" + host + "/api/categories", {
            method: "POST",
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
              if (e.code === 20) {
                return false;
              } else {
                window.Swal.fire(
                  "Fallo de conexion",
                  "Verifique la conexion al servidor",
                  "error"
                );
              }
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;

        if (data.data) {
          console.log("Categoria almacenada");
          window.Swal.fire({
            icon: "success",
            title: "Categoria almacenada con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.setState({
              newItem: data.data.id,
            });
            this.getCategories();
          });
        } else {
          window.Swal.fire("Error", "al almacenar la categoria", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  getCategories = () => {
    //Variables en localStorage
    let { host, token, load } = this.state,
      url = "http://" + host + "/api/categories",
      //categoryid = "&categoryid=raiz",
      itemsPage = "&itemsPage=5",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";

    //Mandamos señal de carga si no lo he hecho
    if (!load) {
      this.setState({
        load: true,
      });
    }

    console.log("Descargando lista de categorias");

    //TODO:Revisar funcion fetch
    fetch(url + page + itemsPage, {
      method: "GET",
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
          console.log("Lista de categorias descargadas");
          this.setState({
            category_list: cat.data,
            meta: cat.meta,
            newItem: 0,
            add: false,
            category_id: 0,
            name: "",
            load: false,
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
  handleClickAdd = () => {
    this.setState({
      add: !this.state.add,
      name: "",
      category_id: 0,
      category_id_2: 0,
      category_id_3: 0,
      category_hijos: [],
      category_hijos_3: [],
    });
  };
  catchInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  };
}
