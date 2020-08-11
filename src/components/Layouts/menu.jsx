import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor(props){
        super(props);
        this.changePage = this.changePage.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    
    render(){
        let {companyName, user, active} = this.props;
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link" onClick={this.changePage} id="/">
                    <span className="brand-text font-weight-light" id="/">
                        {companyName}
                    </span>
                </Link>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="info">
                            <a href="#end" className="d-block">
                                <i className="fas fa-user-circle"></i>
                                &nbsp;
                                {user.name} <small>({user.username})</small><br/>
                                <span className="badge badge-light">
                                    {user.rol > 0
                                    ? user.rol === 1
                                        ? 'Ventas' 
                                        : 'Optometrista' 
                                    : 'Administrador' 
                                    }
                                </span>
                            </a>
                            <br/>
                            <p>
                                <Link 
                                    to="/" 
                                    className="btn btn-outline-light" 
                                    onClick={this.handleLogOut} 
                                >Cerrar sesion</Link>
                            </p>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview">
                                <Link to="/contactos" className={active==='contactos'?"nav-link active":"nav-link"}
                                    onClick={e => { this.changePage('/contactos') }} 
                                >
                                    <i className="nav-icon fas fa-address-book"></i>
                                    <p>
                                        Contactos
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item has-treeview">
                                <Link to="/almacen" className={active==='almacen'?"nav-link active":"nav-link"}
                                    onClick={e => { this.changePage('/almacen') }} 
                                >
                                    <i className="nav-icon fas fa-database"></i>
                                    <p>
                                        Almacen
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item has-treeview">
                                <Link to="/usuarios" className={active==='usuarios'?"nav-link active":"nav-link"} 
                                    onClick={e => { this.changePage('/usuarios') }} 
                                >
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>
                                        Usuarios
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item has-treeview">
                                <Link to="/configuraciones" className={active==='configuraciones'?"nav-link active":"nav-link"} 
                                    onClick={e => { this.changePage('/configuraciones') }} 
                                >
                                    <i className="nav-icon fas fa-tools"></i>
                                    <p>
                                        Configuraciones
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

    changePage(e){
        console.log(e);
        this.props.page(e);
    }

    handleLogOut(){
        let conf = window.confirm('¿Confirma cerrar la sesion?');

        if(conf){
            let e = { target:{id:'/'}};
            this.props.logOut();
            this.changePage(e);
        }
    }
}

export default Menu;