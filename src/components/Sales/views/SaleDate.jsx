import { Sale } from "../../../context/SaleContext";
import moment from "moment";

export default function CustomerBtnComponent() {

    const sale = Sale();
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
            </>
            ) : null}
        </div>
    );
}
