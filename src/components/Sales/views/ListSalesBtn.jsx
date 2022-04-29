import { useState } from "react";

//Context
import { Sale } from '../../../context/SaleContext';

//Components
import ListSalesModal from "./ListSalesModal";

export default function ListSalesBtn({ setSale: _setSale }) {

  const sale = Sale();

  const [data, setData] = useState(false);

  //Functions
  const handleShowListSales = () => {
      setData(true);
    },
    
    handleCloseListSales = () => {
      setData(false);
    },

    handleSelectSale = (saleSelected) => {

      console.log("Venta Seleccionada", saleSelected);

      let pagado = 0;
      saleSelected.payments.forEach((pay) => (pagado = pay.total));
      setData(false);   


      sale.set({
        id: saleSelected.id,
        //Revisar
        contact_id: saleSelected.customer.id,
        customer: saleSelected.customer,
        items: saleSelected.items,
        session: saleSelected.session,
        discount: saleSelected.discount,
        subtotal: saleSelected.subtotal,
        total: saleSelected.total,
        payments: saleSelected.payments,
        branch_id: saleSelected.branch.id,
        created_at: saleSelected.created_at,
      })
    };
    
  return (
    <>
      <button
        className="btn btn-primary mr-1"
        title="Cargar una venta"
        onClick={handleShowListSales}
      >
        <i className="fas fa-list"></i>
      </button>
      {data && (
        <ListSalesModal
          handleClose={handleCloseListSales}
          handleSelect={handleSelectSale}
        />
      )}
    </>
  );
}
