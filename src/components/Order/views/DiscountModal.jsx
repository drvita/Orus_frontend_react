import { useState } from "react";

export default function DiscountModal({sale, total, setDiscountProp, closeModal: _closeModal}){

    const [discount, setDiscount] = useState(0);

    const setDdiscount = ()=>{

        const  isNumeric = /^[0-9]+$/gms;
        const isPercen = /^[0-9]{2,3}%$/gms;


        if(discount === null){
            return null;
          }else{

            let sum = total;

            if (discount.match(isNumeric)) {
              const value = parseInt(discount); 
              console.log("Value devuleto:", value);  
              setDiscountProp(value)   

            } else if (discount.match(isPercen)) {
              const percent = parseInt(discount.replace("%", "")) / 100,
              value = parseInt(sum * percent);
              console.log("Value devuleto:", value);  
              setDiscountProp(value);
            }
          }
    }

    return (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

                
              <div className="modal-header">
                <h5 className="modal-title">
                    Descuento
                </h5>
                <button type="button" className="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body p-2">
                  <input value={discount} className="form-control" type="text" onChange={(e)=>{
                      const target = e.target;
                      const {name, value} = target;   
                      console.log(value);
                      setDiscount(value);
                  }}/>
                  <p className="ml-1 text-info mt-2">*Escribe la cantidad o el porcentaje con un "%" al final</p>
              </div>

              <div className="modal-footer">    
                  <button className="btn btn-danger" onClick={_closeModal}>Cancelar</button>
                  <button className="btn btn-success" onClick={setDdiscount}>Aplicar</button>
              </div>

            </div>
          </div>
        </div>
      );
}