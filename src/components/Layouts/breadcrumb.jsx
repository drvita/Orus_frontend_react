import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("LLLL"),
    };
    setInterval(() => {
      console.log("Actualizando hora de sistema");
      this.setState({
        date: moment().format("LLLL"),
      });
    }, 60000);
  }
  render() {
    const { title } = this.props;
    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <h1 className="m-0 text-dark text-capitalize">{title}</h1>
            </div>
            <div className="col">
              <h6 className="text-dark text-right">{this.state.date}</h6>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
