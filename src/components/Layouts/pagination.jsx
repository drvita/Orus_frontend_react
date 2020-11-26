import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    let { meta } = this.props;
    if (meta.total > 10) {
      return (
        <div className="btn-group">
          <ul className="pagination pagination-sm">
            <li
              className={
                meta.current_page === 1 ? "page-item disabled" : "page-item"
              }
            >
              <a
                className={
                  meta.current_page === 1
                    ? "page-link text-dark"
                    : "page-link text-primary"
                }
                href="#pageBefore"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleChangePage(1);
                }}
              >
                Primero
              </a>
            </li>

            <li
              className={
                meta.current_page === 1 ? "page-item disabled" : "page-item"
              }
            >
              <a
                className={
                  meta.current_page === 1
                    ? "page-link text-dark"
                    : "page-link text-primary"
                }
                href="#pageBefore"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleChangePage(meta.current_page - 1);
                }}
              >
                <i className="fas fa-step-backward"></i>
              </a>
            </li>

            <li className="page-item">
              <span className="page-link">
                {meta.current_page} /{" "}
                {Math.ceil(meta.total / meta.per_page).toFixed(0)}
              </span>
            </li>

            <li
              className={
                meta.current_page === meta.last_page
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className={
                  meta.current_page === meta.last_page
                    ? "page-link text-dark"
                    : "page-link text-primary"
                }
                href="#pageBefore"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleChangePage(meta.current_page + 1);
                }}
              >
                <i className="fas fa-step-forward"></i>
              </a>
            </li>

            <li
              className={
                meta.current_page === meta.last_page
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className={
                  meta.current_page === meta.last_page
                    ? "page-link text-dark"
                    : "page-link text-primary"
                }
                href="#pageBefore"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleChangePage(meta.last_page);
                }}
              >
                Ultimo
              </a>
            </li>
          </ul>
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
