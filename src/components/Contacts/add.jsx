import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ContactsAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:0,
            name:'',
            rfc:'',
            email:'',
            type:0,
            birthday:'',
            calle:'',
            colonia:'',
            municipio:'',
            estado:'',
            cp:'',
            t_casa:'',
            t_oficina:'',
            t_movil:''

        }
        this.markers = [];
        this.changePage = this.changePage.bind(this);
        this.catchInputs = this.catchInputs.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        //Variables en localStorage
        let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
        if(id > 0){
            //Realiza la peticion del usuario seun el id
            fetch("http://"+ varLocalStorage.host +"/api/contacts/"+ id,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization':'Bearer '+ varLocalStorage.token
                }
            })
            .then(res => res.json())
            .then(data => {
                let domicilio = data.data.domicilio.split(','),
                    telefonos = data.data.telefonos.split(',');
                console.log('Cargando datos del contacto');
                this.setState({
                    id: data.data.id,
                    name: data.data.nombre,
                    rfc: data.data.rfc,
                    email: data.data.email,
                    type: data.data.tipo,
                    birthday: data.data.f_nacimiento,
                    calle: domicilio[0].replace(/undefined/g,''),
                    colonia: domicilio[1].replace(/undefined/g,''),
                    municipio: domicilio[2].replace(/undefined/g,''),
                    estado: domicilio[3].replace(/undefined/g,''),
                    cp: domicilio[4].replace(/undefined/g,''),
                    t_casa: telefonos[0].replace(/undefined/g,''),
                    t_oficina: telefonos[1].replace(/undefined/g,''),
                    t_movil: telefonos[2].replace(/undefined/g,'')
                });
            }).catch(e => {
                console.log(e);
                this.setState({
                    id:0,
                    name:'',
                    rfc:'',
                    email:'',
                    type:0,
                    birthday:'',
                    calle:'',
                    colonia:'',
                    municipio:'',
                    estado:'',
                    cp:'',
                    t_casa:'',
                    t_oficina:'',
                    t_movil:''
                });
            });
            const googlePlaceAPILoad1 = setInterval(() => {
                if (window.google){
                    this.google=window.google;
                    clearInterval(googlePlaceAPILoad1);
                    console.log('Cargando mapa');
                    const mapCenter = new this.google.maps.LatLng(19.2487072,-103.747381);
                    this.map = new this.google.maps.Map(document.getElementById('gmapContainer'), {
                        center: mapCenter,
                        zoom: 16
                    });
                };
            },100);
        } else {
            this.setState({
                id:0,
                name:'',
                rfc:'',
                email:'',
                type:0,
                birthday:'',
                calle:'',
                colonia:'',
                municipio:'',
                estado:'',
                cp:'',
                t_casa:'',
                t_oficina:'',
                t_movil:''
            });
        }
    }
    componentDidUpdate(){
        if(this.state.id){
            const googlePlaceAPILoad2 = setInterval(() => {
                if (this.google){
                    clearInterval(googlePlaceAPILoad2);
                    console.log('Cargando Marker');
                    let input = this.state.calle +','+ this.state.colonia +','+ this.state.municipio +','+ this.state.estado;
                    const request = {
                            query: input,
                            fields: ['formatted_address','geometry'],
                        };
                    this.service = new this.google.maps.places.PlacesService(this.map);
                    this.service.findPlaceFromQuery(request, (results, status)=>{
                        if (status ===  'OK') {
                            if(this.markers.length){
                                this.markers[0].setMap(null);
                                this.markers = [];
                            }
                            results.map(place => {
                                this.marker = new this.google.maps.Marker({
                                    position: place.geometry.location,
                                    title: place.formatted_address,
                                    map: this.map
                                });
                                this.marker.addListener('click', () => {
                                    let address = this.marker.title.split(','),
                                        add = address[2].split(/(\d{5})/g);

                                    if(!add.length){
                                        add = address[3].split(/(\d{5})/g);
                                    }
                                    
                                    this.setState({
                                        calle: address[0].trim(),
                                        colonia: address[1].trim(),
                                        municipio: add[2]? add[2].trim() : this.state.municipio,
                                        cp: add[1]? add[1].trim() : this.state.cp
                                    });
                                });
                                this.markers.push(this.marker);
                                this.markers[0].setMap(this.map);
                                this.map.setCenter(this.markers[0].position);
                                return null;
                            });
                        }
                    });
                }
            },100);
        }
    }

    render(){
        //let {data} = this.props;
        return (
            <React.Fragment>
            <form className="row" onSubmit={this.handleSave} >
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <i className="fas fa-address-book"></i>
                                &nbsp;&nbsp;&nbsp;
                                { this.state.id 
                                ? 'Editar contacto'
                                : 'Registrar nuevo contacto'
                                }
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    {this.state.name ? <small><label>Nombre completo</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-id-card-alt"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-capitalize" 
                                            placeholder="Nombre completo"
                                            name="name" 
                                            value={this.state.name} 
                                            onChange={this.catchInputs} 
                                        />
                                    </div>
                                    {this.state.rfc ? <small><label>RFC</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-file-invoice-dollar"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-uppercase" 
                                            placeholder="RFC" 
                                            name="rfc" 
                                            value={this.state.rfc} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.email ? <small><label>Correo electronico</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-at"></i>
                                            </span>
                                        </div>
                                        <input type="email" className="form-control" 
                                            placeholder="Correo electronico" 
                                            name="email" 
                                            value={this.state.email} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.birthday ? <small><label>Fecha de nacimiento</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-calendar-check"></i>
                                            </span>
                                        </div>
                                        <input type="date" className="form-control" 
                                            placeholder="Fecha de nacimiento" 
                                            name="birthday" 
                                            value={this.state.birthday} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    <small><label>Tipo de cliente</label></small>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-clipboard-check"></i>
                                            </span>
                                        </div>
                                        <select 
                                            className="custom-select" 
                                            name="type" 
                                            value={this.state.type} 
                                            onChange={this.catchInputs}
                                        >
                                            <option value="0">Cliente</option>
                                            <option value="1">Proveedor</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="checkbox" aria-label="Checkbox for following text input" />
                                            </div>
                                        </div>
                                        &nbsp;&nbsp; ¿Es una empresa?
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    {this.state.calle ? <small><label>Calle y numero</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-road"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-capitalize" 
                                            placeholder="Calle y numero" 
                                            name="calle" 
                                            value={this.state.calle} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.colonia ? <small><label>Colonia</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-location-arrow"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-capitalize" 
                                            placeholder="Colonia" 
                                            name="colonia" 
                                            value={this.state.colonia} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.municipio ? <small><label>Municipio</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-location-arrow"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-capitalize" 
                                            placeholder="Municipio" 
                                            name="municipio" 
                                            value={this.state.municipio} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.estado ? <small><label>Estado</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-map-marker"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-capitalize" 
                                            placeholder="Estado" 
                                            name="estado" 
                                            value={this.state.estado} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.cp ? <small><label>Codigo postal</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-map-marker"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Codigo Postal" 
                                            name="cp" 
                                            value={this.state.cp} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    {this.state.t_casa ? <small><label>Telefono de casa</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-phone"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Telefono de casa" 
                                            name="t_casa" 
                                            value={this.state.t_casa} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.t_oficina ? <small><label>Telefono de oficina</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-phone-alt"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Telefono de oficina" 
                                            name="t_oficina" 
                                            value={this.state.t_oficina} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                    {this.state.t_movil ? <small><label>Telefono celular</label></small> : ''}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-mobile-alt"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Telefono celular" 
                                            name="t_movil" 
                                            value={this.state.t_movil} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="btn-group float-right" role="group">
                                        <Link to="/contactos" 
                                            className="btn btn-default" 
                                            onClick={this.changePage} 
                                            id='/contactos' 
                                        >
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn btn-primary">Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {
            this.state.id
            ?   <div className="card">
                    <div className="card-header">Mapa</div>
                    <div className="card-body" id="gmapContainer" style={{height:400}} ></div>
                </div>
            : ''
            }
            </React.Fragment>
        );
    }

    changePage(e){
        this.props.page(e.target.id);
    }
    catchInputs(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value.toLowerCase().trim()
        });
    }

    handleSave(e){
        e.preventDefault();
        //Maneja el boton de almacenar
        let conf = window.confirm("¿Esta seguro de realizar la accion?");
        if( conf ){
            //Variables en localStorage
            let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
            //Extraemos Datos del formulario
            let {
                id,name,rfc,email,type,birthday,
                calle,colonia,municipio,estado,cp,
                t_casa,t_oficina,t_movil
            } = this.state;
            // Procesamos variables
            //Creamos el body
            let body = {
                name,
                rfc,
                email,
                type, 
                birthday,
                domicilio: calle +','+ colonia +','+ municipio +','+ estado +','+ cp,
                telnumbers: t_casa +','+ t_oficina +','+ t_movil
            }
            //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
            let url = id ? "http://"+ varLocalStorage.host +"/api/contacts/"+ id : "http://"+ varLocalStorage.host +"/api/contacts",
                method = id ? 'PUT' : 'POST';
            //Actualiza el contacto o creamos el contacto
            fetch(url,{
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ varLocalStorage.token
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.data) this.props.history.goBack();
                else console.log(data.message);
            }).catch(e => {
                console.log(e);
            });
        }
    }
}

export default ContactsAdd;