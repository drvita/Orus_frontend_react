import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routers';
import Login from './components/Layouts/login';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLogged: false,
			token: '',
			username:'',
			name:'',
			rol:0,
			email:'',
			host:'192.168.0.24'
		}
		this.logOut = this.logOut.bind(this);
		this.login = this.login.bind(this);
	}
	componentDidMount(){
		//Variables en localStorage
		let varLocalStorage = JSON.parse(localStorage.getItem('OrusSystem'));
		//Las cargamos en el state
		if(varLocalStorage){
			this.setState({
				isLogged: varLocalStorage.isLogged,
				token: varLocalStorage.token,
				username: varLocalStorage.username,
				name: varLocalStorage.name,
				rol: varLocalStorage.rol,
				email: varLocalStorage.email,
				host: varLocalStorage.host
			});
		}
	}

	componentDidUpdate(){
		//Cada que el componnte es redenrizado almacenamos la variables del
		//state en localstorage
		console.log('Actualizando storage', this.state);
		localStorage.setItem('OrusSystem', JSON.stringify(this.state));
	}

	render(){
		//Mostramos el componente de login si isLogged no tiene sesion
		//De lo contrario nos dirigimos al compenente de routers
		//donde nos muestra el componente segun el path
		return (
			<Router>
				<main>
					{ this.state.isLogged
					? <Routers data={this.state}  logOut={this.logOut} />
					: <Login loginFunction={this.login} />
					}
				</main>
			</Router>
		);
	}

	login(s) {
		//Funcion que maneja el cambio de sesion en el state
		this.setState({
			isLogged:true,
			username: s.username
		});
	}
	logOut() {
		localStorage.clear();
		this.setState({
			isLogged: false,
			token: '',
			username:'',
			name:'',
			rol:0,
			email:'',
			host:'192.168.0.24'
		});
	}
}

render(<App/>, document.getElementById('root'));

/* 
if(s.token){
			let varLocalStorage = {};
			varLocalStorage.token = s.token;
			varLocalStorage.isLogged = true;
			varLocalStorage.username = s.username;
			varLocalStorage.name = s.name;
			varLocalStorage.nemploy = s.nemploy;
			varLocalStorage.kindof = s.kindof;
			localStorage.setItem('opticaSystem', JSON.stringify(varLocalStorage));
			this.setState({
				token: s.token,
				isLogged: true,
				username: s.username,
				name: s.name,
				nemploy: s.nemploy,
				kindof: s.kindof
			});
		}
*/