import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

class Contacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            load:true
        }
        this.changePage = this.changePage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount(){
        this.getContacts();
        moment.locale('es');
    }

    render(){
        let {contacts,load} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="ion ion-clipboard mr-1"></i>
                        Contactos registrados
                    </h3>
                    <div className="card-tools">
                        <div className="btn-group">
                            { //eslint-disable-next-line 
                            <a href="#" className="btn btn-tool" data-toggle="modal" data-target="#filters">
                                <i className="fas fa-filter"></i>
                            </a>
                            }
                        </div>
                        <div className="btn-group">
                            <ul className="pagination pagination-sm">
                                <li className="page-item"><a href="#end" className="page-link">«</a></li>
                                <li className="page-item"><a href="#end" className="page-link">1</a></li>
                                <li className="page-item"><a href="#end" className="page-link">2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0">
                    <table className="table table-hover table-nowrap">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>RFC</th>
                                <th>E-mail</th>
                                <th>Tipo</th>
                                <th>Telefonos</th>
                                <th>Domicilios</th>
                                <th>Nacimiento</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {load
                            ? <tr>
                                <td colSpan="8" className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </td>
                              </tr>
                            :  Object.keys(contacts).length
                            ? contacts.map(contact => {
                                contact.telefonos = contact.telefonos.split(',');
                                return (
                                <tr key={contact.id} >
                                    <td>
                                        <span className="badge badge-primary">
                                            {contact.nombre}
                                        </span>
                                    </td>
                                    <td>{contact.rfc}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        {contact.tipo
                                        ? <span className="badge badge-secondary">Proveedor</span> 
                                        : <span className="badge badge-success">Cliente</span> }
                                    </td>
                                    <td>{contact.telefonos[2] ? contact.telefonos[2] : contact.telefonos[0]}</td>
                                    <td>{contact.domicilio.split(',')[0]}</td>
                                    <td>{moment(contact.f_nacimiento).fromNow()}</td>
                                    <td>
                                        <a className="btn-flat text-warning" 
                                            href="#delete" 
                                            onClick={this.handleDelete} 
                                            id={contact.id}
                                        >
                                            <i className="fas fa-trash" id={contact.id} ></i>
                                        </a>
                                        &nbsp;&nbsp;
                                        <Link className="btn-flat blue-text" 
                                            to={"/contactos/registro/"+contact.id} 
                                            onClick={this.changePage} 
                                            id='/contactos/registro' 
                                        >
                                            <i className="fas fa-pencil-alt" id='/contactos/registro' ></i>
                                        </Link>
                                    </td>
                                </tr>
                                );
                            })
                            :   <tr>
                                    <th colSpan="8" className="text-center">No hay datos para mostrar</th>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer clearfix">
                    <Link to="/contactos/registro" className="btn btn-info float-right" onClick={this.changePage} id='/contactos/registro' >
                        <i className="fas fa-plus" id='/contactos/registro'></i> 
                        &nbsp;
                        Nuevo contacto
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
            fetch("http://"+ varLocalStorage.host +"/api/contacts/"+ id,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ varLocalStorage.token
                }
            })
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
    getContacts(){
        //Variables en localStorage
        let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
        //Realiza la peticion de los usuarios
        fetch("http://"+ varLocalStorage.host +"/api/contacts",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ varLocalStorage.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                contacts: data.data,
                load:false
            });
        }).catch(e => {
            console.log(e);
            this.setState({
                contacts: [],
                load:false
            });
        });
    }
}

export default Contacts;