import React, { Component } from "react";
import moment from "moment";

export default class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("LLLL"),
    };
    setInterval(() => {
      console.log("[ORUS] Actualizando hora de sistema");
      this.setState({
        date: moment().format("LLLL"),
      });
    }, 60000);
  }

  render() {
    const { title, host } = this.props,
      { date } = this.state;
    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="m-0 text-dark text-capitalize">
                <i className="fas fa-file mr-1"></i> {title}
              </h1>
            </div>
            <div className="col text-center">
              <span
                className="badge badge-secondary ml-2"
                alt="conectado a"
                title="conectado a"
              >
                <i className="fas fa-server mr-1"></i>
                {host}
              </span>
            </div>
            <div className="col">
              <h6 className="text-muted text-right">
                <i className="fas fa-calendar mr-1"></i> {date}
              </h6>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
