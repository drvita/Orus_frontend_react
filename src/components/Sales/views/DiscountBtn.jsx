//TODO: Componente de discount Button

import { useDispatch } from "react-redux";
import { saleActions } from "../../../redux/sales";

export default function DiscountBtnComponent({ sale, paid, btnDisabled }) {

  //console.log("---------",sale, paid)
  const dispatch = useDispatch();
  //Functions
  const handleAddDiscount = () => {
    const discount = window.prompt("Agregue el descuento a aplicar"),
      isNumeric = /^[0-9]+$/gms,
      isPercen = /^[0-9]{2,3}%$/gms;

    let sum = 0;
    sale.items.forEach((item) => (sum += item.subtotal));

    if (discount.match(isNumeric)) {
      const value = parseInt(discount);
      //Add to redux
      dispatch(
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
      );
    } else if (discount.match(isPercen)) {
      const percent = parseInt(discount.replace("%", "")) / 100,
        value = parseInt(sum * percent);
      dispatch(
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
      );
    }
  };


  
  // const
  const total = sale.total - sale.pagado;
  

  return (
    <button
      className="btn btn-primary mx-1"
      title="Agregar descuento"
      onClick={handleAddDiscount}
     /*  disabled={!total || paid} */
      disabled={btnDisabled}
    >
      <i className="fas fa-percent"></i>
    </button>
  );
}
