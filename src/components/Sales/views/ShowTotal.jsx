import { Sale } from '../../../context/SaleContext';

export default function ShowTotal(){
    const sale = Sale();
    return(
        <>
            <span className="text-lg">Total:</span>
            <label className="text-lg ml-1">${sale.subtotal}</label>
        </>    
    )
}
