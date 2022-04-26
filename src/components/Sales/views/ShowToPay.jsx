import { useContext } from 'react';
import { Sale } from '../../../context/SaleContext';
import helpers from "../helpers.js";


export default function ShowToPay(){
    const sale = Sale();
    console.log(helpers.getForPay(sale.items, sale.payments, sale.discount));
    return(
        <>
            <span className="text-lg">Por pagar:</span>
            <label className="text-lg ml-1">
                ${helpers.getForPay(sale.items, sale.payments, sale.discount)}
            </label>
        </>
    )
}
