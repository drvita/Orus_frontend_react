import { useState } from "react";
import { useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales";
//Components
import ListSalesModal from "./ListSalesModal";

export default function ListSalesBtn({ setSale: _setSale }) {

  const [data, setData] = useState(false),

  dispatch = useDispatch();

  //Functions
  const handleShowListSales = () => {
      setData(true);
    },

    
    handleCloseListSales = () => {
      setData(false);
    },


    handleSelectSale = (sale) => {

      console.log("SALE", sale);

      let pagado = 0;

      sale.payments.forEach((pay) => (pagado = pay.total));

      setData(false);

      _setSale({
        pagado,
        order_id: sale.pedido,
      });


      //Add to redux
      //Guarda le venta individual seleccionada en REDUX//
      dispatch(
        saleActions.setSale({
          id: sale.id,
          customer: sale.customer,
          contact_id: sale.customer.id,
          items: sale.items,
          session: sale.session,
          descuento: sale.descuento,
          subtotal: sale.subtotal,
          total: sale.total,
          payments: sale.payments,
          pedido: sale.pedido,
          created_at: sale.created_at,
        })
      );
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
