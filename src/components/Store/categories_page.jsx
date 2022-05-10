import React, { Component } from "react";
import { connect } from "react-redux";
import Catalogo from "./data/Category_list";
//Actions
import { categoryActions } from "../../redux/category/index";

class CategoriesStoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      category_data: [],
    };
  }
  componentDidMount() {
    this.handleLoadCategories();
  }

  componentDidUpdate(props) {
    const { categories = [] } = this.props;

    if (props.categories !== categories && categories.length) {
      this.setState({
        category_data: categories,
      });
    }
  }

  render() {
    const { category_id, category_data } = this.state;
    let category_view_sons = category_data,
      category_current = {};

    if (category_id) {
      const category_cache = category_data.filter(
        (cat) => cat.id === category_id
      );

      if (category_cache.length) {
        category_current = category_cache[0];
        if (category_current && category_current.sons) {
          category_view_sons = category_current.sons;
        }
      }
    }

    //console.log("[DEBUG] Render main", category_data);

    return (
      <div className="row">
        <div className="col-8">
          <nav>
            <ol className="breadcrumb">
              {category_id ? (
                <>
                  <li className="breadcrumb-item active" aria-current="page">
                    <a href="#link" onClick={this.handleClickParent}>
                      Raiz
                    </a>
                  </li>
                  {category_current.id ? (
                    <li className="breadcrumb-item active" aria-current="page">
                      {category_current.name}
                    </li>
                  ) : null}
                </>
              ) : (
                <li className="breadcrumb-item active" aria-current="page">
                  Seleccione una categoria para ver su contenido
                </li>
              )}
            </ol>
          </nav>

          <Catalogo
            category={category_id}
            categoryData={category_view_sons ?? []}
            categorySelect={this.handleChangeState}
          />
        </div>
      </div>
    );
  }

  handleClickParent = (e) => {
    const { categories = [] } = this.props;
    if (e) e.preventDefault();

    this.setState({
      category_data: categories,
      category_id: null,
    });
  };
  handleLoadCategories = () => {
    const { _getListCategories } = this.props;

    _getListCategories({
      categoryid: "raiz",
    });
  };
  handleChangeState = (data) => {
    this.setState(data);
  };
}

const mapStateToProps = ({ category }) => {
    return {
      categories: category.list,
      loading: category.loading,
    };
  },
  mapActionsToProps = {
    _getListCategories: categoryActions.getListCategories,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CategoriesStoreComponent);
