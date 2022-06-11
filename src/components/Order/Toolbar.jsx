import {Fragment ,useContext} from 'react';
import { useHistory } from 'react-router-dom';
//Context
import { OrderContext } from "../../context/OderContext";

export default function Toolbar(){
    const orderContext = useContext(OrderContext);
    const options = orderContext.options;
    const history = useHistory();

    const handleSetSelectOptions = ({ target }) => {
        const { value, name } = target;
        orderContext.set({
            ...orderContext,
            options: {
                ...options,
                [name]: value,
            }
        })
      };

    return(
        <div className="row">
            <div className="col-md-12 col-sm-12 d-print-none">
            <a
                href="#new"
                className={
                orderContext.panel === 'newOrder' ? "disabled mb-3 btn btn-secondary btn-block" : "mb-3 btn btn-warning btn-block"}
                onClick={(e) => {
                    e.preventDefault();
                    orderContext.set({
                        ...orderContext,
                        panel: 'newOrder',
                    })
                }}
                disabled={orderContext.panel === 'newOrder' ? true : false}
            >
                <i className="mr-2 fas fa-plus"></i>
                Pedido nuevo
            </a>
            
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title text-dark">
                        <i className="mr-2 fas fa-ellipsis-v"></i>Menu y filtros
                    </h5>
                </div>
                <div className="p-0 card-body">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                    <button                
                        href='#'
                        className={orderContext.panel === 'inbox' ? "nav-link active" : "nav-link"}
                        onClick={(e) => {
                            e.preventDefault();
                            orderContext.set({
                                ...orderContext,
                                panel: 'inbox'                                
                            });
                            history.push("/pedidos");                         
                        }}
                    >
                        <i className="mr-2 fas fa-clipboard-list"></i> Pedidos
                    </button>
                    </li>

                    {orderContext.panel === 'inbox' ? (
                        <Fragment>
                        <li className="nav-item">&nbsp;</li>
                        <li className="p-2 nav-item">
                        <label htmlFor="status">Estado del pedido</label>
                        <select
                            className="form-control"
                            name="status"
                            id="status"
                            value={options.status}
                            onChange={handleSetSelectOptions}
                        >
                            <option value="">-- Todos --</option>
                            <option value="0">En proceso</option>
                            <option value="1">Laboratorio</option>
                            <option value="2">Bicelación</option>
                            <option value="3">Terminado</option>
                            <option value="4">Entregado</option>


                        </select>
                        </li>
                        <li className="nav-item p-2">
                        <label htmlFor="orderby">Ordenar por</label>
                        <select
                            className="form-control "
                            name="orderby"
                            id="orderby"
                            value={options.orderby}
                            onChange={handleSetSelectOptions}
                        >
                            <option value="created_at">Fecha de registro</option>
                            <option value="updated_at">
                            Fecha de modificacion
                            </option>
                        </select>
                        </li>
                        <li className="nav-item p-2">
                        <label htmlFor="order">Mostrar por</label>
                        <select
                            className="form-control "
                            name="order"
                            id="order"
                            value={options.order}
                            onChange={handleSetSelectOptions}
                        >
                            <option value="asc">Antiguos</option>
                            <option value="desc">Recientes</option>
                        </select>
                        </li>
                        <li className="nav-item p-2">
                        <label htmlFor="itemsPage">Numero de pedidos</label>
                        <select
                            className="form-control "
                            name="itemsPage"
                            id="itemsPage"
                            value={options.itemsPage}
                            onChange={handleSetSelectOptions}
                        >
                            <option value="10">ver 10</option>
                            <option value="20">ver 20</option>
                            <option value="50">ver 50</option>
                            <option value="100">ver 100</option>
                        </select>
                        </li>
                    </Fragment>
                    ) : null}
                </ul>
                </div>
            </div>
            </div>
      </div>
    )
}