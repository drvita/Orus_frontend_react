import { useContext } from 'react';
import { SaleContext } from '../../../context/SaleContext';

export default function ShowTotal(){
    const { sale } = useContext(SaleContext);
    return(
        <>
            <span className="text-lg">Total:</span>
            <label className="text-lg ml-1">${sale.total}</label>
        </>    
    )
}
