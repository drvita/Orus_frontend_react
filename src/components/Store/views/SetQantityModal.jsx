import { useState } from "react";
import useStore from "../../../hooks/useStore";

function SetQantityModal({item, handleClose, handleUpdateItems}) {

  const [cantidad, setCantidad] = useState(0);
  const hookStore = useStore();

  const saveQantity = ()=>{

    const data = {
      product_id: item.id,
      //branch_default: state.item.branch_default,
      cant: cantidad,
    };

    hookStore.saveQantity(data).then((data)=>{
      if(data){
        handleClose(data.data);
      }
      else{
        console.error("Error al guardar la cantidad");
      }
    })
  };

    return (
        <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Asignar Cantidad</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
  
            <div className="modal-body p-2">
                <h5 className="text-center mt-2 mb-3"><span class="badge badge-info">{item.name.toUpperCase()}</span></h5>
                <h6 className="text-center font-weight-bold">Cantidad actual: <span className="font-weight-normal">{item.cant}</span></h6>
                <div className="">
                    <label>Cantidad</label>
                    <input 
                        name = "price" 
                        type="number" 
                        defaultValue={0} 
                        className="form-control" 
                        placeholder="Cantidad" 
                        onChange={(e)=>setCantidad(e.target.value)}                        
                    />
                </div>                        
            </div>
  
            <div className="modal-footer">
             <button type="button" className="btn btn-default" onClick={handleClose}>
                <i className="fas fa-ban mr-1"></i>
                Cancelar
              </button>
  
              <button type="button" className="btn btn-success" disabled = { cantidad <= 0 || cantidad === '0' || !cantidad ? true : false} onClick={saveQantity}>
                Asignar
              </button>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default SetQantityModal;
  



 