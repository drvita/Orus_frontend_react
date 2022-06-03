const confirm = (text, _make) => {
  window.Swal.fire({
    title: "Ventas",
    text,
    icon: "question",
    showCancelButton: true,
    // confirmButtonColor: "#007bff",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    // showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss) {
      if (_make) _make();
    }
  });
};


const getMethodName = (status) => {
  switch (status) {
    case 1:
      return "efectivo";
    case 2:
      return "tarjeta debito";
    case 3:
      return "tarjeta Credito";
    case 4:
      return "la marina";
    case 5:
      return "cheque";
    case 6:
      return "transferencia";
    default:
      return "otro";
  }
};

//TODO:GET SESSION(ERROR VARIABLE)//
const getSession = () => {
  return (
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(36).substring(2, 16) +
    Math.random().toString(10)
  );
};


const getForPay = (items, payments, discount) => {

  let pay = 0, total = 0;

  payments.forEach((payment)=>{
    pay += payment.total;
  })

  items.forEach((item)=>{
    total += item.subtotal;
  })
  
  return total - pay - discount;
}

const getSubTotal = (items)=> {

  //Suma de los items
  let subTotal = 0;
  items.forEach((item)=>{
    subTotal += item.subtotal;
  }) 
  console.log("SubTotal:", subTotal);
  return subTotal;
}


const getTotal = (subtotal, discount)=> {
  console.log("Subtotal:", subtotal);
  console.log("Descuento:", discount);
  
  //subtotal menos descuento
  return subtotal - discount;
}


const getPagado = (payments = []) => {
  let pagado = 0;
  payments.forEach((payment)=>{
    pagado += payment.total;
  })

  return pagado;
}

const toExport = {
  confirm,
  getMethodName,
  getSession,
  getForPay,
  getSubTotal,
  getTotal,
  getPagado,
};

export default toExport;
