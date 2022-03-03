import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

class DateUser extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    
    this.state = {
      host: ls.host,
      token: ls.token,
      users: [],
      sucursal:'',
      usuario:'',
      fechaInicial:moment().format("YYYY-MM-DD"),
      fechaFinal:moment().format("YYYY-MM-DD"),
      branches:[],
      date: moment().format("YYYY-MM-DD"),
      user: !props.data.rol ? 0 : props.data.idUser,
    };

    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate(props, state){
    if(!props.branches.length && this.props.branches.length){
      this.setState({
        branches: this.props.branches,
      });
    }
  }


  sendDatFilter = ()=>{
    this.props.changeState(this.state);
  }

  render() {
    const { users, sucursal, usuario, fechaInicial, fechaFinal } = this.state;
    return (
        <div className="border-bottom pb-3 mb-5">
        
        
        <span className="col-lg-1 ml-3 m-0 p-0 mt-2 pl-2 font-weight-bold text-secondary">Filtros</span>

        <div className="card-body p-0 bg-light">
          <div className="form-group row col-lg-12 m-0">

              <div className="col-lg-2 mt-sm-3">
                <div className="col-lg-12">
                <select
                    name="sucursal"
                    className="form-control"
                    value={sucursal}
                    onChange={this.changeState}
                  >
                     <option value="">Sucursal</option>
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
                    name="usuario"
                    className="form-control"
                    value={usuario}
                    onChange={this.changeState}
                  >
                    <option value="0">Usuario</option>
                    {users.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-3 row mt-sm-3 m-0">                
                <label className="col-lg-1 col-form-label p-0 ml-5 mt-2 ml-sm-3">De:</label>
                <div className="col-lg-7">
                  <input
                    type="date"
                    name="fechaInicial"
                    className="form-control"
                    value={fechaInicial}
                    onChange={this.changeState}
                    placeholder="Periodo"
                  />
                </div>
              </div>

              <div className="col-lg-3 row mt-sm-3 m-0">
                <label className="col-lg-2 col-form-label p-0 mt-2 ml-sm-3">Hasta:</label>
                <div className="col-lg-7">
                  <input
                    type="date"
                    name="fechaFinal"
                    className="form-control"
                    value={fechaFinal}                                                                                          
                    onChange={this.changeState}
                  />
                </div>
              </div>

              <div className="col-lg-2 row mt-sm-3 d-flex justify-content-center m-0">
                <button onClick={this.sendDatFilter} className="btn w-75 btn-success font-weight-bold">Aplicar Filtro</button>   
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


  getUsers = () => {
    let { host, token } = this.state,
      url = "http://" + host + "/api/users",
      orderby = "&orderby=username&order=asc",
      rol = "&rol=10",
      page = "?page=1";

    //Realiza la peticion de los usuarios
    console.log("Descargando usuarios de API");
    fetch(url + page + orderby + rol, {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.Swal.fire({
            title: "Error!",
            text: "Ups!\n Hubo un error al descargar usuarios de sistema",
            icon: "error",
            confirmButtonText: "Ok",
          });
          console.error(res);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.message) {
          console.log("Almacenando usuarios");
          this.setState({
            users: data.data,
          });
        } else {
          console.error("Error en la descarga de usuarios", data.message);
        }
      })
      .catch((e) => {
        if (e.code === 20) {
          console.error("[Orus system] Salida por error:", e.code, e.message);
          return false;
        }

        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
}

const mapStateToProps = ({config }) => {
  return {
    branches: config.list
  };
},

mapActionsToProps = {
 // _setPageName: defaultActions.changeNamePage,
};


export default connect(mapStateToProps, mapActionsToProps)(DateUser)