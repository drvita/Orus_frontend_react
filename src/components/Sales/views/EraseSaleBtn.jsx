import {useContext} from 'react';
import { useDispatch } from "react-redux";
//import { saleActions } from "../../../redux/sales/index.js";
import { Sale } from '../../../context/SaleContext';
//import { SaleContext } from "../../../context/SaleContext.js";
import helpers from "../helpers.js";

export default function EraseSaleBtnComponent({ /* sale *//*  defaultState, */ /* erase: _erase, */ }) {

  const dispatch = useDispatch();
  
  const { sale, resetSale } = Sale();

  const disabled = sale.customer.id || sale.items.length ? false : true;

  //console.log("ITEMS VALIDATION", sale.customer.id || sale.items.length ? false : true);



  //Functions
  const eraseSale = () => {

      /* dispatch(
        saleActions.setSale({
          ...defaultState.sale,
          session: helpers.getSession(),
          created_at: new Date(),
        })
      ); */

      /* _erase(); */

      resetSale()
      
    },


    handleEraseSale = () => {
      helpers.confirm(
        "¿Desea terminar esta venta y crear una nueva?",
        eraseSale
      );
    };

  return (
    <button
      className="btn btn-warning ml-1"
      title="Nueva venta"
      onClick={handleEraseSale}
      disabled={ disabled }
    >
      <i className="fas fa-window-close"></i>
    </button>
  );
}
