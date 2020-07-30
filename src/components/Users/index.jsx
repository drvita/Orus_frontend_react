import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            load:true
        }
        this.changePage = this.changePage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount(){
        this.getUsers();
    }

    render(){
        let {users,load} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="ion ion-clipboard mr-1"></i>
                        Usuarios registrados
                    </h3>
                    <div className="card-tools">
                        <div className="btn-group">
                            <a href="#" className="btn btn-tool" data-toggle="modal" data-target="#filters">
                                <i className="fas fa-filter"></i>
                            </a>
                        </div>
                        <div className="btn-group">
                            <ul className="pagination pagination-sm">
                                <li className="page-item"><a href="#" className="page-link">«</a></li>
                                <li className="page-item"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0">
                    <table className="table table-hover table-nowrap">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>E-mail</th>
                                <th>Rol</th>
                                <th>Actualizado</th>
                                <th>Creado</th>
                                <th className="center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {load
                            ? <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </td>
                              </tr>
                            :  Object.keys(users).length
                            ? users.map(user => {
                                return (
                                <tr key={user.id} >
                                    <td>
                                        <span class="badge badge-primary">
                                            {user.username}
                                        </span>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span class="badge badge-light">
                                            {user.rol > 0
                                            ? user.rol === 1
                                                ? 'Ventas' 
                                                : 'Optometrista' 
                                            : 'Administrador' 
                                            }
                                        </span>
                                    </td>
                                    <td>{user.updated_at}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <a className="btn-flat text-warning" 
                                            href="#delete" 
                                            onClick={this.handleDelete} 
                                            id={user.id}
                                        >
                                            <i className="fas fa-trash" id={user.id} ></i>
                                        </a>
                                        &nbsp;&nbsp;&nbsp;
                                        <Link className="btn-flat blue-text" 
                                            to={"/usuarios/registro/"+user.id} 
                                            onClick={this.changePage} 
                                            id='/usuarios/registro' 
                                        >
                                            <i className="fas fa-pencil-alt" id='/usuarios/registro' ></i>
                                        </Link>
                                    </td>
                                </tr>
                                );
                            })
                            :   <tr>
                                    <th colSpan="6" className="text-center">No hay datos para mostrar</th>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer clearfix">
                    <Link to="/usuarios/registro" className="btn btn-info float-right" onClick={this.changePage} id='/usuarios/registro' >
                        <i className="fas fa-plus" id='/usuarios/registro'></i> 
                        &nbsp;
                        Nuevo usuario
                    </Link>
                </div>
            </div>
        );
    }

    changePage(e){
        this.props.page(e.target.id);
    }
    handleDelete(e){
        let conf = window.confirm("¿Esta seguro de eliminar el usuario?"),
            id = e.target.id,
            varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));

        if( conf ){
            fetch("http://"+ varLocalStorage.host +"/api/users/"+ id,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ varLocalStorage.token
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    load:true
                });
                this.getUsers();
            }).catch(e => {
                console.log(e);
            });
        }
    }
    getUsers(){
        //Variables en localStorage
        let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
        //Realiza la peticion de los usuarios
        fetch("http://"+ varLocalStorage.host +"/api/users",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization':'Bearer '+ varLocalStorage.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                users: data.data,
                load:false
            });
        }).catch(e => {
            console.log(e);
            this.setState({
                users: [],
                load:false
            });
        });
    }
}

export default Users;