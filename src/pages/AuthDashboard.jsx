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
    currentUser: 0,
    date_start: moment().startOf("week").format("YYYY-MM-DD"),
    date_end: moment().format("YYYY-MM-DD"),
    branch_id: auth.branch.id,
    ventas: 0,
    filterData: {},
  });

  const filtersState = {
    currentUser: state.currentUser,
    date_start: state.date_start,
    date_end: state.date_end,
    branch_id: state.branch_id,
  };

  const changeAllState = (obj) => {
    console.log("Filters Seted up", obj);
    if (typeof obj !== "object") {
      console.error("[Orus system] The filters data not is a object:", obj);
      return;
    }

    setState({
      ...state,
      ...obj,
    });
  };

  return (
    <div className="content">
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
              <Filters filters={filtersState} changeState={changeAllState} />
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
              <ReportPays filters={filtersState} changeState={changeAllState} />
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <ReportBank filters={filtersState} changeState={changeAllState} />
            </div>
            <div className="col-lg-8 col-md-12">
              <PaymentsDetails
                filters={filtersState}
                changeState={changeAllState}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
