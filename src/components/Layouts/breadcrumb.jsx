import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class BreadcrumbComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("LLLL"),
    };
    this.timerNotify = null;
  }
  componentDidMount() {
    this.timerNotify = setInterval(() => {
      console.log("[Orus System] Actualizando hora de sistema");
      this.setState({
        date: moment().format("LLLL"),
      });
    }, 60000);
  }
  componentWillUnmount() {
    if (this.timerNotify) clearInterval(this.timerNotify);
  }

  render() {
    const {
        title: TITLE,
        host: HOST,
        company: INC,
        name: USER_NAME,
      } = this.props,
      { date } = this.state;
    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="m-0 text-dark text-capitalize">
                <i className="mr-1 fas fa-file"></i> {TITLE}
              </h1>
            </div>
            <div className="text-center col">
              <small
                className="p-2 badge badge-secondary text-capitalize"
                alt="conectado a"
                title="conectado a"
              >
                <i className="mr-1 fas fa-wifi text-success"></i>
                {HOST}
              </small>
              <small
                className="p-2 mt-1 ml-1 badge badge-secondary text-capitalize"
                alt="Almacenando en"
                title="Almacenando en"
              >
                <i className="mr-1 fas fa-server text-success"></i> {INC}
              </small>
              <small
                className="p-2 mt-1 ml-2 badge badge-secondary text-capitalize"
                alt="Usuario conectado"
                title="Usuario conectado"
              >
                <i className="mr-1 fas fa-user text-info"></i> {USER_NAME}
              </small>
            </div>
            <div className="col">
              <h6 className="text-right text-muted">
                <i className="mr-1 fas fa-calendar"></i> {date}
              </h6>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    company: state.default.company,
    host: state.default.host,
    name: state.logging.username,
  };
};
export default connect(mapStateToProps)(BreadcrumbComponent);
