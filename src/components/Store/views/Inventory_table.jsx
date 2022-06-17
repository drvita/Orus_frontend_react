import { useState } from "react";
import { Link } from "react-router-dom";
import SetQantityModal from "./SetQantityModal";
import useStore from "../../../hooks/useStore";

export default function InventoryTableView({ header, body, items }) {

  const [state, setState] = useState({
    item:{},
    showModal: false,
    newQantity: 0,
  })

  const hookStore = useStore();

  const setQantity = (e)=>{
    setState({
      ...state,
      newQantity: e.target.value,
    })
  }

  const saveNewQantity = ()=>{
    const data = {
      product_id: state.item.id,
      branch_default: state.item.branch_default,
      cant: state.newQantity,
    }
    hookStore.saveQantity(data).then((data)=>{
      if(data){
        setState({
          ...state,
          showModal:false,
        });
        window.Swal.fire({
          title: "Inventario",
          text: "Cantidad asignada correctamente",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#007bff",
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
        });

      }else{
        window.Swal.fire({
          title: "Inventario",
          text: "Error al cambiar la cantidad",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#007bff",
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
        })
      }
    })
  }



  return (
    <div className="table-responsive" style={{height:'100vh'}}>
      <table className="table table-sm table-bordered table-hover">
        <thead>
          <tr>
            <th>/</th>
            {header}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => {
            const zero = row.props.children.type === "label" ? true : false;
            return (
              <tr className={zero ? "table-secondary" : ""} key = {i}>
                {row}
                {header.map((h, i) => {
                  let grad = zero
                    ? parseFloat(row.props.children.props.children)
                        .toFixed(2)
                        .replace(".", "")
                    : parseFloat(row.props.children)
                        .toFixed(2)
                        .replace(".", "");
                  if (parseInt(grad) >= 0) grad = "+" + grad;
                  grad += parseFloat(h.props.children)
                    .toFixed(2)
                    .replace(/[-.]/g, "");

                  return (
                    <td key={grad + i} className="text-center">
                      {items.length ? (
                        items.map((item, index) => {                          
                          return grad === item.grad ? (
                            <div key={index}>
                              {item.cant_total ? (
                                <span
                                  onClick={()=>{
                                    setState({
                                      ...state,
                                      item: item,
                                      showModal: true,
                                    })                                                                        
                                  }}
                                  style={{cursor:"pointer"}}
                                  title = {item.grad}
                                  key={item.id + index}
                                  className={                        
                                    item.cant > 0 ? "badge badge-success" : "badge badge-danger"
                                  }
                                >   
                                 {item.cant_total}                                  
                                </span>
                              ) : null}
                            </div>
                          ) : null;
                        })
                      ) : (
                        <Link to="/almacen/registro">
                          <i className="fas fa-plus text-secondary"></i>
                        </Link>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {state.showModal ? (
        <SetQantityModal
         item = {state.item}
         setCantidad = {setQantity}
         saveQantity = {saveNewQantity}
         newQantity = {state.newQantity}
         handleClose = {()=>setState({
          ...state,
          showModal: false,
         })}
        />
      ) : null}

    </div>
  );
}
