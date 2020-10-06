import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ActionsTable extends Component {
  render() {
    const { id } = this.props;
    return (
      <td className="text-right">
        {this.props.delete ? (
          <a
            className="btn-flat text-dark mr-4"
            href="#delete"
            onClick={(e) => {
              e.preventDefault();
              this.handleDelete(id);
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
        ) : (
          ""
        )}
        {this.props.edit ? (
          <Link className="btn-flat text-dark" to={"/usuarios/registro/" + id}>
            <i className="fas fa-pencil-alt"></i>
          </Link>
        ) : (
          ""
        )}
      </td>
    );
  }

  handleDelete = (id) => {
    this.props.delete(id);
  };
}
