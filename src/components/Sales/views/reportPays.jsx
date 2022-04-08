/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { dollarUS } from "../../../utils/current";
import { api, setUrl } from "../../../utils/url";

export default function ReportPays({ filters, changeState }) {
  const { user, date_end, date_start } = filters;

  const [state, setState] = useState({
    rol: user.roles,
    total: 0,
    efectivo: 0,
    page: 1,
    char: null,
  });

  const getSaleDay = async () => {
    const newFiltersPays = {
      ...filters,
    };

    newFiltersPays.itemsPage = 12;
    newFiltersPays.page = state.page;
    newFiltersPays.type = "methods";

    const reportPaysUrl = setUrl("payments", null, newFiltersPays);

    console.log("REPORT PAYS URL", reportPaysUrl);

    const { data, message } = await api(
      `payments?date_start=${date_start}&date_end=${date_end}&itemsPage=12&page=1&type=methods`
    );

    if (data) {
      var donutChartCanvas = window.$("#donutChart").get(0).getContext("2d"),
        donutOptions = {
          maintainAspectRatio: true,
          responsive: true,
        },
        labels = [],
        values = [],
        total = 0,
        efectivo = 0,
        donutData = {};

      if (state.char) state.char.destroy();

      if (!data.message) {
        if (data && data.length) {
          await data.map((mp) => {
            labels.push(mp.method);
            values.push(mp.total.toFixed(2));
            if (mp.method === "efectivo") {
              changeState("ventas", mp.total);
              efectivo = mp.total;
            }
            total += mp.total;
            return null;
          });
        } else {
          labels = ["No hay datos"];
          values = [0];
        }

        setState({
          ...state,
          total,
          efectivo,
        });
      } else {
        console.error("[ORUS] Error al cargar la venta del dia", data.message);
        labels = ["No hay datos"];
        values = [100];
      }
      donutData = {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#f56954",
              "#00a65a",
              "#f39c12",
              "#00c0ef",
              "#3c8dbc",
              "#d2d6de",
              "#000",
            ],
          },
        ],
      };
      state.char = new window.Chart(donutChartCanvas, {
        type: "pie",
        data: donutData,
        options: donutOptions,
      });
    } else {
      window.Swal.fire({
        title: "Error!",
        text: "Ups!\n Hubo un error al descargar las ventas",
        icon: "error",
        confirmButtonText: "Ok",
      });

      return message;
    }
  };

  useEffect(() => {
    getSaleDay();
  }, [filters]);

  return (
    <div className="card card-success card-outline">
      <div className="card-header">
        <h3 className="card-title text-success">
          {state.rol
            ? "Mis ventas del dia por metodo de pago"
            : "Ventas del dia por metodo de pago"}
        </h3>
      </div>
      <div className="card-body">
        <canvas id="donutChart"></canvas>
        <p>
          {!state.rol ? (
            <React.Fragment>
              Venta: <strong>{dollarUS.format(state.total)}</strong>
              <br />
            </React.Fragment>
          ) : null}
          Efectivo: <strong>{dollarUS.format(state.efectivo)}</strong>
        </p>
      </div>
    </div>
  );
}
