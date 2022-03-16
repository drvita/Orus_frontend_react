import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import action from "../helpers";
import { categoryActions } from "../../../redux/category";

import { getUrl, api } from "../../../redux/sagas/api";

class RecomendationGlassComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_list: [],
      category_list_2: [],
      category_list_3: [],
      category_id_1: 0,
      category_id_2: 0,
      category_id_3: 0,
      category: {},
      codesItems: {},
    };
  }

  componentDidMount() {
    const { category_id, categories, _getList } = this.props;

    if (categories.length) {
      this.setState({
        category_list: categories[0].sons,
      });
    } else {
      _getList({
        categoryid: "raiz",
        search: "lentes",
        order: "id",
      });
    }

    if (category_id) {
      this.getCategory(category_id);
    }
  }
  componentDidUpdate(props, state) {
    const {
        category_id,
        esferaod,
        esferaoi,
        cilindrod,
        cilindroi,
        categories,
      } = this.props,
      { category: category_state } = this.state;

    if (props.categories !== categories && categories.length) {
      this.setState({
        category_list: categories[0].sons,
      });
    }

    if (props.category_id !== category_id && category_id) {
      this.getCategory(category_id);
    }

    if (state.category.id !== category_state.id && category_state.id) {
      const data = action.getCodeGrad(
        category_state,
        esferaod,
        esferaoi,
        cilindrod,
        cilindroi
      );

      this.setState({
        category: category_state,
        codesItems: data,
      });
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
      {
        codesItems,
        category_id_1,
        category_id_2,
        category_id_3,
        category_list_2,
        category_list_3,
        category_list,
      } = this.state;

    return (
      <div className="card border border-info rounded d-print-none">
        <div className="card-body">
          <h3 className="card-title text-success m-2">{title}</h3>
          {!category_id ? (
            <Fragment>
              {category_list.length ? (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Tipo</span>
                  </div>
                  <select
                    name="category_id_1"
                    className="custom-select"
                    value={category_id_1 ?? ""}
                    onChange={this.handleCategoryChange}
                  >
                    <option value="0">-- Seleccione el tipo --</option>
                    {category_list.map((cat) => {
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
                            {cat.name}
                          </option>
                        );
                      } else return null;
                    })}
                  </select>
                </div>
              ) : null}

              {category_id_1 && category_list_2.length ? (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Material</span>
                  </div>
                  <select
                    name="category_id_2"
                    className="custom-select"
                    value={category_id_2}
                    onChange={this.handleCategoryChange}
                  >
                    <option value="0">-- Seleccione el material --</option>
                    {category_list_2.map((cat) => {
                      if (
                        cat.meta &&
                        cat.meta.rangoInf <= esferaod &&
                        esferaod <= cat.meta.rangoSup &&
                        cat.meta.rangoInf <= esferaoi &&
                        esferaoi <= cat.meta.rangoSup
                      ) {
                        return (
                          <option value={cat.id} key={cat.id}>
                            {cat.name}
                          </option>
                        );
                      } else return false;
                    })}
                  </select>
                </div>
              ) : null}

              {category_id_1 && category_id_2 && category_list_3.length ? (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Tratamiento</span>
                  </div>
                  <select
                    name="category_id_3"
                    className="custom-select"
                    value={category_id_3}
                    onChange={this.handleCategoryChange}
                  >
                    <option value="0">-- Seleccione el tratamiento --</option>
                    {category_list_3.map((cat) => {
                      return (
                        <option value={cat.id} key={cat.id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
            </Fragment>
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

  getCategory = async (id) => {
    if (id) {
      const url = getUrl("categories", id);
      console.log("url", url);

      const { data, message } = await api(url);

      if (data) {
        console.log("NEW DATA", data);
        this.setState({
          category: data,
        });
      } else {
        console.log("NEW ERROR", message);
      }
    }

    return {};
  };

  handleClickCategory = (e) => {
    e.preventDefault();
    const { onChangeInput, nameCategory } = this.props;
    this.setState({
      category_id_1: 0,
      category_id_2: 0,
      category_id_3: 0,
      category_list_2: [],
      category_list_3: [],
      codesItems: {},
      category: {},
    });
    onChangeInput({
      [nameCategory]: null,
    });
  };

  handleCategoryChange = (e) => {
    const { name, value } = e.target,
      { onChangeInput: _onChangeInput, nameCategory } = this.props,
      { category_list } = this.state;

    switch (name) {
      case "category_id_1":
        for (const key in category_list) {
          if (category_list[key].id === parseInt(value)) {
            this.setState({
              category_id_1: parseInt(value),
              category_id_3: 0,
              category_list_2: category_list[key].sons,
              category_list_3: [],
            });
            break;
          }
        }
        break;
      case "category_id_2":
        if (value) {
          this.state.category_list_2.map((cat) => {
            if (cat.id === value * 1) {
              this.setState({
                category_id_2: parseInt(value),
                category_list_3: cat.sons,
              });
            }
            return null;
          });
        }
        break;
      case "category_id_3":
        _onChangeInput({
          [nameCategory]: parseInt(value),
        });
        break;

      default:
        this.setState({
          [name]: parseInt(value),
        });
        break;
    }
  };
  //getCategories = () => {};
}

const mapStateToProps = ({ category }) => {
    return {
      categories: category.list,
    };
  },
  mapActionsToProps = {
    _getList: categoryActions.getListCategories,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RecomendationGlassComponent);
