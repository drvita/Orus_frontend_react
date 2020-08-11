import React, {Component} from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Navtop from './components/Layouts/navtop';
import Menu from './components/Layouts/menu';
import Breadcrumb from './components/Layouts/breadcrumb';
import Footer from './components/Layouts/footer';
import Users from './components/Users/index';
import UserAdd from './components/Users/add';
import Store from './components/Store/index';
import StoreAdd from './components/Store/add';
import Contacts from './components/Contacts/index';
import ContactsAdd from './components/Contacts/add';
import Tools from './components/Layouts/tools';

class Routers extends Component {
    constructor(props){
		super(props);
		this.state = {
            page:'dashboard',
            subpage:'principal'
        }
        this.handlePage = this.handlePage.bind(this);
    }
    
    componentDidMount(){
        //Manejamos el router dependiendo de la ruta
        this.handlePage(window.location.pathname);
    }
    
    render(){
        const {data} = this.props;
        //Aqui se cargan los componentes según su ruta
        return (
            <div className="wrapper">
                <Navtop />
                <Menu companyName={'Optica Madero'} 
                    user={data} 
                    page={this.handlePage} 
                    logOut={this.props.logOut}
                    active={this.state.page}
                />
                <div className="content-wrapper">
                    <Breadcrumb title={this.state.page} subtitle={this.state.subpage} />
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <Switch>
                                        <Route path="/usuarios/registro/:id?" 
                                            render={(props) => 
                                                <UserAdd {...props} 
                                                    data={data} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        />
                                        <Route extric path="/usuarios" 
                                            render={(props) => 
                                                <Users {...props} 
                                                    data={data} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        />
                                        <Route path="/almacen/registro/:id?" 
                                            render={(props) => 
                                                <StoreAdd {...props} 
                                                    data={data} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        />
                                        <Route extric path="/almacen" 
                                            render={(props) => 
                                                <Store {...props} 
                                                    data={data} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        />
                                        <Route path="/contactos/registro/:id?" 
                                            render={(props) => 
                                                <ContactsAdd {...props} 
                                                    data={data} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        />
                                        <Route extric path="/contactos" 
                                            render={(props) => 
                                                <Contacts {...props} 
                                                    data={data} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        /> 
                                        <Route extric path="/configuraciones" 
                                            render={(props) => 
                                                <Tools {...props} 
                                                    page={this.handlePage}
                                                />
                                            } 
                                        />      
                                        <Route path="/">
                                            Dashboard
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    handlePage(page){
        //Maneja el renderiazado del componentes cuando se cambíe el componentes
        if(page === '') page = '/';
        let locations = page.split('/');
        if(locations[1] === ''){
            this.setState({
                page:'dashboard',
                subpage: 'principal'
            });
        } else {
            this.setState({
                page:locations[1],
                subpage: (locations[2])? locations[2] : locations[1]
            });
        }
    }
}

export default Routers;