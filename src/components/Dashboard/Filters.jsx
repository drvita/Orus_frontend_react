import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl, api } from '../../redux/sagas/api';
import actions from '../../redux/config/actions';

class Filters extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    const { user, date_start, date_end, branch_id } = props.filters;

    this.state = {
      host: ls.host,
      token: ls.token,

      branch_id: branch_id,
      date_start: date_start,
      date_end: date_end,
      currentUser: user,

      branches: [], 
      users: [],
    };
    
    this.controller = new AbortController();
  }

  componentWillUnmount() {  
    this.controller.abort();
  }

  componentDidMount() {
    this.getUsers();
    this.getBranches();
  }


  componentDidUpdate(props) {
    if (!props.branches.length && this.props.branches.length) {
      this.setState({
        branches: this.props.branches,
      });
    }
  }

  sendDatFilter = () => {
    const { branch_id, currentUser, date_start, date_end } = this.state;

    this.props.changeState({
      branch_id,
      user: currentUser,
      date_start,
      date_end,
    });
  };

  render() {
    const { users, branch_id, currentUser, date_start, date_end } = this.state;

    return (
      <div className="border-bottom pb-3 mb-4">

        <div className="card-body p-0 bg-light">
          <div className="form-group row col-lg-12 m-0">

            <div className="col-lg-1 mt-sm-3 ml-sm-3">
              <p className="mt-2 font-weight-bold text-secondary h5">Filtros</p>
            </div>

            <div className="col-lg-2 mt-sm-3">
              <div className="col-lg-12">
                <select
                  name="branch_id"
                  className="form-control text-capitalize"
                  value={branch_id}
                  onChange={this.changeState}
                >
                  <option value="">
                    {branch_id === "" ? "Sucursal" : "Todas"}
                  </option>
                  {this.state.branches.map((branch) => {
                    return (
                      <option key={branch.id} value={branch.id}>
                        {branch.values.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-lg-2 mt-sm-3">
              <div className="col-lg-12">
                <select
                  name="currentUser"
                  className="form-control text-capitalize"
                  value={currentUser}
                  onChange={this.changeState}
                >
                  <option value="">
                    {currentUser === "" ? "Usuarios" : "Todos"}
                  </option>
                  {users.map((user)=>{
                    if(!branch_id){
                      return(
                        <option key={user.id} value={user.id}>{user.name}</option>
                      )
                    } else {
                      return(
                        user.branch.id.toString() === branch_id ? <option key={user.id} value={user.id}>{user.name}</option> : null
                      )
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="row mt-sm-3 m-0 ml-sm-2">
              <label className="col-lg-1 col-form-label p-0 ml-5 mt-2 ml-sm-3">
                De:
              </label>
              <div className="col-lg-10">
                <input
                  type="date"
                  name="date_start"
                  className="form-control"
                  value={date_start}
                  onChange={this.changeState}
                  placeholder="Periodo"
                />
              </div>
            </div>

            <div className="row mt-sm-3 m-0">
              <label className="col-lg-1 col-form-label p-0 mt-2 ml-sm-3">
                a:
              </label>
              <div className="col-lg-10">
                <input
                  type="date"
                  name="date_end"
                  className="form-control"
                  value={date_end}
                  onChange={this.changeState}
                />
              </div>
            </div>

            <div className="col-lg-2 row mt-sm-3 d-flex justify-content-center m-0 h-50">
              <button
                onClick={this.sendDatFilter}
                className="btn w-50 btn-success font-weight-bold"
              >
                Filtrar
              </button>
            </div>
    
          </div>
        </div>
      </div>
    );
  }

  changeState = (e) => {
    let { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getUsers = async () => {

      const usersFilters = {
        orderby: "username",
        order: "asc",
        rol: 10,
        page: 1
      }

      const newUsersUrl = getUrl("users", null, usersFilters);
      const {data, message} = await api(newUsersUrl, "GET", null, this.controller);

      if(data){
        if(!message){
          this.setState({
          users: data,
        });
        }else{
          console.error("Error en la descarga de usuarios", message);          
        }
      }else {
        window.Swal.fire({
          title: "Error!",
          text: "Ups!\n Hubo un error al descargar usuarios de sistema",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
  };

  getBranches = ()=>{
    this.props._getBranches()
  }

}

const mapStateToProps = ({ config }) => {
    return {
      branches: config.branches,
    };
  },
  
  mapActionsToProps = {
    _getBranches: actions.getBranches
  };

export default connect(mapStateToProps, mapActionsToProps)(Filters);
