import { useContext } from "react";
import { useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales";
import { SaleContext } from "../../../context/SaleContext";

export default function DiscountBtnComponent() {

  //const dispatch = useDispatch();

  const { sale, addDiscount } = useContext(SaleContext);

  //const btnDisabled = currentSale.total - data.pagado > 0 && currentSale.descuento === 0 && data.pagado === 0 ? false : true;
  //const paid = currentSale.total <= data.pagado ? true : false;

  //Functions
  const handleAddDiscount = () => {
    const discount = window.prompt("Agregue el descuento a aplicar"),
      isNumeric = /^[0-9]+$/gms,
      isPercen = /^[0-9]{2,3}%$/gms;

    let sum = 0;
    sale.items.forEach((item) => (sum += item.subtotal));

    if (discount.match(isNumeric)) {
      const value = parseInt(discount);


      //Save Sale en context
      addDiscount({
        id: sale.id,
        data: {
          ...sale,
          descuento: value,
          total: sum - value,
          items: JSON.stringify(sale.items),
          payments: null,
        },
      })

      
      //Add to redux
      /* dispatch(
        saleActions.saveSale({
          id: sale.id,
          data: {
            ...sale,
            descuento: value,
            total: sum - value,
            items: JSON.stringify(sale.items),
            payments: null,
          },
        })
      ); */
    } else if (discount.match(isPercen)) {

      const percent = parseInt(discount.replace("%", "")) / 100,
      value = parseInt(sum * percent);

      //Save Sale en context
      addDiscount(
        {
          id: sale.id,
          data: {
            ...sale,
            descuento: value,
            total: sum - value,
            items: JSON.stringify(sale.items),
            payments: null,
          },
        }
      )
      
      /* dispatch(
        saleActions.saveSale({
          id: sale.id,
          data: {
            ...sale,
            descuento: value,
            total: sum - value,
            items: JSON.stringify(sale.items),
            payments: null,
          },
        })
      ); */
    }
  };

  return (
    <button
      className="btn btn-primary mx-1"
      title="Agregar descuento"
      onClick={handleAddDiscount}
      //disabled={btnDisabled}
    >
      <i className="fas fa-percent"></i>
    </button>
  );
}
