import React, { Component } from "react";

export default class Navtop extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-dark navbar-lightblue">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#end"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a href="#end" className="nav-link" data-toggle="dropdown">
              <i className="far fa-comments"></i>
              <span className="badge badge-danger navbar-badge">0</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#end" className="dropdown-item">
                <div className="media">
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star"></i>
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1"></i> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#end" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#end">
              <i className="far fa-bell"></i>
              <span className="badge badge-warning navbar-badge">0</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#end" className="dropdown-item">
                <i className="fas fa-file mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#end" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
