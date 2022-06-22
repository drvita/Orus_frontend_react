/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import HTMLOrderPrint from "./views/SaleHTML";

export default function PrintSaleComponent(props) {
  const handleClose = () => {
    console.log("[DEBUG] afterprint event");
    props.setPrint();
  };

  useEffect(() => {
    console.log("[DEBUG] Print component start", props.data);

    if (!props.data) {
      console.error("[Orus System] Data is parameter required");
      return;
    }

    const popup = window.open(
      "",
      "_blank",
      "fullscreen=1,menubar=0,resizable=0,scrollbars=0,titlebar=0,toolbar=0,top=0,left=300"
    );

    popup.document.write(getPage(props.data));
    popup.window.print();

    popup.onbeforeunload = function () {
      console.log("[DEBUG] Befor close pop up");
      handleClose();
    };
  }, []);

  return <div className="load">Loading...</div>;
}

function getPage(data) {
  const card = HTMLOrderPrint(data ?? {}, {});
  const body = `<div class="mx-auto" style="width:380px, background-color:red">${card}</div>`;

  return `<html>
        <head>
            <title>Pedido # ${data.id}</title>            
        </head>
        <body style="display:flex; justify-content: center; align-items:center">
            ${body}
        </body>
    </html>`;
}
