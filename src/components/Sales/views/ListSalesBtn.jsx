import { useState } from "react";
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
      console.log("Venta seleccionada", saleSelected);
      let pagado = 0;
      saleSelected.payments.forEach((pay) => (pagado = pay.total));
      setData(false);      
      //setSale(sale);
      sale.set(saleSelected);
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
