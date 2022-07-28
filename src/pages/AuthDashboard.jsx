import { useState, useContext } from "react";
import moment from "moment";

import PaymentsDetails from "../components/Sales/views/reportPaymentsDetails";
import ReportPays from "../components/Sales/views/reportPays";
import ReportBank from "../components/Sales/views/reportBank";
import Filters from "../components/dashboard/Filters";
import BoxCut from "../components/dashboard/boxCut";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  const [state, setState] = useState({
    user: 0,
    date_start: moment().startOf("week").format("YYYY-MM-DD"),
    date_end: moment().format("YYYY-MM-DD"),
    branch_id: auth.branch.id,
    ventas: 0,
  });
  // Function
  const changeAllState = (obj) => {
    if (typeof obj !== "object") {
      console.log("[Orus system] The filters data not is a object:", obj);
      return;
    }

    setState({
      ...state,
      ...obj,
    });
  };

  return (
    <div className="content" style={{ minHeight: "100vh" }}>
      <p className="h4 border-bottom mb-4">
        Bienvenido
        <span className="font-weight-bold mx-2 text-capitalize">
          {auth.name.toLowerCase()}
        </span>
        este es el resumen.
      </p>

      <div className="row">
        <div className="col col-md-12 col-lg-12">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Filters filters={state} changeState={changeAllState} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <BoxCut ventas={state.ventas} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <ReportPays
                filters={state}
                changeState={changeAllState}
                auth={auth}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <ReportBank filters={state} changeState={changeAllState} />
            </div>
            <div className="col-lg-8 col-md-12">
              <PaymentsDetails filters={state} changeState={changeAllState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
