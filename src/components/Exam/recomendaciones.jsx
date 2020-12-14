import React, { Component, Fragment } from "react";

export default class Recomendaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_list: [],
      meta: {},
      category_list_2: [],
      category_list_3: [],
      category_id: 0,
      category_id_2: 0,
      category_id_3: 0,
      category: {},
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
    if (props.category_id !== this.props.category_id) {
      console.log("Recargando recomendacion");
      this.getCategories();
    }
  }

  render() {
    const {
        category_id,
        title,
        esferaod,
        esferaoi,
        cilindrod,
        cilindroi,
      } = this.props,
      { category } = this.state;
    let code = category_id ? this.handleCodeName(category) : "",
      gradod = "+000000",
      gradoi = "+000000";

    if (cilindrod && esferaod) {
      gradod = esferaod > 0 ? "+" : "";
      gradod +=
        esferaod.toFixed(2).toString().replace(".", "") +
        cilindrod.toFixed(2).toString().replace("-", "").replace(".", "");
    }
    if (cilindroi && esferaoi) {
      gradoi = esferaoi > 0 ? "+" : "";
      gradoi +=
        esferaoi.toFixed(2).toString().replace(".", "") +
        cilindroi.toFixed(2).toString().replace("-", "").replace(".", "");
    }

    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-success m-2">{title}</h3>
          {!category_id ? (
            this.state.category_list.length ? (
              <Fragment>
                {this.state.category_list.length ? (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Tipo</span>
                    </div>
                    <select
                      name="category_id"
                      className="custom-select"
                      value={this.state.category_id}
                      onChange={this.handleCategoryChange}
                    >
                      <option value="0">Seleccione el tipo</option>
                      {this.state.category_list.map((cat) => {
                        return (
                          <option value={cat.id} key={cat.id}>
                            {cat.categoria}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}

                {this.state.category_list_2.length ? (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Material</span>
                    </div>
                    <select
                      name="category_id_2"
                      className="custom-select"
                      value={this.state.category_id_2}
                      onChange={this.handleCategoryChange}
                    >
                      <option value="0">Seleccione el material</option>
                      {this.state.category_list_2.map((cat) => {
                        return (
                          <option value={cat.id} key={cat.id}>
                            {cat.categoria}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}

                {this.state.category_list_3.length ? (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Tratamiento</span>
                    </div>
                    <select
                      name="category_id_3"
                      className="custom-select"
                      value={this.state.category_id_3}
                      onChange={(e) => {
                        this.handleCategoryChange(e, gradod, gradoi);
                      }}
                    >
                      <option value="0">Seleccione el tratamiento</option>
                      {this.state.category_list_3.map((cat) => {
                        return (
                          <option value={cat.id} key={cat.id}>
                            {cat.categoria}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}
              </Fragment>
            ) : (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )
          ) : (
            <Fragment>
              {code + gradod === code + gradoi ? (
                <p className="card-text">
                  <label>Lente</label>: {code + gradod}
                </p>
              ) : (
                <div className="row card-text">
                  <div className="col">
                    <label>Lente Derecho</label>
                    <br /> {code + gradod}
                  </div>
                  <div className="col">
                    <label>Lente Izquierdo</label>
                    <br /> {code + gradoi}
                  </div>
                </div>
              )}
              {this.props.update ? (
                <p className="card-text text-right">
                  <button
                    className="btn btn-outline-info btn-sm card-link mt-2"
                    onClick={this.handleClickCategory}
                  >
                    Cambiar
                  </button>
                </p>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>
    );
  }

  getCodeCategory = (code) => {
    switch (code) {
      case "monofocales":
        return "MF";
      case "bifocales":
        return "BF";
      case "progresivo basico":
        return "PB";
      case "progresivo digital":
        return "PD";
      case "plastico":
        return "CR";
      case "policarbonato":
        return "PL";
      case "hi-index":
        return "HI";
      case "antirreflejantes":
        return "AR";
      case "photo":
        return "PH";
      case "ar & photo":
        return "ARPH";
      case "blanco":
        return "BL";
      default:
        return "";
    }
  };
  handleCodeName = (category) => {
    let code = "";
    if (category.depende_de) {
      if (category.depende_de.depende_de) {
        code = this.getCodeCategory(category.depende_de.depende_de.categoria);
        code += this.getCodeCategory(category.depende_de.categoria);
        code += this.getCodeCategory(category.categoria);
      } else {
        code = this.getCodeCategory(category.depende_de.categoria);
        code += this.getCodeCategory(category.categoria);
      }
    } else {
      code = this.getCodeCategory(category.categoria);
    }
    return code;
  };
  handleClickCategory = (e) => {
    e.preventDefault();
    const { onChangeInput, nameCategory } = this.props;
    this.setState({
      category_id: 0,
      category_id_2: 0,
      category_id_3: 0,
      category_list_2: [],
      category_list_3: [],
    });
    onChangeInput({
      [nameCategory]: 0,
    });
  };
  handleCategoryChange = (e, gradod, gradoi) => {
    const { name, value } = e.target,
      { onChangeInput, nameCategory } = this.props;

    if (name === "category_id") {
      if (value) {
        this.state.category_list.map((cat) => {
          if (cat.id === value * 1) {
            this.setState({
              category_list_2: cat.hijos,
            });
          }
          return null;
        });
      }
    }
    if (name === "category_id_2") {
      if (value) {
        this.state.category_list_2.map((cat) => {
          if (cat.id === value * 1) {
            this.setState({
              category_list_3: cat.hijos,
            });
          }
          return null;
        });
      }
    }

    this.setState({
      [name]: parseInt(value),
    });

    if (name === "category_id_3") {
      onChangeInput({
        [nameCategory]: parseInt(value),
      });
    }
  };
  getCategories = () => {
    //Variables
    const { host, token } = this.props.data,
      { category_id } = this.props;

    if (category_id) {
      console.log("Descargando categoria para recomendacion");
      fetch("http://" + host + "/api/categories/" + category_id, {
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
            console.log("Recomendacion descargada");
            this.setState({
              category: cat.data,
            });
          }
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
      console.log("Descargando lista de recomendaciones raiz");
      fetch("http://" + host + "/api/categories/1?categoryid=raiz", {
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
            console.log("Lista de recomendaciones descargadas");
            this.setState({
              category_list: cat.data.hijos,
              meta: cat.meta,
            });
          }
        })
        .catch((e) => {
          console.error("Orus: " + e);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
        });
    }
  };
}
