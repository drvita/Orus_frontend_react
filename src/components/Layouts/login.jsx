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
        //Manejamos el inicio de sesion aqui
        let valid = this.validInputs(),
            post = {};
        post.username = this.state.username;
        post.password = this.state.password;
        if(valid){
            this.setState({
                username:'',
                password:''
            });
            this.props.loginFunction(post);
        }
    }
    catchInputs(e) {
        const {name, value} = e.target;
       