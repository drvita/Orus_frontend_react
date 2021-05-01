import React, { Component, Fragment } from "react";
//import Codestring from "../Layouts/codeLentString";

export default class Recomendaciones extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      category_list: [],
      meta: {},
      category_list_2: [],
      category_list_3: [],
      category_id: 0,
      category_id_2: 0,
      category_id_3: 0,
      category: [],
      codesItems: {},
      host: ls.host,
      token: ls.token,
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
      console.log("[Recomendaciones] Recargando recomendacion");
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
        handleCodesItems,
      } = this.props,
      { codesItems } = this.state;

    return (
      <div className="card border border-info rounded d-print-none">
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
                        if (
                          cat.meta &&
                          cat.meta.rangoInf <= esferaod &&
                          esferaod <= cat.meta.rangoSup &&
                          cat.meta.rangoInf <= esferaoi &&
                          esferaoi <= cat.meta.rangoSup &&
                          cat.meta.cil <= cilindrod &&
                          cat.meta.cil <= cilindroi
                        ) {
                          return (
                            <option value={cat.id} key={cat.id}>
                              {cat.categoria}
                            </option>
                          );
                        } else return false;
                      })}
                    </select>
                  </div>
                ) : null}

                {this.state.category_id && this.state.category_list_2.length ? (
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
                        if (
                          cat.meta &&
                          cat.meta.rangoInf <= esferaod &&
                          esferaod <= cat.meta.rangoSup &&
                          cat.meta.rangoInf <= esferaoi &&
                          esferaoi <= cat.meta.rangoSup
                        ) {
                          return (
                            <option value={cat.id} key={cat.id}>
                              {cat.categoria}
                            </option>
                          );
                        } else return false;
                      })}
                    </select>
                  </div>
                ) : null}

                {this.state.category_id &&
                this.state.category_id_2 &&
                this.state.category_list_3.length ? (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Tratamiento</span>
                    </div>
                    <select
                      name="category_id_3"
                      className="custom-select"
                      value={this.state.category_id_3}
                      onChange={(e) => {
                        this.handleCategoryChange(
                          e,
                          codesItems.od,
                          codesItems.oi
                        );
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
              {codesItems.code + codesItems.od ===
              codesItems.code + codesItems.oi ? (
                <p className="card-text">
                  <label>Lente</label>: {codesItems.code + codesItems.od}
                </p>
              ) : (
                <div className="row card-text">
                  <div className="col">
                    <label>Lente Derecho</label>
                    <br /> {codesItems.code + codesItems.od}
                  </div>
                  <div className="col">
                    <label>Lente Izquierdo</label>
                    <br /> {codesItems.code + codesItems.oi}
                  </div>
                </div>
              )}
              {handleCodesItems ? (
                <p className="card-text text-right">
                  <button
                    className="btn btn-info"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCodesItems({
                        code: codesItems.code,
                        od: codesItems.od,
                        oi: codesItems.oi,
                      });
                    }}
                  >
                    <i className="fas fa-check mr-2"></i>Siguiente
                  </button>
                </p>
              ) : null}
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

  handleCodeName = (category) => {
    let code = "";
    if (category.depende_de) {
      if (category.depende_de.depende_de) {
        code = category.depende_de.depende_de.meta.code;
        code += category.depende_de.meta.code;
        code += category.meta.code;
      } else {
        code = category.depende_de.meta.code;
        code += category.meta.code;
      }
    } else {
      code = category.meta.code;
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
          if (cat.id === parseInt(value)) {
            this.setState({
              category_id_3: 0,
              category_list_2: cat.hijos,
              category_list_3: [],
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
    const { host, token } = this.state,
      { category_id } = this.props;

    //console.log("Tipo de descarga", nameCategory, category_id);
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
            const {
                category_id,
                esferaod,
                esferaoi,
                cilindrod,
                cilindroi,
              } = this.props,
              category = cat.data;
            let code =
                category_id && Object.keys(category).length
                  ? this.handleCodeName(category)
                  : "XX",
              gradod = "+000000",
              gradoi = "+000000";

            if (cilindrod || esferaod) {
              gradod = esferaod > 0 ? "+" : "";
              gradod +=
                esferaod.toFixed(2).toString().replace(".", "") +
                cilindrod
                  .toFixed(2)
                  .toString()
                  .replace("-", "")
                  .replace(".", "");
            }
            if (cilindroi || esferaoi) {
              gradoi = esferaoi > 0 ? "+" : "";
              gradoi +=
                esferaoi.toFixed(2).toString().replace(".", "") +
                cilindroi
                  .toFixed(2)
                  .toString()
                  .replace("-", "")
                  .replace(".", "");
            }
            //console.log("[DEBUG FETCH] ", code, gradod, gradoi);
            this.setState({
              category: cat.data,
              category_id,
              codesItems: {
                code,
                od: gradod,
                oi: gradoi,
              },
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
      fetch("http://" + host + "/api/categories/1", {
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
              category_id: 0,
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
