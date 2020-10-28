import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    let { meta } = this.props,
      pages = [];
    if (meta.total > 10) {
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
              className={
                meta.current_page === i
                  ? "page-link text-dark"
                  : "page-link text-primary"
              }
              onClick={(e) => {
                e.preventDefault();
                this.handleChangePage(e.target.innerHTML * 1);
              }}
            >
              {i}
            </a>
          </li>
        );
      }
    }

    if (meta.total > 10) {
      return (
        <div className="btn-group">
          <ul className="pagination pagination-sm">{pages}</ul>
        </div>
      );
    } else {
      return false;
    }
  }

  handleChangePage = (page) => {
    this.props.handleChangePage(page);
  };
}
