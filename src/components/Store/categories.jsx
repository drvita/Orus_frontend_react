import React, { Component } from "react";
import Catalogo from "./data/Category_list";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      category_id1: 0,
      category_hijos1: [],
      category_id2: 0,
      category_hijos2: [],
      category_id3: 0,
      category_hijos3: [],
      category_id4: 0,
      category_hijos4: [],
    };
  }

  render() {
    const {
      category_id1,
      category_hijos1,
      category_id2,
      category_hijos2,
      category_id3,
      category_hijos3,
    } = this.state;

    return (
      <React.Fragment>
        <h5>Categorias de productos</h5>
        <div className="row">
          <div className="col">
            <Catalogo
              category={0}
              categoryName="category_id1"
              categoryDataName="category_hijos1"
              categorySelect={this.handleChangeState}
            />
          </div>
          {category_id1 && category_hijos1.length ? (
            <div className="col">
              <Catalogo
                category={category_id1}
                CategoryData={category_hijos1}
                categoryName="category_id2"
                categoryDataName="category_hijos2"
                categorySelect={this.handleChangeState}
                last={category_id1 === 2 ? true : false}
              />
            </div>
          ) : null}
          {category_id2 && category_hijos2.length ? (
            <div className="col">
              <Catalogo
                category={category_id2}
                CategoryData={category_hijos2}
                categoryName="category_id3"
                categoryDataName="category_hijos3"
                categorySelect={this.handleChangeState}
              />
            </div>
          ) : null}
          {category_id3 && category_hijos3.length ? (
            <div className="col">
              <Catalogo
                category={category_id3}
                CategoryData={category_hijos3}
                categoryName="category_id4"
                categoryDataName="category_hijos4"
                categorySelect={this.handleChangeState}
                last={true}
              />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }

  handleChangeState = (data) => {
    if (data.category_id1 !== undefined && data.category_id1) {
      data.category_id2 = 0;
      data.category_id3 = 0;
      data.category_id4 = 0;
    } else if (data.category_id2 !== undefined && data.category_id2) {
      data.category_id3 = 0;
      data.category_id4 = 0;
    } else if (data.category_id3 !== undefined && data.category_id3) {
      data.category_id4 = 0;
    }
    this.setState(data);
  };
}
