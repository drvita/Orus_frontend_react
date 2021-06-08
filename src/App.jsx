import React, { Component } from "react";
import Routers from "./Routers";
import Login from "./components/Layouts/login";
import { connect } from "react-redux";
import { checkLogging } from "./redux/user/actions";

class App extends Component {
  componentDidMount() {
    const { checkLogging: _checkLogging, token: TOKEN, isLogged } = this.props;
    if (isLogged) _checkLogging(TOKEN);
  }

  render() {
    const { isLogged: IS_LOGGING } = this.props;
    return (
      <main>{IS_LOGGING ? <Routers data={this.props} /> : <Login />}</main>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      isLogged: state.logging.isLogged,
      token: state.logging.token,
    };
  },
  mapDispatchToProps = {
    checkLogging,
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
