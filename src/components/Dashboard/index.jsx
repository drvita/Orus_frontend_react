import React, { Component } from "react";
import moment from "moment";
import PaymentsDetails from "../Sales/reportPaymentsDetails";
import ReportPays from "../Sales/reportPays";
import ReportBank from "../Sales/reportBank";
import Caja from "./cash";
import DateUser from "./dateUser";
import BoxCut from "./boxCut";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      host: ls.host,
      token: ls.token,
      user: !props.data.rol ? "" : props.data.idUser,
      date: moment().format("YYYY-MM-DD"),
      caja: 0,
      ventas: 0,
    };
  }

  render() {
    const { user, date, caja, ventas } = this.state;
    const { data } = this.props;
    return (
      <div className="content">
        <div className="row">
          <div className="col">
            <Caja
              data={data}
              user={user}
              date={date}
              changeState={this.changeState}
            />
          </div>

          <div className="col col-md-3 col-lg-3">
            <div className="row">
              {!data.rol ? (
                <div className="col">
                  <DateUser data={data} changeState={this.changeState} />
                </div>
              ) : null}
              <div className="col">
                <BoxCut caja={caja} ventas={ventas} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-4 col-lg-4">
            <ReportBank
              data={data}
              user={user}
              date={date}
              changeState={this.changeState}
            />

            <ReportPays
              data={data}
              user={user}
              date={date}
              changeState={this.changeState}
            />
          </div>
          <div className="col">
            <PaymentsDetails
              data={data}
              user={user}
              date={date}
              changeState={this.changeState}
            />
          </div>
        </div>
      </div>
    );
  }

  changeState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
}
