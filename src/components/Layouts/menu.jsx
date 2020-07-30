import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    constructor(props){
		super(props);
        this.changePage = this.changePage.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
	}

    render(){
        let {companyName, user} = this.props;

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
                                <span class="badge badge-light">
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
                                <button 
                                    type="button" 
                                    className="btn btn-outline-light" 
                                    onClick={this.handleLogOut} 
                                >Cerrar sesion</button>
                            </p>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item has-treeview">
                                <a href="#" className="nav-link active">
                                    <i className="nav-icon fas fa-user"></i>
                                    <p>
                                        Usuarios
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item" onClick={this.changePage} id="/usuarios">
                                        <Link to="/usuarios" className="nav-link" id="/usuarios">
                                            <i className="far fa-circle nav-icon" id="/usuarios"></i>
                                            <p id="/usuarios">Listado</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item" onClick={this.changePage} id="/usuarios/registro">
                                        <Link to="/usuarios/registro" className="nav-link" id="/usuarios/registro">
                                            <i className="far fa-circle nav-icon" id="/usuarios/registro"></i>
                                            <p id="/usuarios/registro">Nuevo usuario</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }

    changePage(e){
        this.props.page(e.target.id);
    }

    handleLogOut(){
        let conf = window.confirm('¿Confirma cerrar la sesion?');

        if(conf){
            this.props.logOut();
        }
    }
}

export default Menu;