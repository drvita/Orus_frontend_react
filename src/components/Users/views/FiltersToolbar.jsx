import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";

export default function FiltersToolbar({handleNewOrEdit: _handleNewOrEdit, newOrEdit: _newOrEdit}){

    const _userContext = useContext(UserContext)
    const history = useHistory();
    
    return (
          <div className="col-lg-12">


            <button 

              className={
                _userContext.panel !== "inbox"
                  ? "disabled mb-3 btn btn-secondary btn-block"
                  : "mb-3 btn btn-primary btn-block"
              }

              onClick={(e) => {
                e.preventDefault();
                _handleNewOrEdit()
              }}

              disabled={ _newOrEdit}
              >
                <i className="mr-2 fas fa-plus"></i>
                Usuario nuevo
            </button>
    
            {!_newOrEdit ? (
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
                        value={_userContext.options.orderby}
                        onChange={({ target }) => {

                            let {name, value} = target;
                            _userContext.set({
                                ..._userContext,
                                options:{
                                    ..._userContext.options,
                                    [name]: value,                                    
                                }
                            })
                        }}
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
                        value={_userContext.options.order}
                        onChange={({ target }) => {
                            let {name, value} = target;
                            _userContext.set({
                                ..._userContext,
                                options:{
                                    ..._userContext.options,
                                    [name]: value,                                    
                                }
                            })
                        }}
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
                        value={_userContext.options.itemsPage}
                        onChange={({ target }) =>{
                            let {name, value} = target;
                            _userContext.set({
                                ..._userContext,
                                options:{
                                    ..._userContext.options,
                                    [name]: value,                                    
                                }
                            })
                        }}
                      >
                        <option value="25">ver 25</option>
                        <option value="50">ver 50</option>
                        <option value="75">ver 75</option>
                        <option value="100">ver 100</option>
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <li className="list-group-item">
              <a
                href="#back"
                className="d-flex justify-content-between align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  _handleNewOrEdit();
                  history.push('/usuarios');
                }}
              >
                Ver listado
                <span className="badge badge-primary badge-pill">
                  <i className="fas fa-chevron-left"></i>
                </span>
              </a>
            </li>
              </div>
            )}
          </div>
    )
}