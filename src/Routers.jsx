import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navtop from "./components/Layouts/navtop";
import Menu from "./components/Layouts/menu";
import Breadcrumb from "./components/Layouts/breadcrumb";
import Footer from "./components/Layouts/footer";
import Users from "./components/Users/index";
import UserAdd from "./components/Users/add";
import Store from "./components/Store/index";
import StoreAdd from "./components/Store/add";
import Contacts from "./components/Contacts/index";
import ContactsAdd from "./components/Contacts/add";
import Tools from "./components/Layouts/tools";
import Exam from "./components/Exam/index";
import ExamAdd from "./components/Exam/add";
import Order from "./components/Order/index";
import OrderAdd from "./components/Order/add";
import Sales from "./components/Sales/index";
import SalesAdd from "./components/Sales/add";
import Dashboard from "./components/Dashboard/index";

class Routers extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      page: "dashboard",
      company: varLocalStorage.company,
    };
  }
  componentDidMount() {
    //Manejamos el router dependiendo de la ruta
    this.handlePage(window.location.pathname);
    this.verifyUser();
  }
  componentDidUpdate(props, state) {
    if (this.state.page !== state.page) {
      //Se verifica cada que se cambia de pagina, eliminar cuando exita la verificacion
      // a traves de sockets
      //this.verifyUser();
    }
  }

  render() {
    const { data } = this.props;
    //Aqui se cargan los componentes según su ruta
    return (
      <div className="wrapper">
        <Navtop />
        <Menu
          companyName={this.state.company}
          user={data}
          page={this.handlePage}
          logOut={this.props.logOut}
          active={this.state.page}
        />
        <div className="content-wrapper">
          <Breadcrumb title={this.state.page} />
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <Switch>
                    <Route
                      path="/usuarios/registro/:id?"
                      render={(props) => (
                        <UserAdd
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/usuarios"
                      render={(props) => (
                        <Users {...props} data={data} page={this.handlePage} />
                      )}
                    />
                    <Route
                      path="/almacen/registro/:id?"
                      render={(props) => (
                        <StoreAdd
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/almacen"
                      render={(props) => (
                        <Store {...props} data={data} page={this.handlePage} />
                      )}
                    />
                    <Route
                      path="/contactos/registro/:id?"
                      render={(props) => (
                        <ContactsAdd
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/contactos"
                      render={(props) => (
                        <Contacts
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/consultorio/registro/:id?"
                      render={(props) => (
                        <ExamAdd
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/consultorio"
                      render={(props) => (
                        <Exam {...props} data={data} page={this.handlePage} />
                      )}
                    />
                    <Route
                      extric
                      path="/configuraciones"
                      render={(props) => (
                        <Tools {...props} page={this.handlePage} />
                      )}
                    />
                    <Route
                      extric
                      path="/pedidos/registro/:id?"
                      render={(props) => (
                        <OrderAdd
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/pedidos"
                      render={(props) => (
                        <Order {...props} data={data} page={this.handlePage} />
                      )}
                    />

                    <Route
                      extric
                      path="/notas/registro/:id?"
                      render={(props) => (
                        <SalesAdd
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
                    <Route
                      extric
                      path="/notas"
                      render={(props) => (
                        <Sales {...props} data={data} page={this.handlePage} />
                      )}
                    />

                    <Route
                      extric
                      path="/"
                      render={(props) => (
                        <Dashboard
                          {...props}
                          data={data}
                          page={this.handlePage}
                        />
                      )}
                    />
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

  verifyUser = () => {
    //Variables en localStorage
    let varLocalStorage = JSON.parse(localStorage.getItem("OrusSystem"));
    //Solo realizamos la verificacion si hay sesion
    if (this.props.data.isLogged) {
      console.log("Verificando usuario");
      //Realizando verificación de usuarios
      if (varLocalStorage.token !== "" && varLocalStorage.host !== "") {
        fetch("http://" + varLocalStorage.host + "/api/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + varLocalStorage.token,
          },
        })
          .then((res) => {
            if (!res.ok && varLocalStorage.token !== "") {
              console.log("Usuario invalido:", res.statusText);
              this.props.logOut();
              this.handlePage("/");
            }
            return res.json();
          })
          .then((data) => {
            if (!data.message) {
              console.log("Usuario valido:", data.username);
            }
          });
      }
    }
  };
  handlePage = (page) => {
    //Maneja el renderiazado del componentes cuando se cambíe el componentes
    if (page === "" || typeof page === "undefined" || typeof page === "object")
      page = "/";
    let locations = page.split("/");
    if (locations[1] === "") {
      this.setState({
        page: "dashboard",
      });
    } else {
      this.setState({
        page: locations[1],
      });
    }
  };
}

export default Routers;
