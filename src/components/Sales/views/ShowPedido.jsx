import {useContext } from "react";
import { SaleContext } from "../../../context/SaleContext"
import { useHistory } from "react-router-dom";

export default function ShowPedido(){

    const saleContext = useContext(SaleContext);

    const history = useHistory();

    const watchOrder = ()=>{        
        history.push(`/pedidos/${saleContext.order}`)   
    };

    return(
        <div>
            <button
                className="btn btn-info mr-2"
                title="Pedido"
                disabled = {saleContext.order ? false : true}     
                onClick={watchOrder}                                     
            >
                <i className="fas fa-file-alt"></i>
             </button>          
        </div>
    
    


    )
};