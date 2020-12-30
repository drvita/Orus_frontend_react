import React, { Component } from "react";
import Pagination from "../Layouts/pagination";

export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meta: {},
      add: false,
      name: "",
      category_raiz: [],
      category_id: props.category,
      page: 1,
      host: props.data.host,
      token: props.data.token,
      load: true,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getCategoriesMain();
  }
  componentDidUpdate(props, state) {
    const { category } = this.props;
    if (props.category !== category) {
      this.getCategoriesMain();
    }
  }

  render() {
    const { category_raiz, category_id, name, add, meta, load } = this.state,
      {
        categoryName,
        categoryDataName,
        categorySelect,
        category,
        last,
      } = this.props;

    return (
      <div className="card card-primary card-outline">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th style={{ width: 16 }} className="text-center">
                  E
                </th>
              </tr>
            </thead>
            <tbody>
              {!load && category_raiz ? (
                <React.Fragment>
                  <tr
                    className={category_id === category ? "table-success" : ""}
                    onClick={(e) => {
                      this.setState({
                        category_id: parseInt(category) ? category : 0,
                      });
                      categorySelect({
                        [categoryName]: 0,
                        [categoryDataName]: [],
                        category_id: category,
                      });
                    }}
                  >
                    <td
                      colSpan="2"
                      className="text-capitalize"
                      style={{ cursor: "pointer" }}
                    >
                      Raiz
                    </td>
                  </tr>
                  {category_raiz.map((cat) => {
                    return (
                      <tr
                        key={cat.id}
                        className={
                          cat.id === category_id ? "table-success" : ""
                        }
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          if (last) {
                            this.setState({
                              category_id: parseInt(category) ? category : 0,
                            });
                            categorySelect({
                              [categoryName]: 0,
                              [categoryDataName]: [],
                              category_id: category,
                            });
                          } else {
                            categorySelect({
                              [categoryName]: cat.id,
                              [categoryDataName]: cat.hijos,
                              category_id: cat.id,
                            });
                            this.setState({
                              category_id: cat.id,
                            });
                          }
                        }}
                      >
                        <td className="text-capitalize">
                          <a
                            href={"#select!" + cat.id}
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({
                                category_id: cat.id,
                              });
                            }}
                          >
                            {cat.categoria}
                          </a>
                        </td>
                        <td>
                          {!cat.hijos.length ? (
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={(e) => {
                                this.handleClickDelete(cat.id, cat.categoria);
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
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
            {add && !load ? (
              <tfoot>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="form-control text-capitalize"
                      autoComplete="off"
                      value={name}
                      onChange={this.catchInputs}
                      ref={(input) => {
                        this.nameInput = input;
                      }}
                    />
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
          const { host, token } = this.state;

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
        console.log("Categoria eliminado");
        window.Swal.fire({
          icon: "success",
          title: "Categoria eliminada con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => {
          //Proceso de eliminacion de categoria del array
          const { category } = this.props;
          let { category_raiz } = this.state,
            indexCat = 0;

          if (category_raiz.length) {
            category_raiz.filter((cat, i) => {
              if (cat.id === id) indexCat = i;
              return false;
            });
            category_raiz.splice(indexCat, 1);
            this.setState({
              category_raiz,
              category_id: category,
            });
          }
          //fin del proceso
        });
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
          const { host, token, category_id, name } = this.state,
            { category } = this.props,
            body = {
              name,
              category_id: parseInt(category_id)
                ? parseInt(category_id)
                : parseInt(category)
                ? parseInt(category)
                : "",
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
        const data = result.value,
          { category_raiz, category_id } = this.state,
          { category } = this.props;

        if (data.data) {
          console.log("Categoria almacenada");
          window.Swal.fire({
            icon: "success",
            title: "Categoria almacenada con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then(async (res) => {
            //Resultado actualizando datos
            if (parseInt(category) === category_id) {
              category_raiz.push(data.data);
            } else {
              await category_raiz.find((cat) => {
                if (cat.id === category_id) {
                  cat.hijos.push(data.data);
                  return cat;
                } else return false;
              });
            }

            this.setState({
              category_raiz,
              name: "",
              add: !this.state.add,
              category_id: data.data.id,
            });
            //Fin de resultado
          });
        } else {
          window.Swal.fire("Error", "al almacenar la categoria", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  getCategoriesMain = () => {
    //Variables props
    const { category, CategoryData } = this.props;

    if (CategoryData === undefined || !CategoryData.length) {
      //Variables en localStorage
      const { host, token, page, load } = this.state,
        url = "http://" + host + "/api/categories",
        categoryid = category ? "&categoryid=" + category : "&categoryid=raiz",
        ppage = page > 0 ? "?page=" + page : "?page=1";

      //Mandamos señal de carga si no lo he hecho
      if (!load) {
        this.setState({
          load: true,
        });
      }
      //Categories main
      fetch(url + ppage + categoryid, {
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
          this.setState({
            category_raiz: cat.data !== null ? cat.data : [],
            category_id: category,
            load: false,
          });
        })
        .catch((e) => {
          console.error("Orus: " + e);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
        });
    } else {
      this.setState({
        category_raiz: CategoryData ? CategoryData : [],
        category_id: category,
        load: false,
      });
    }
  };
  handleClickAdd = () => {
    this.setState({
      add: !this.state.add,
      name: "",
    });
  };
  catchInputs = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
  };
}
