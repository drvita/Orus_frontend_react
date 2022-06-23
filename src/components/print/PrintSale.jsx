/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import HTMLOrderPrint from "./views/SaleHTML";

import { Auth } from "../../context/AuthContext";

export default function PrintSaleComponent(props) {
  const { auth: currentUser } = Auth();
  const currentBranch = currentUser.branch;
  const handleClose = () => {
    props.setPrint();
  };

  useEffect(() => {
    if (!props.data) {
      console.error("[Orus System] Data is parameter required");
      return;
    }

    const popup = window.open(
      "",
      "_blank",
      "fullscreen=1,menubar=0,resizable=0,scrollbars=0,titlebar=0,toolbar=0,top=0,left=300"
    );

    popup.document.write(getPage(props.data, currentBranch));
    popup.window.print();

    popup.onbeforeunload = function () {
      handleClose();
    };
  }, []);

  return <div className="load">Loading...</div>;
}

function getPage(data, branch) {
  const card = HTMLOrderPrint(data ?? {}, branch);
  const body = `<div style="width:280px; padding: 0px; margin: 0px; border:1px dotted #DDD">${card}</div>`;

  return `<html>
        <head>
            <title>${
              data.order_id ? "Pedido #" + data.order_id : "Venta #" + data.id
            }</title>            
        </head>
        <body style="display:flex; justify-content: center; align-items:center">
            ${body}
        </body>
    </html>`;
}
