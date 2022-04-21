import { useContext } from 'react';
import { SaleContext } from '../../../context/SaleContext';
import helpers from "../helpers.js";


export default function ShowToPay(){

    const { sale, setTotal } = useContext(SaleContext);

    /* setTotal(helpers.getTotal(sale.items, sale.total)); */

    return(
        <>
            <span className="text-lg">Por pagar:</span>
            <label className="text-lg ml-1">
                ${helpers.getForPay(sale.items, sale.payments, sale.descuento)}
            </label>
        </>
    )
}
