import React, { Component } from "react";
import { connect } from "react-redux";
//Components
import Inbox from "./views/Inbox";
import EditAndNewUser from "./add";
//Actions
import { userActions } from "../../redux/user/index";

class UsersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: "inbox",
    };
  }
  componentDidUpdate(props, state) {
    const { user } = this.props;

    if (props.user !== user && user.id) {
      this.setState({
        panel: "editAndNewUser",
      });
    }
    if (props.user !== user && !user.id) {
      this.setState({
        panel: "inbox",
      });
    }
  }

  render() {
    const { panel } = this.state;
    const { options = {}, meta = { total: 0 } } = this.props;

    return (
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <a
            href="#new"
            className={
              panel !== "inbox"
                ? "disabled mb-3 btn btn-secondary btn-block"
                : "mb-3 btn btn-primary btn-block"
            }
            onClick={(e) => {
              e.preventDefault();
              this.handleShowPanel("editAndNewUser");
            }}
            disabled={panel !== "inbox" ? true : false}
          >
            <i className="mr-2 fas fa-plus"></i>
            Usuario nuevo
          </a>

          {panel === "inbox" ? (
            <div className="card">
              <div className="card-header">
                <h5 className="card-title text-dark">
                  <i className="mr-2 fas fa-ellipsis-v"></i>Filtros
                </h5>
              </div>
              <div className="p-0 card-body">
                <ul className="nav nav-pills flex-column">
                  <li className="nav-item p-2">
                    <label htmlFor="orderby">Ordenar por</label>
                    <select
                      className="form-control "
                      name="orderby"
                      id="orderby"
                      value={options.orderby}
                      onChange={({ target }) =>
                        this.handleSetSelectOptions(target)
                      }
                    >
                      <option value="created_at">Fecha de registro</option>
                      <option value="updated_at">Fecha de modificacion</option>
                    </select>
                  </li>
                  <li className="nav-item p-2">
                    <label htmlFor="order">Mostrar por</label>
                    <select
                      className="form-control "
                      name="order"
                      id="order"
                      value={options.order}
                      onChange={({ target }) =>
                        this.handleSetSelectOptions(target)
                      }
                    >
                      <option value="asc">Antiguos</option>
                      <option value="desc">Recientes</option>
                    </select>
                  </li>

                  <li className="nav-item p-2">
                    <label htmlFor="itemsPage">Numero de usuarios</label>
                    <select
                      className="form-control "
                      name="itemsPage"
                      id="itemsPage"
                      value={options.itemsPage}
                      onChange={({ target }) =>
                        this.handleSetSelectOptions(target)
                      }
                    >
                      <option value="10">ver 10</option>
                      {meta.total > 10 && (
                        <>
                          <option value="20">ver 20</option>
                          <option value="50">ver 50</option>
                          <option value="100">ver 100</option>
                        </>
                      )}
                    </select>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-md-10 col-sm-12">
          {panel === "inbox" && <Inbox />}
          {panel === "editAndNewUser" && <EditAndNewUser />}
        </div>
      </div>
    );
  }

  handleShowPanel = (panel) => {
    this.setState({
      panel,
    });
  };
  handleSetSelectOptions = ({ name, value }) => {
    const { _setOptions } = this.props;
    _setOptions({
      key: name,
      value,
    });
  };
}

const mapStateToProps = ({ users }) => {
    return {
      loading: users.loading,
      options: users.options,
      meta: users.meta,
      user: users.user,
    };
  },
  mapActionsToProps = {
    _setOptions: userActions.setOptions,
  };

export default connect(mapStateToProps, mapActionsToProps)(UsersComponent);
