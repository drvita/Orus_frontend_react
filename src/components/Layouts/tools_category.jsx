import React, { Component } from "react";

export default class ToolsCategory extends Component {
  constructor(props) {
    super(props);
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
    };
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
    let { category_list, meta } = this.state,
      pages = [],
      category_hijos = this.state.category_hijos,
      category_hijos_3 = this.state.category_hijos_3;
    if (category_list.length && meta.total > 10) {
      for (var i = 1; i <= meta.last_page; i++) {
        pages.push(
          <li
            key={i}
            className={
              meta.current_page === i ? "page-item disabled" : "page-item"
            }
          >
            <a
              href={"#page" + i}
              className="page-link"
              onClick={this.handleChangePage.bind(this, i)}
            >
              {i}
            </a>
          </li>
        );
      }
    }

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
              {category_list.map((cat) => {
                let padre = "";

                if (cat.depende_de != null) {
                  if (cat.depende_de.depende_de != null) {
                    padre = cat.depende_de.depende_de.categoria;
                  }
                  padre = padre
                    ? padre + "/" + cat.depende_de.categoria
                    : cat.depende_de.categoria;
                }
                padre = padre ? padre + "/" + cat.categoria : cat.categoria;

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
                          this.handleClickDelete(cat.id);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {this.state.add ? (
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
                      <i className="fas fa-check"></i>
                    </button>
                  </td>
                </tr>
              </tfoot>
            ) : (
              <tfoot>
                <tr>
                  <td colSpan="3">
                    {Object.keys(meta).length && meta.total > 10 ? (
                      <div className="btn-group">
                        <ul className="pagination pagination-sm">{pages}</ul>
                      </div>
                    ) : (
                      ""
                    )}
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
  handleClickDelete = (id) => {
    if (id) {
      if (window.confirm("¿Realmente desea eliminar esta categoria?")) {
        let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
        console.log("Enviando peticion de eliminado al API", id);
        fetch("http://" + varLocalStorage.host + "/api/categories/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + varLocalStorage.token,
          },
        })
          .then((res) => {
            if (!res.ok) {
              window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
            } else {
              console.log("Categoria eliminada");
              this.getCategories();
              this.setState({
                newItem: 0,
                add: false,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };
  handleClickSave = () => {
    if (this.state.name.length > 3) {
      if (window.confirm("¿Deseal almacenar esta categoria?")) {
        //Variables en localStorage
        let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
          body = {
            name: this.state.name,
            category_id: this.state.category_id_3
              ? this.state.category_id_3
              : this.state.category_id_2
              ? this.state.category_id_2
              : this.state.category_id,
          };
        console.log("Enviando categoria al API para almacenar");
        fetch("http://" + varLocalStorage.host + "/api/categories", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + varLocalStorage.token,
          },
        })
          .then((res) => {
            if (!res.ok) {
              window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
            }
            return res.json();
          })
          .then((cat) => {
            if (cat.data) {
              console.log("Categoria almacenada");
              this.setState({
                newItem: cat.data.id,
                name: "",
                category_id: 0,
                add: false,
              });
              this.getCategories();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alert("Debe de escribir el nombre de la categoria");
      this.nameInput.focus();
    }
  };
  getCategories = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/categories",
      categoryid = "&categoryid=raiz",
      page = this.state.page > 0 ? "?page=" + this.state.page : "?page=1";
    console.log("Descargando lista de categorias");
    fetch(url + page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        }
        return res.json();
      })
      .then((cat) => {
        if (cat.data) {
          console.log("Lista de categorias descargadas");
          this.setState({
            category_list: cat.data,
            meta: cat.meta,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //Category_select
    fetch(url + page + categoryid, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + varLocalStorage.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        }
        return res.json();
      })
      .then((cat) => {
        if (cat.data) {
          this.setState({
            category_select: cat.data,
          });
        }
      })
      .catch((e) => {
        console.log(e);
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
