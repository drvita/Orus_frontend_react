import { useState, useContext } from "react";
import BranchsList from '../components/Tools/views/Branchs';
import { AuthContext } from "../context/AuthContext";


export default function ToolsComponent(){

  const { auth } = useContext(AuthContext);

  const varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));

  const [state, setState] = useState({
    server: varLocalStorage.host ? varLocalStorage.host : "",
    company:  varLocalStorage.company ? varLocalStorage.company : "",
    email: auth.email ? auth.email : "",
    name: auth.name ? auth.name : "",
    username: auth.username ? auth.username : "",
    password: "",
    category_list: [],
  });

  const clickSave = () => {
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    varLocalStorage.company = state.company;
    localStorage.setItem("OrusSystem", JSON.stringify(varLocalStorage));
  },

  clickSaveUser = () => {

    //TODO: Ejecutar llamada a la API para actualizar el usuario


    //Variables en localStorage
    /* let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    varLocalStorage.email = state.email;
    varLocalStorage.name = state.name;
    varLocalStorage.username = state.username;
    localStorage.setItem("OrusSystem", JSON.stringify(varLocalStorage)); */
  },
  
  catchInputs = (e) => {
    const { name, value } = e.target;
    setState({
      [name]: value.toLowerCase(),
    });
  };

  return (
    <div className="row" style={{height:'100vh'}}>
      <div className="col-12">
        <div className="card card-primary card-outline">
          <div className="card-body">
            <h5 className="card-title">Generales</h5>
            <p>&nbsp;</p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-server"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Servidor"
                name="server"
                value={state.server}
                onChange={catchInputs}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-building"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control text-capitalize"
                placeholder="Nombre de la empresa"
                name="company"
                value={state.company}
                onChange={catchInputs}
              />
            </div>
          </div>
          <div className="card-footer text-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={clickSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>


      <div className="col-lg-6 col-sm-12">
        <div className="card card-primary card-outline">
          <div className="card-body">
            <h5 className="card-title">Usuario</h5>
            <p>&nbsp;</p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-at"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={catchInputs}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-tag"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control text-capitalize"
                placeholder="Nombre completo"
                name="name"
                value={state.name}
                onChange={catchInputs}
              />
            </div>
            <hr />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user-check"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Usuario"
                name="username"
                value={state.username}
                onChange={catchInputs}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={state.password}
                onChange={catchInputs}
              />
            </div>
          </div>
          <div className="card-footer text-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={clickSaveUser}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-md-12 col-sm-12">
        <BranchsList />
      </div>
    </div>
  );
}
