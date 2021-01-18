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
    const { title } = this.props;
    const { date } = this.state;
    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <h1 className="m-0 text-dark text-capitalize">{title}</h1>
            </div>
            <div className="col">
              <h6 className="text-dark text-right">{date}</h6>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
