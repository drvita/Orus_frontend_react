import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export default function FiltersToolbar(){

    const _userContext = useContext(UserContext)
    
    return (
          <div className="col-lg-12">
            <a
              href="#new"
              className={
                _userContext.panel !== "inbox"
                  ? "disabled mb-3 btn btn-secondary btn-block"
                  : "mb-3 btn btn-primary btn-block"
              }
              onClick={(e) => {
                e.preventDefault();
                _userContext.set({
                    ..._userContext,
                    panel: 'editAndNewUser',
                })
              }}
              disabled={_userContext.panel !== "inbox" ? true : false}
            >
              <i className="mr-2 fas fa-plus"></i>
              Usuario nuevo
            </a>
    
            {_userContext.panel === "inbox" ? (
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
                        <option value="10">ver 10</option>
                        {/* {meta.total > 10 && (
                          <>
                            <option value="20">ver 20</option>
                            <option value="50">ver 50</option>
                            <option value="100">ver 100</option>
                          </>
                        )} */}
                      </select>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
    )
}