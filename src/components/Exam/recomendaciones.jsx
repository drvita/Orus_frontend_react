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
    const { category_id, title } = this.props,
      { category } = this.state,
      slash = <span className="text-dark"> / </span>;
    let nameFullCategory = null;

    if (category.depende_de) {
      if (category.depende_de.depende_de) {
        nameFullCategory = (
          <React.Fragment>
            {category.depende_de.depende_de.categoria}
            {slash}
            {category.depende_de.categoria}
            {slash}
            <strong>{category.categoria}</strong>
          </React.Fragment>
        );
      } else {
        nameFullCategory = (
          <React.Fragment>
            {category.depende_de.categoria}
            {slash}
            <strong>{category.categoria}</strong>
          </React.Fragment>
        );
      }
    } else {
      nameFullCategory = <strong>{category.categoria}</strong>;
    }

    return (
      <div className="card card-info card-outline mt-4">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-thumbs-up mr-1"></i>
            {title}
          </h3>
        </div>
        <div className="card-body">
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
                ) : null}
              </Fragment>
            ) : (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )
          ) : (
            <Fragment>
              <h5 className="card-title text-info">{nameFullCategory}</h5>
              {this.props.update ? (
                <p className="card-text">
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
    onChangeInput(nameCategory, 0);
  };
  handleCategoryChange = (e) => {
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
      [name]: value * 1,
    });

    if (name === "category_id_3") {
      onChangeInput(nameCategory, value * 1);
    }
  };
  getCategories = () => {
    //Variables
    let { host, token } = this.props.data;

    if (
      typeof this.props.category_id === "number" &&
      this.props.category_id > 0
    ) {
      console.log("Descargando recomendacion");
      fetch("http://" + host + "/api/categories/" + this.props.category_id, {
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
      console.log("Descargando lista de recomendaciones");
      fetch("http://" + host + "/api/categories/1?categoryid=raiz", {
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
