import React, { Component } from "react";
import Routers from "./Routers";
import Login from "./components/Layouts/login";
import { connect } from "react-redux";
import { userActions } from "./redux/user/";

class App extends Component {
  componentDidMount() {
    const { checkLogging: _checkLogging, dataLoggin } = this.props;
    if (dataLoggin.isLogged) _checkLogging(dataLoggin.token);
  }
  componentDidUpdate(props) {
    const { messages: M_OLD = {} } = props,
      { messages: M_NEW = {}, setMessage: _setMessage } = this.props;

    if (M_OLD.length !== M_NEW.length && M_NEW.length) {
      M_NEW.forEach((msg) => {
        const { text } = msg;
        window.sendPushMessage("Orus system", text);
      });
      _setMessage([]);
    }
  }

  render() {
    const { dataLoggin } = this.props;
    return (
      <main>
        {dataLoggin.isLogged ? <Routers data={this.props} /> : <Login />}
      </main>
    );
  }
}
const mapStateToProps = ({ users }) => {
    return {
      dataLoggin: users.dataLoggin,
      messages: users.messages,
    };
  },
  mapDispatchToProps = {
    checkLogging: userActions.checkLogging,
    setMessage: userActions.setMessages,
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
