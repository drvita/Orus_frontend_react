import React, { Component } from "react";
import Suppliers from "./input_suppliers";

export default class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: 0,
      brands: [],
      name: "",
      load: false,
      host: props.data.host,
      token: props.data.token,
    };
  }

  componentDidUpdate(props, state) {
    if (state.supplier !== this.state.supplier && this.state.supplier) {
      this.getBrands();
    }
  }
  render() {
    const { supplier, name, brands } = this.state;
    return (
      <React.Fragment>
        <h5>Marcas para productos</h5>
        <div className="row">
          <div className="col">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <Suppliers
                  data={this.props.data}
                  supplier={supplier}
                  handleChangeSupplier={(e) => {
                    this.setState({
                      supplier: e,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-primary card-outline">
              <div className="card-body">
                <h5 className="card-title text-primary mb-4">
                  {supplier
                    ? "Listado de marcas"
                    : "Primero seleccione a un proveedor"}
                </h5>
                {supplier ? (
                  <ul className="card-text list-group">
                    {!brands.length ? (
                      <li className="list-group-item">
                        No hay marcas registradas para este proveedor
                      </li>
                    ) : (
                      brands.map((brand) => {
                        return (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={brand.id}
                          >
                            <span className="text-primary">{brand.nombre}</span>
                            <span
                              className="badge badge-dark badge-pill"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                this.deleteBrand(brand.id, brand.nombre);
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </span>
                          </li>
                        );
                      })
                    )}
                  </ul>
                ) : null}
              </div>
              {supplier ? (
                <div className="card-footer">
                  <form onSubmit={this.saveBrand}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control mr-1"
                        name="name"
                        value={name}
                        onChange={this.changeInput}
                      />
                      <button className="btn btn-dark">
                        <i className="fas fa-save"></i>
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  deleteBrand = (id, item) => {
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar el producto " + item.toUpperCase() + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const { host, token } = this.state;

          //Inicio de proceso de eliminción por API
          console.log("Solicitud de eliminación de marca por API");
          return fetch("http://" + host + "/api/brands/" + id, {
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
        console.log("Marca eliminada");
        window.Swal.fire({
          icon: "success",
          title: "Marca eliminada con exito",
          showConfirmButton: false,
          timer: 1500,
        }).then((res) => {
          //Eliminar el item del array
          let { brands } = this.state,
            indexItem = 0;

          if (brands.length) {
            brands.filter((item, i) => {
              if (item.id === id) indexItem = i;
              return false;
            });
            brands.splice(indexItem, 1);
            this.setState({
              brands,
            });
          }
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
  saveBrand = (e) => {
    e.preventDefault();
    const { name, supplier } = this.state;

    if (name.length < 3) {
      window.Swal.fire(
        "Error",
        "El nombre de la marca debe de tener por lo menos 3 caracteres",
        "error"
      );
      return false;
    } else if (!supplier) {
      window.Swal.fire(
        "Error",
        "Debe de elegir a un proveedor primero",
        "error"
      );
      return false;
    }

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear una nueva marca?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const { name, supplier, token, host } = this.state;
          let body = {
            name,
            contact_id: supplier,
          };

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log("Enviando datos de la marca a API");
          return fetch("http://" + host + "/api/brands", {
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
        let data = result.value;

        if (data.data) {
          console.log("Marca almacenada");
          window.Swal.fire({
            icon: "success",
            title: "Marca almacenada con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            //Actualizando con la nueva marca
            let { brands } = this.state;

            brands.push(data.data);
            this.setState({
              brands,
              name: "",
            });
          });
        } else {
          window.Swal.fire("Error", "al almacenar la marca", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
  changeInput = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };
  getBrands = () => {
    //Constantes
    const { supplier, host, token } = this.state;

    console.log("solicitando marcas al API");
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
