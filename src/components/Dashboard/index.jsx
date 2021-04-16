import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";
import PaymentsDetails from "../Sales/reportPaymentsDetails";
import ReportPays from "../Sales/reportPays";
import ReportBank from "../Sales/reportBank";
import Caja from "./cash";
import DateUser from "./dateUser";
import BoxCut from "./boxCut";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: props.data.host,
      token: props.data.token,
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
          <div className="col col-md-3 col-lg-3">
            <ReportPays
              data={data}
              user={user}
              date={date}
              changeState={this.changeState}
            />
            <ReportBank
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
          {!data.rol ? (
            <div className="col">
              <div className="row">
                <div className="col">
                  <DateUser data={data} changeState={this.changeState} />
                </div>
                <div className="col">
                  <BoxCut caja={caja} ventas={ventas} />
                </div>
              </div>
              <div className="row">
                <Caja
                  data={data}
                  user={user}
                  date={date}
                  changeState={this.changeState}
                />
              </div>
            </div>
          ) : null}
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
