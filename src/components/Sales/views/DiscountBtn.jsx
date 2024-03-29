//Context
import { Sale } from '../../../context/SaleContext';

//Helper
import helper from '../helpers';

export default function DiscountBtnComponent() {

  const sale = Sale();
  const pagado = helper.getPagado(sale.payments);
  const btnDisabled = sale.subtotal - pagado > 0 && sale.discount === 0 && pagado === 0 ? false : true;


  //Functions
  const handleAddDiscount = () => {
    const discount = window.prompt("Agregue el descuento a aplicar"),
      isNumeric = /^[0-9]+$/gms,
      isPercen = /^[0-9]{2,3}%$/gms;

      if(discount === null){
        return null;
      }else{
        let sum = 0;
        sale.items.forEach((item) => (sum += item.subtotal));

        if (discount.match(isNumeric)) {
          const value = parseInt(discount);
          
          sale.set({
            ...sale,
            discount: value,
            total: sale.subtotal - value,
          });

        } else if (discount.match(isPercen)) {
          const percent = parseInt(discount.replace("%", "")) / 100,
          value = parseInt(sum * percent);          
          sale.set({
            ...sale,
            discount: value,  
            total: sale.subtotal - value,               
          })          
        }
      }
  };

  return (
    <button
      className="btn btn-primary mx-1"
      title="Agregar descuento"
      onClick={handleAddDiscount}
      disabled={btnDisabled}
    >
      <i className="fas fa-percent"></i>
    </button>
  );
}
