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

  return <div className="load" style={{
    position:'absolute',
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    }}>      
      <h1 style={{color:'white', marginBottom:'5%'}}>IMPRESION EN CURSO</h1>
      <i className="fas fa-print fa-6x"></i>      
  </div>;
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
