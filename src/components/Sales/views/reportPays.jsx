/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { dollarUS } from "../../../utils/current";
import { api, setUrl } from "../../../utils/url";

export default function ReportPays({ filters, changeState, auth }) {
  const [state, setState] = useState({
    rol: auth.roles,
    total: 0,
    efectivo: 0,
    char: null,
    load: false,
  });

  const getSaleDay = async () => {
    setState({
      ...state,
      load: true,
    });

    const newFiltersPays = {
      ...filters,
      itemsPage: 20,
      type: "methods",
    };

    const url = setUrl("payments", null, newFiltersPays);
    const { data, message } = await api(url);

    console.log("[Orus System] Creating char");
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
            values.push(Number(mp.total || 0).toFixed(2));
            if (mp.method === "efectivo") {
              efectivo = Number(mp.total || 0);
            }
            total += Number(mp.total || 0);
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
          load: false,
        });
      } else {
        console.error("[ORUS] Error al cargar la venta del dia", data.message);
        labels = ["No hay datos"];
        values = [100];
        setState({
          ...state,
          load: false,
        });
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
      setState({
        ...state,
        load: false,
      });

      return message;
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

  useEffect(() => {
    changeState({ ventas: state.efectivo });
  }, [state.efectivo]);

  return (
    <div className="card card-success card-outline">
      <div className="card-header">
        <h3 className="card-title text-success">
          Ventas del dia por metodo de pago
        </h3>
      </div>
      <div className="card-body">
        <canvas id="donutChart"></canvas>
        <p>          
          Venta total: <strong>{dollarUS.format(state.total)}</strong>
          <br/>
          Efectivo: <strong>{dollarUS.format(state.efectivo)}</strong>
        </p>
      </div>
      {state.load && (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      )}
    </div>
  );
}
