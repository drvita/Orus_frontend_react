import React, { Component } from "react";
import Notify from "./notify";

export default class Navtop extends Component {
  render() {
    const { logOut, data, page } = this.props;
    return (
      <nav className="main-header navbar navbar-expand navbar-dark navbar-lightblue">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#end"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                window.$("#body").toggleClass("sidebar-open");
                window.$("#body").toggleClass("sidebar-collapse");
              }}
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a href="#end" className="nav-link" data-toggle="dropdown">
              <i className="far fa-comments"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-header">Sin comentarios</span>
              <div className="dropdown-divider"></div>
            </div>
          </li>
          <Notify logOut={logOut} data={data} page={page} />
        </ul>
      </nav>
    );
  }
}
