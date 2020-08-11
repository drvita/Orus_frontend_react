import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import StoreLote from './add_lote';

class StoreAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:0,
            code:"",
            codebar:'',
            grad:'',
            brand:'',
            name:'',
            unit: 'PZ',
            cant: 1,
            price: 1,
            category_id: 1,
            category_list:[]
        }
        this.changePage = this.changePage.bind(this);
        this.catchInputs = this.catchInputs.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleGetItem = this.handleGetItem.bind(this);
    }

    componentDidMount(){
        this.handleGetItem();
        //Variables en localStorage
        let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
        fetch("http://"+ varLocalStorage.host +"/api/categories",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+ varLocalStorage.token
            }
        })
        .then(res => res.json())
        .then(cat => {
            console.log('Descargando lista de categorias');
            this.setState({
                category_list: cat.data
            });
        }).catch(e => {
            console.log(e);
        });
    }

    render(){
        //let {lote,load} = this.state;
        return (
            <div className="row">
                <div className={this.state.id?"col-md-4":"col-md-6"}>
                    <form className="card card-secondary card-outline" onSubmit={this.handleSave} >
                        <div className="card-header">
                            <h3 className="card-title">
                                <i className="fas fa-database"></i>
                                &nbsp;&nbsp;&nbsp;
                                { this.state.id 
                                ? 'Editar producto'
                                : 'Registrar nuevo producto'
                                }
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-5">
                                    {this.state.code ? <small><label>Codigo</label></small> : <br/>}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-code"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control text-uppercase" 
                                            placeholder="Codigo"
                                            name="code" 
                                            value={this.state.code} 
                                            onChange={this.catchInputs} 
                                            autoComplete="off" 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    {this.state.codebar ? <small><label>Codigo de barras</label></small> : <br/>}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-barcode"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Codigo de barras" 
                                            name="codebar" 
                                            value={this.state.codebar} 
                                            onChange={this.catchInputs}
                                            autoComplete="off" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.state.name ? <small><label>Nombre del producto</label></small> : <br/>}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-archive"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Nombre del producto" 
                                            name="name"  
                                            value={this.state.name} 
                                            onChange={this.catchInputs} 
                                            autoComplete="off" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10">
                                    {this.state.brand ? <small><label>Marca</label></small> : <br/>}
                                    <div className="input-group mb-5">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-copyright"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Marca" 
                                            name="brand" 
                                            value={this.state.brand} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    {this.state.unit ? <small><label>Unidad de presentacion</label></small> : <br/>}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-balance-scale"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" 
                                            placeholder="Unidad de presentación" 
                                            name="unit" 
                                            value={this.state.unit} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    {this.state.cant ? <small><label>Cantidad en existencia</label></small> : <br/>}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-database"></i>
                                            </span>
                                        </div>
                                        <input type="number" className="form-control text-right" 
                                            placeholder="Cantidades en existencia" 
                                            name="cant" 
                                            value={this.state.cant} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    {this.state.price ? <small><label>Precio</label></small> : <br/>}
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-money-bill"></i>
                                            </span>
                                        </div>
                                        <input type="number" className="form-control text-right" 
                                            placeholder="Precio" 
                                            name="price" 
                                            value={this.state.price} 
                                            onChange={this.catchInputs}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <small><label>Categoria</label></small>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-sort-amount-down"></i>
                                            </span>
                                        </div>
                                        <select 
                                            className="custom-select" 
                                            name="category_id" 
                                            value={this.state.category_id} 
                                            onChange={this.catchInputs}
                                        >
                                            {this.state.category_list.map(list => {
                                                if(list.depende_de===null){
                                                    return(
                                                    <option value={list.id} key={list.id} > {list.categoria} </option>
                                                    );
                                                } else {
                                                    return(null);
                                                }
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="btn-group float-right" role="group">
                                        <Link to="/almacen" 
                                            className="btn btn-default" 
                                            onClick={this.changePage} 
                                            id='/almacen' 
                                        >
                                            Volver
                                        </Link>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                        >Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.id
                ? <div className="col-md-8">
                    <StoreLote 
                        id={this.state.id} 
                        price={this.state.price} 
                    refresh={this.reloadPage.bind(this)} 
                    />
                </div>
                :''}      
            </div>
        );
    }

    reloadPage(){
        console.log('Recargando despues de actualizacion');
        this.handleGetItem();
    }
    changePage(e){
        this.props.page(e.target.id);
    }
    catchInputs(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value.toLowerCase()
        });
    }
    handleGetItem(){
        let id = this.props.match.params.id;
        //Variables en localStorage
        let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
        if(id > 0){
            //Realiza la peticion del usuario seun el id
            fetch("http://"+ varLocalStorage.host +"/api/store/"+ id,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ varLocalStorage.token
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log('Descargando producto', data.data);
                this.setState({
                    id: data.data.id,
                    code: data.data.codigo,
                    codebar: data.data.c_barra,
                    brand: data.data.marca,
                    name: data.data.producto,
                    unit: data.data.unidad,
                    cant: data.data.cantidades,
                    price: data.data.precio,
                    category_id: data.data.categoria.id
                });
            }).catch(e => {
                console.log(e);
            });
        } 
    }
    handleSave(e){
        e.preventDefault();
        //Maneja el boton de almacenar
        let conf = window.confirm("¿Esta seguro de realizar la accion?");
        if( conf ){
            //Variables en localStorage
            let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
            //Datos del formulario
            let {id,code,codebar,brand,name,unit,cant,price,category_id} = this.state;
            //Creamos el body
            let body = {
                code,
                codebar,
                brand,
                name,
                unit,
                cant,
                price,
                category_id
            }
            //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
            let url = id ? "http://"+ varLocalStorage.host +"/api/store/"+ id : "http://"+ varLocalStorage.host +"/api/store",
                method = id ? 'PUT' : 'POST';
            //Actualiza el producto o creamos el producto
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
                else {
                    console.log(data.message);
                    window.alert(data.message + '\n Datos invalidos revise el formulario');
                }
            }).catch(e => {
                console.log(e);
            });
        }
    }
}

export default StoreAdd;