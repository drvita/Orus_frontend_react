import React, {Component} from "react";
import {connect} from "react-redux";

import moment from "moment";
import PaymentsDetails from "../Sales/views/reportPaymentsDetails";
import ReportPays from "../Sales/views/reportPays";
import ReportBank from "../Sales/views/reportBank";
//import Caja from "./cash";
import DateUser from "./dateUser";
import BoxCut from "./boxCut";
// Actions
import {defaultActions} from "../../redux/default/";

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        const ls = JSON.parse(localStorage.getItem("OrusSystem"));
        this.state = {
            host: ls.host,
            token: ls.token,
            user: !props.data.rol
                ? ""
                : props.data.idUser,
            date: moment().format("YYYY-MM-DD"),
            caja: 0,
            ventas: 0
        };
    }
    componentDidMount() {
        const {_setPageName} = this.props;

        _setPageName("panel de control");
    }

    render() {
        const {user, date, caja, ventas} = this.state;
        const {data} = this.props;
        return (
            <div className="content">
                <p className="h4 border-bottom mb-4">Bienvenido <span className="font-weight-bold"> {this.props.data.dataLoggin.name} </span> este es el resumen</p>
                <div className="row">

                    <div className="col col-md-12 col-lg-12">
                        <div className="row">
                            {
                                !data.rol
                                    ? (
                                        <div className="col-lg-12 col-md-12">
                                            <DateUser data={data} changeState={this.changeState}/>
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                </div>

                <p className="h4 border-bottom font-weight-bold mt-5">Información Rápida sobre pagos y ventas</p>
                <div className="row">

                    <div className="col-lg-12">
                      <BoxCut caja={caja} ventas={ventas}/>
                    </div>

                    <div className="col-lg-12 row">

                      <div className="col-lg-6">
                        <PaymentsDetails
                              data={data}
                              user={user}
                              date={date}
                              changeState={this.changeState}
                          />                  
                      </div>

                      <div className="col-lg-6">
                        <div className="col-lg-12">
                          <ReportBank data={data} user={user} date={date} changeState={this.changeState}/>
                        </div>
                        <div className="col-lg-12">
                          <ReportPays data={data} user={user} date={date} changeState={this.changeState}/>
                        </div>
                      </div>
                      
                    </div>                                                                 
                                     
                </div>
            </div>
        );
    }

    changeState = (name, value) => {
        this.setState({[name]: value});
    };
}

const mapStateToProps = ({default: system}) => {
        return {};
    },
    mapActionsToProps = {
        _setPageName: defaultActions.changeNamePage
    };

export default connect(mapStateToProps, mapActionsToProps)(DashboardComponent);
