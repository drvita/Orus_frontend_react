import { Route } from "react-router-dom";
import UserAdd from "../components/Users/add";
import Store from "../pages/Store";
import Contacts from "../pages/Contacts";
import Tools from "../components/Tools/tools";
import Exams from "../pages/Exams";
import Order from "../components/Order/index";
import Sales from "../components/Sales/index";
import Dashboard from "../pages/AuthDashboard";
import Users from "../pages/Users";
// import NotifyAllShow from "./components/Layouts/notifyAll";

import ConfigProvider from "../context/ConfigContext";
import Main from "../layouts/Main";

export default function Routers({ auth }) {
  return (
    <ConfigProvider>
      <Main>
        <Route
          exact
          path="/"
          render={(props) => {
            switch (auth.roles) {
              case "doctor":
                return <Exams {...props} />;

              case "ventas":
                return <Order {...props} />;

              default:
                return <Dashboard {...props} />;
            }
          }}
        />

        <Route
          path="/usuarios/registro/:id?"
          render={(props) => <UserAdd {...props} page={() => {}} />}
        />

        <Route
          path="/usuarios"
          render={(props) => <Users {...props} page={() => {}} />}
        />

        <Route
          path="/almacen/:id?"
          render={(props) => <Store {...props} page={() => {}} />}
        />

        <Route
          path="/contactos/:id?"
          render={(props) => <Contacts {...props} page={() => {}} />}
        />

        <Route
          path="/consultorio/:id?"
          render={(props) => <Exams {...props} />}
        />

        <Route
          path="/configuraciones"
          render={(props) => <Tools {...props} page={() => {}} />}
        />

        <Route path="/pedidos/:id?" render={(props) => <Order {...props} />} />

        <Route
          path="/notas/:id?"
          render={(props) => <Sales {...props} page={() => {}} />}
        />

        {/* <Route
              path="/notificaciones"
              render={(props) => (
                <NotifyAllShow {...props} data={data} page={this.handlePage} />
              )}
            /> */}
      </Main>
    </ConfigProvider>
  );
}
