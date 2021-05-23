import React, { Component } from "react";
import Routers from "./Routers";
import Login from "./components/Layouts/login";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { isLogged: IS_LOGGING, company: COMPANY } = this.props;
    return (
      <main>
        {IS_LOGGING ? (
          <Routers data={this.props} logOut={this.logOut} />
        ) : (
          <Login company={COMPANY} />
        )}
      </main>
    );
  }

  logOut = () => {
    console.debug("[DEBUG] response logout");
    const { logginSuccess } = this.props;
    logginSuccess();
  };
}
const mapStateToProps = (state) => {
  return {
    isLogged: state.loggin_state.isLogged,
    company: state.default_state.company,
    host: state.default_state.host,
  };
};

export default connect(mapStateToProps)(App);
