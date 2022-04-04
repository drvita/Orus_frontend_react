// import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { useContext } from "react";
import Users from "./components/Users/index";
import UserAdd from "./components/Users/add";
import Store from "./components/Store/index";
import Contacts from "./components/Contacts/index";
import Tools from "./components/Tools/tools";
import Exam from "./components/Exam/index";
import Order from "./components/Order/index";
import Sales from "./components/Sales/index";
import Dashboard from "./components/Dashboard/index";
// import NotifyAllShow from "./components/Layouts/notifyAll";
import NotFound from "./components/404NotFound";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";

export default function Routers() {
  const { auth } = useContext(AuthContext);
  const userRol = "admin";

  if (auth?.isLogged) {
    console.log("[DEBUG] Lggied:", auth);
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => {
            switch (userRol) {
              case "doctor":
                return <Exam {...props} />;

              case "ventas":
                return <Order {...props} page={this.handlePage} />;

              default:
                return <Dashboard {...props} page={this.handlePage} />;
            }
          }}
        />

        <Route
          path="/usuarios/registro/:id?"
          render={(props) => <UserAdd {...props} page={this.handlePage} />}
        />

        <Route
          path="/usuarios"
          render={(props) => <Users {...props} page={this.handlePage} />}
        />

        <Route
          path="/almacen/:id?"
          render={(props) => <Store {...props} page={this.handlePage} />}
        />

        <Route
          path="/contactos/:id?"
          render={(props) => <Contacts {...props} page={this.handlePage} />}
        />

        <Route
          path="/consultorio/:id?"
          render={(props) => <Exam {...props} />}
        />

        <Route
          path="/configuraciones"
          render={(props) => <Tools {...props} page={this.handlePage} />}
        />

        <Route path="/pedidos/:id?" render={(props) => <Order {...props} />} />

        <Route
          path="/notas/:id?"
          render={(props) => <Sales {...props} page={this.handlePage} />}
        />

        {/* <Route
              path="/notificaciones"
              render={(props) => (
                <NotifyAllShow {...props} data={data} page={this.handlePage} />
              )}
            /> */}

        <Route path="/login" render={(props) => <Login />} />

        <Route path="*" render={(props) => <NotFound />} />
      </Switch>
    );
  } else {
    return <Login />;
  }
}
