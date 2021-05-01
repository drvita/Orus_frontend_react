import React, { Component } from "react";

export default class showItems extends Component {
  render() {
    const { codes } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <span className="text">OD: {codes.code + codes.od}</span>
          <br />
          <span className="text">OI: {codes.code + codes.oi}</span>
        </div>
      </div>
    );
  }
}
