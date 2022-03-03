import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import PaymentsDetails from "../Sales/views/reportPaymentsDetails";
import ReportPays from "../Sales/views/reportPays";
import ReportBank from "../Sales/views/reportBank";
//import Caja from "./cash";
import DateUser from "./dateUser";
import BoxCut from "./boxCut";
// Actions
import { defaultActions } from "../../redux/default/";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      host: ls.host,
      token: ls.token,
      user: !props.data.rol ? "" : props.data.idUser,
      fechaInicial: moment().format("YYYY-MM-DD"),
      fechaFinal: moment().format("YYYY-MM-DD"),
      caja: 0,
      ventas: 0,
      filterData:{},
    };
  }

  componentDidMount() {
    const { _setPageName } = this.props;

    _setPageName("panel de control");
  }

  render() {
    const { user, fechaInicial, fechaFinal, caja, ventas } = this.state;
    const { data } = this.props;
    return (
      <div className="content">
        <div className="row">
          <div className="col col-md-12 col-lg-12">
            <div className="row">
              {!data.rol ? (
                <div className="col-lg-12 col-md-12">
                  <DateUser data={data} changeState={this.changeAllState} />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <p className="h4 border-bottom mb-4">
          Bienvenido
          <span className="font-weight-bold mx-2">
            {this.props.data.dataLoggin.name}
          </span>
          este es el resumen.
        </p>

        <div className="row">
          <div className="col-lg-4 col-md-12">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <BoxCut caja={caja} ventas={ventas} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <ReportPays
                  data={data}
                  user={user}
                  fechaInicial={fechaInicial}
                  fechaFinal={fechaFinal}
                  changeState={this.changeState}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <ReportBank
                  data={data}
                  user={user}
                  fechaInicial={fechaInicial}
                  fechaFinal={fechaFinal}
                  changeState={this.changeState}
                />
              </div>
              <div className="col-lg-8 col-md-12">
                <PaymentsDetails
                  data={data}
                  user={user}
                  fechaInicial={fechaInicial}
                  fechaFinal={fechaFinal}
                  changeState={this.changeState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  changeState = (name, value) => {
    this.setState({ [name]: value });
  };
  changeAllState = (obj) => {
    this.setState({ ...obj });
  };

}

const mapStateToProps = ({ default: system }) => {
    return {};
  },
  mapActionsToProps = {
    _setPageName: defaultActions.changeNamePage,
  };

export default connect(mapStateToProps, mapActionsToProps)(DashboardComponent);
