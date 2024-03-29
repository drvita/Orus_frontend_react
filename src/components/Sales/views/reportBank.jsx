/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { dollarUS } from "../../../utils/current";
import { api, setUrl } from "../../../utils/url";

export default function ReportBank({ filters }) {
  const [state, setState] = useState({
    listBank: [],
    page: 1,
    data: [],
    load: false,
  });

  const getSaleDay = async () => {
    const bankFilters = {
      ...filters,
      itemsPage: 12,
      type: "banks",
    };
    setState({
      ...state,
      load: true,
    });

    const bankUrls = setUrl("payments", null, bankFilters);
    const { data, message } = await api(bankUrls);

    if (data) {
      setState({
        ...state,
        data: data,
        load: false,
      });
    } else if (message) {
      setState({
        ...state,
        load: false,
      });
      console.error("[Orus system] Error in report payments details:", message);
      window.Swal.fire("Fallo de conexion", message, "error");
    }
  };

  useEffect(() => {
    getSaleDay();
  }, [
    filters.user_id,
    filters.date_start,
    filters.date_end,
    filters.branch_id,
  ]);

  return (
    <div className="card card-success card-outline">
      <div className="card-header">
        <h3 className="card-title text-success">
          Detallado de pagos bancarios
        </h3>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {state.data.length ? (
            state.data.map((bank, i) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={i}
                >
                  <label className="text-uppercase">{bank.name}</label>
                  <span className="badge badge-primary">
                    {dollarUS.format(bank.total)}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <h6 className="text-warning">
                <i className="fas fa-info mr-2"></i>
                No hay datos para este dia
              </h6>
            </li>
          )}
        </ul>
      </div>
      {state.load && (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      )}
    </div>
  );
}
