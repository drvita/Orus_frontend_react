import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catData_1: [],
      catData_2: [],
      catData_3: [],
      catid_1: 0,
      catid_2: 0,
      catid_3: 0,
      load: false,
      items: [],
      meta: {},
    };
  }
  componentDidMount() {
    this.getCategories();
  }
  componentDidUpdate(props, state) {
    if (state.catid_3 !== this.state.catid_3) {
      this.getItems(this.state.catid_3);
    }
  }

  render() {
    const {
      catid_1,
      catData_1,
      catid_2,
      catData_2,
      catid_3,
      catData_3,
      load,
      items,
      meta,
    } = this.state;
    let header = [],
      body = [],
      i = 0;

    do {
      header.push(<th key={i}>{i.toFixed(2)}</th>);
      i = i - 0.25;
    } while (i > parseFloat(meta.cil) - 0.25);

    i = parseFloat(meta.rangoInf);
    do {
      if (i === 0)
        body.push(
          <td>
            <label>0.00</label>
          </td>
        );
      else body.push(<td>{i.toFixed(2)}</td>);
      i = i + 0.25;
    } while (i < parseFloat(meta.rangoSup) + 0.25);

    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <select
                    className="custom-select"
                    name="catid_1"
                    value={catid_1}
                    onChange={this.handleClickCat}
                  >
                    <option value="0">Seleccione un tipo</option>
                    {catData_1.map((cat) => {
                      return (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoria}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {catid_1 && catData_2.length ? (
                  <div className="col">
                    <select
                      className="custom-select"
                      name="catid_2"
                      value={catid_2}
                      onChange={this.handleClickCat}
                    >
                      <option value="0">Seleccione un material</option>
                      {catData_2.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.categoria}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}

                {catid_2 && catData_3.length ? (
                  <div className="col">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      {catData_3.map((cat) => {
                        return (
                          <button
                            key={cat.id}
                            className={
                              catid_3 === cat.id
                                ? "btn btn-primary"
                                : "btn btn-secondary"
                            }
                            onClick={(e) => {
                              this.setState({
                                catid_3: cat.id,
                                load: true,
                              });
                            }}
                          >
                            {cat.categoria}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="card-body">
              {catid_3 ? (
                <React.Fragment>
                  {load ? (
                    <div className="text-center">
                      <span className="text-primary">Cargando productos</span>
                      <div
                        className="spinner-border text-primary ml-4"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <React.Fragment>
                      <div className="text-center">
                        Productos: {items.length}
                      </div>
                      <div className="table-responsive">
                        <table className="table table-sm table-bordered table-hover">
                          <thead>
                            <tr>
                              <th>/</th>
                              {header}
                            </tr>
                          </thead>
                          <tbody>
                            {body.map((row, i) => {
                              const zero =
                                row.props.children.type === "label"
                                  ? true
                                  : false;
                              return (
                                <tr
                                  className={zero ? "table-secondary" : ""}
                                  key={i}
                                >
                                  {row}
                                  {header.map((h, i) => {
                                    let grad = zero
                                      ? parseFloat(
                                          row.props.children.props.children
                                        )
                                          .toFixed(2)
                                          .replace(".", "")
                                      : parseFloat(row.props.children)
                                          .toFixed(2)
                                          .replace(".", "");
                                    if (parseInt(grad) >= 0) grad = "+" + grad;
                                    grad += parseFloat(h.props.children)
                                      .toFixed(2)
                                      .replace(/[-.]/g, "");

                                    //console.log("G", grad);
                                    return (
                                      <td key={i} className="text-center">
                                        {items.length ? (
                                          items.map((item) => {
                                            //console.log("comp: ");
                                            return grad === item.graduacion ? (
                                              <React.Fragment>
                                                {item.cantidades ? (
                                                  <span
                                                    key={item.id}
                                                    className={
                                                      item.cantidades > 0
                                                        ? "badge badge-success"
                                                        : "badge badge-danger"
                                                    }
                                                  >
                                                    <Link
                                                      to={
                                                        "/almacen/registro/" +
                                                        item.id
                                                      }
                                                      className="text-light"
                                                    >
                                                      {item.cantidades}
                                                    </Link>
                                                  </span>
                                                ) : null}
                                              </React.Fragment>
                                            ) : null;
                                          })
                                        ) : (
                                          <Link to="/almacen/registro">
                                            <i className="fas fa-plus text-secondary"></i>
                                          </Link>
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <div className="alert alert-warning text-light" role="alert">
                  <h4 className="alert-heading">
                    <i className="fas fa-exclamation"></i> Seleccion.
                  </h4>
                  <hr />
                  <ul>
                    {!catid_1 ? (
                      <li>Selecciones primero el tipo de lente</li>
                    ) : null}
                    {!catid_2 ? <li>Despues el material</li> : null}
                    <li>Por ultimo el tratamiento</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getItems = (catid) => {
    //Variables en localStorage
    const { data } = this.props,
      { load } = this.state,
      url = "http://" + data.host + "/api/store?cat=" + catid;

    //Cargando
    if (!load) {
      this.setState({
        load: true,
      });
    }
    //Categories main
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        console.log("Descarga de producto exitosa");
        this.setState({
          items: res.data && res.data.length ? res.data : [],
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
        this.setState({
          load: false,
        });
      });
  };
  handleClickCat = (e) => {
    const { name, value } = e.target,
      { catData_1, catData_2 } = this.state;
    let sons = [],
      meta = {};

    if (name === "catid_1") {
      catData_1.map((cat) => {
        if (cat.id === parseInt(value)) {
          sons = cat.hijos;
          meta = cat.meta;
          return true;
        } else return false;
      });
      //console.log("Meta: ", meta);

      this.setState({
        catid_1: parseInt(value),
        catid_2: 0,
        catid_3: 0,
        catData_2: sons,
        catData_3: [],
        meta,
      });
    } else if (name === "catid_2") {
      catData_2.map((cat) => {
        if (cat.id === parseInt(value)) {
          sons = cat.hijos;
          return true;
        } else return false;
      });

      this.setState({
        catid_2: parseInt(value),
        catid_3: 0,
        catData_3: sons,
      });
    }
  };
  getCategories = () => {
    //Variables en localStorage
    const { data } = this.props,
      url = "http://" + data.host + "/api/categories/1";

    //Categories main
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((cat) => {
        if (cat.data && cat.data.hijos.length) {
          console.log("Descarga de categoria exitos");
          this.setState({
            catData_1: cat.data.hijos,
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
  };
}
