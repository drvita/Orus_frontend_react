import React, {Component} from 'react';

class Main extends Component {
    constructor(props){
		super(props);
		this.state = {
			username:'',
			password:''
        }
        this.catchInputs = this.catchInputs.bind(this);
	}

    render(){
        return (
            <div className="login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="."><b className="text-primary">Orus</b> LTE</a>
                    </div>
    
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Inicio de sesion</p>
                            <form onSubmit={this.handleLogin.bind(this)}>
                                <div className="input-group mb-3">
                                    <input type="text" 
                                        className="form-control" 
                                        placeholder="Usuario" 
                                        name="username" 
                                        onChange={this.catchInputs}
                                        value={this.state.username}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" 
                                        className="form-control" 
                                        placeholder="Contraseña" 
                                        name="password"
                                        autoComplete="off" 
                                        onChange={this.catchInputs}
                                        value={this.state.password}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    validInputs(){
        //Valida los campos del formulario
        if(this.state.username.length > 4 && this.state.password.length > 7){
            return true;
        } else {
            alert('Los datos ingresados no son validos');
            return false;
        }  
    }
    handleLogin(e){
        e.preventDefault();
        //Manejamos el inicio de sesion aqui, declaramos primero las variables
        //sobre todo la de localstorage donde viene el host a conectar
         //La variable body con los datos de inicio
        let valid = this.validInputs(),
            varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem')),
            body = {
                email: this.state.username,
                password: this.state.password
            }
        //Si los datos de usuario son correctos manda la informacion al servidor
        if(valid){
            fetch("http://"+ varLocalStorage.host +"/api/users/login",{
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.data){
                    this.setState({
                        username:'',
                        password:''
                    });
                    this.props.loginFunction(data);
                } else {
                    console.log('Login status fetch:', data);
                    if(data.message) window.alert(data.message);
                    if(data.errors) window.alert(data.errors);
                }
            }).catch(e => {
                console.log(e);
            });
        }
    }
    catchInputs(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    //e9935f70a5ba300cd592aa4ac9f0081291a7bc169029cfea571ca12de1ce8fcc
}

export default Main;