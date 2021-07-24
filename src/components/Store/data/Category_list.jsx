import React, { Component } from "react";
import { connect } from "react-redux";
//Actions
import { categoryActions } from "../../../redux/category/index";
import helper from "../helpers";

class CategoryListComponent extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      id: 0,
      meta: {},
      add: false,
      name: "",
      category_raiz: [],
      category_id: props.category,
      page: 1,
      host: ls.host,
      token: ls.token,
      load: false,
    };
  }

  componentDidMount() {
    const { categoryData = [] } = this.props;

    if (categoryData) {
      this.setState({
        category_raiz: categoryData,
      });
    }
  }
  componentDidUpdate(props) {
    const { categoryData = [], messages: MSGS, _setMessage } = this.props;

    //console.log("[DEBUG] categories update");
    if (props.categoryData !== categoryData) {
      this.setState({
        category_raiz: categoryData,
      });
    }

    if (props.messages.length !== MSGS.length && MSGS.length) {
      MSGS.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
      _setMessage([]);
    }
  }

  render() {
    const { category_raiz, category_id, name, add } = this.state,
      { loading: load } = this.props;

    //console.log("[DEBUG] Categories", category_raiz);

    return (
      <div className="card card-primary card-outline">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th style={{ width: 48 }}></th>
              </tr>
            </thead>
            <tbody>
              {!load && category_raiz ? (
                <React.Fragment>
                  {category_raiz.map((cat) => {
                    return (
                      <tr key={cat.id}>
                        <td className="text-capitalize">
                          <a
                            href={"#select!" + cat.id}
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleSelectCategory(cat);
                            }}
                            className={
                              cat.sons && cat.sons.length
                                ? "text-primary"
                                : "text-dark"
                            }
                          >
                            {cat.categoria}
                          </a>
                        </td>
                        <td className="btn-group">
                          <button
                            type="button"
                            className="btn btn-default"
                            disabled={true}
                            title="Proximamente"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            type="button"
                            title="Eliminar"
                            className={
                              cat.hijos && cat.hijos.length
                                ? "btn btn-outline-secondary btn-sm"
                                : "btn btn-outline-danger btn-sm"
                            }
                            onClick={(e) => {
                              this.handleClickDelete(cat.id, cat.categoria);
                            }}
                            disabled={cat.hijos && cat.hijos.length}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
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
                      className="form-control text-uppercase"
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
                      disabled={name.length < 3}
                      title="Guardar categoria"
                    >
                      <i className="fas fa-save"></i>
                    </button>
                  </td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
        <div className="card-footer text-right">
          <button
            className={
              add
                ? "btn btn-secondary btn-sm text-bold"
                : "btn btn-primary btn-sm"
            }
            onClick={this.handleClickAdd}
            disabled={!category_id}
            title={add ? "Cancelar" : "Crear nueva categoria"}
          >
            {add ? (
              <>
                <i className="fas fa-ban mr-1"></i>
                Cancelar
              </>
            ) : (
              <>
                <i className="fas fa-plus mr-1"></i>
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  handleSelectCategory = (cat) => {
    const { last, categorySelect: _categorySelect } = this.props,
      { category_raiz } = this.state;

    if (last) return false;
    if (!cat.sons || (cat.sons && !cat.sons.length)) return false;

    _categorySelect({
      category_id: cat.id,
      category_data: category_raiz,
    });
    this.setState({
      category_id: cat.id,
    });
  };
  handleClickDelete = (id, name) => {
    if (id) {
      const { _delete } = this.props,
        item = { id },
        options = { categoryid: "raiz" },
        text =
          "Esta seguro de eliminar la categoria: " + name.toUpperCase() + "?";

      helper.handleDeleteItem(item, options, _delete, text);
    }
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

    const { id, category_id, name } = this.state,
      data = {
        name,
        category_id: category_id,
      },
      { _save } = this.props,
      options = { categoryid: "raiz" },
      text = id
        ? "¿Esta seguro de actualizar la categoria?"
        : "¿Esta seguro de crear una nueva categoria?",
      _close = () => {
        this.setState({
          name: "",
          category_id: 0,
          add: false,
        });
      };

    helper.handleSaveItem(id, data, options, _save, _close, text);
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

//export default CategoryListComponent;
const mapStateToProps = ({ category }) => {
    return {
      categories: category.list,
      messages: category.messages,
      loading: category.loading,
    };
  },
  mapActionsToProps = {
    _getList: categoryActions.getListCategories,
    _delete: categoryActions.deleteCategory,
    _setMessage: categoryActions.setMessageCategory,
    _save: categoryActions.saveCategory,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CategoryListComponent);
