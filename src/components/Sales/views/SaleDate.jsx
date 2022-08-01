import { Sale } from "../../../context/SaleContext";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function CustomerBtnComponent() {    

    const sale = Sale();

    const history = useHistory();

    const watchOrder = ()=>{        
        history.push(`/pedidos/${sale.order}`);
    }

    return(
        <div>
            <label className="mx-1">Folio:</label>
            <span className="mx-1">{sale.id ? sale.id : "Nuevo"}</span> 
            <label className="mx-1">Fecha:</label>
            <span className="mx-1">
            {moment(sale.created_at).format("L")}
            </span>
            {sale.order ? (
            <>
                <label className="mx-1">Pedido:</label>
                <span className="mx-1">{sale.order}</span>             
                <span class="btn btn-info btn-sm" onClick={watchOrder}> <i className="fas fa-eye"></i> Ver pedido</span>             
            </>
            ) : null}
        </div>
    );
}
