import { Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export default function RouterPortal() {
  return (
    <>
      <Route exact path="/" render={(props) => <Dashboard />} />
    </>
  );
}
