import { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import RouterAuth from "./RouterAuth";
import RouterPortal from "./RouterPortal";
import NotFound from "../components/404NotFound";
import Login from "../pages/Login";

export default function Router() {
  const { auth } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/login" render={() => <Login />} />
      {auth?.isLogged ? <RouterAuth auth={auth} /> : <RouterPortal />}
      <Route component={NotFound} />
    </Switch>
  );
}
