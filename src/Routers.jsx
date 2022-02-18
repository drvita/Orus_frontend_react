import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navtop from "./components/Layouts/navtop";
import Menu from "./components/Layouts/menu";
import Breadcrumb from "./components/Layouts/breadcrumb";
import Footer from "./components/Layouts/footer";
import Users from "./components/Users/index";
import UserAdd from "./components/Users/add";
import Store from "./components/Store/index";
import Contacts from "./components/Contacts/index";
//import ContactsAdd from "./components/Contacts/add";
//import AddByContact from "./components/Contacts/addByContact";
import Tools from "./components/Tools/tools";
import Exam from "./components/Exam/index";
//import ExamAdd from "./components/Exam/add";
import Order from "./components/Order/index";
import Sales from "./components/Sales/index";
//import SalesAdd from "./components/Sales/add";
import Dashboard from "./components/Dashboard/index";
import NotifyAllShow from "./components/Layouts/notifyAll";
import NotFound from "./components/404NotFound";

export default class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.handleTitleSection(window.location.pathname),
      company: props.data.company,
    };
  }

  render() {
    const { data, logOut } = this.props,
      { page } = this.state;
    const userRol = data.dataLoggin.roles[0];

    return (
      <Router>
        <div className="wrapper">
          <Navtop logOut={logOut} data={data} page={this.handlePage} />
          <Menu
            companyName={this.state.company}
            user={data}
            page={this.handlePage}
            logOut={logOut}
            active={page}
          />
          <div className="content-wrapper">
            <Breadcrumb />
            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={(props) => {
                          switch (userRol) {
                            case "doctor":
                              return <Exam {...props} />;

                            case "ventas":
                              return (
                                <Order
                                  {...props}
                                  data={data}
                                  page={this.handlePage}
                                />
                              );

                            default:
                              return (
                                <Dashboard
                                  {...props}
                                  data={data}
                                  page={this.handlePage}
                                />
                              );
                          }
                        }}
                      />

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
                        path="/usuarios"
                        render={(props) => (
                          <Users
                            {...props}
                            data={data}
                            page={this.handlePage}
                          />
                        )}
                      />

                      <Route
                        path="/almacen/:id?"
                        render={(props) => (
                          <Store
                            {...props}
                            data={data}
                            page={this.handlePage}
                          />
                        )}
                      />

                      <Route
                        path="/contactos/:id?"
                        render={(props) => (
                          <Contacts
                            {...props}
                            data={data}
                            page={this.handlePage}
                          />
                        )}
                      />

                      <Route
                        path="/consultorio/:id?"
                        render={(props) => <Exam {...props} />}
                      />

                      <Route
                        path="/configuraciones"
                        render={(props) => (
                          <Tools
                            {...props}
                            data={data}
                            page={this.handlePage}
                          />
                        )}
                      />

                      <Route
                        path="/pedidos/:id?"
                        render={(props) => <Order {...props} />}
                      />

                      <Route
                        path="/notas/:id?"
                        render={(props) => (
                          <Sales
                            {...props}
                            data={data}
                            page={this.handlePage}
                          />
                        )}
                      />

                      <Route
                        path="/notificaciones"
                        render={(props) => (
                          <NotifyAllShow
                            {...props}
                            data={data}
                            page={this.handlePage}
                          />
                        )}
                      />

                      <Route path="*" render={(props) => <NotFound />} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }

  handlePage = (title) => {
    const page = this.handleTitleSection(title);
    this.setState({
      page,
    });
  };
  handleTitleSection = (page) => {
    console.log("Esta es la página actual" + page);
    //Verificamos que la variable no este vacia
    page = page ? page : window.location.pathname;
    //Maneja el renderiazado del componentes cuando se cambíe el componentes
    if (page === "" || typeof page === "undefined" || typeof page === "object")
      page = "/";

    const locations = page.split("/");
    if (locations[1] === "") {
      return "dashboard";
    } else {
      return locations[1];
    }
  };
}
