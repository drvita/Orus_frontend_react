import React, { Component } from "react";

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
    return (
      <div className="card card-info card-outline mt-4">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-thumbs-up mr-1"></i>
            Recomendaciones
          </h3>
        </div>
        <div className="card-body">
          {!this.props.category_id ? (
            this.state.category_list.length ? (
              <React.Fragment>
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
                ) : (
                  ""
                )}

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
                ) : (
                  ""
                )}

                {this.state.category_list_3.length ? (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Tratamiento</span>
                    </div>
                    <select
                      name="category_id_3"
                      className="custom-select"
                      value={this.state.category_id_3}
                      onChange={this.handleCategoryChange}
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
                ) : (
                  ""
                )}
              </React.Fragment>
            ) : (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )
          ) : (
            <React.Fragment>
              <h5 className="card-title">
                {this.state.category.depende_de
                  ? this.state.category.depende_de.depende_de
                    ? this.state.category.depende_de.depende_de.categoria +
                      "/" +
                      this.state.category.depende_de.categoria +
                      "/"
                    : this.state.category.depende_de.categoria + "/"
                  : ""}
                {this.state.category.categoria}
              </h5>
              {this.props.update ? (
                <p className="card-text">
                  <button
                    className="btn btn-outline-info btn-sm card-link mt-2"
                    onClick={this.handleClickCategory}
                  >
                    Cambiar
                  </button>
                </p>
              ) : (
                ""
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }

  handleClickCategory = (e) => {
    e.preventDefault();
    this.setState({
      category_id: 0,
      category_id_2: 0,
      category_id_3: 0,
      category_list_2: [],
      category_list_3: [],
    });
    this.props.onChangeInput("category_id", 0);
  };
  handleCategoryChange = (e) => {
    const { name, value } = e.target;
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
      [name]: value * 1,
    });

    if (name === "category_id_3") {
      this.props.onChangeInput("category_id", value * 1);
    }
  };
  getCategories = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + varLocalStorage.host + "/api/categories/1",
      categoryid = "?categoryid=raiz";

    if (
      typeof this.props.category_id === "number" &&
      this.props.category_id > 0
    ) {
      console.log("Descargando recomendacion");
      url =
        "http://" +
        varLocalStorage.host +
        "/api/categories/" +
        this.props.category_id;
      fetch(url, {
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
            console.log("Error: ", res);
          }
          return res.json();
        })
        .then((cat) => {
          if (cat.data) {
            console.log("Recomendacion descargada");
            this.setState({
              category: cat.data,
            });
          }
        });
    } else {
      console.log("Descargando lista de recomendaciones");
      fetch(url + categoryid, {
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
            console.log("Error: ", res);
          }
          return res.json();
        })
        .then((cat) => {
          if (cat.data) {
            console.log("Lista de recomendaciones descargadas");
            this.setState({
              category_list: cat.data.hijos,
              meta: cat.meta,
            });
          }
        });
    }
  };
}
