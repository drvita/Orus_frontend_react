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


const getForPay = (items, payments)=>{

  let pay = 0, total = 0;

  payments.forEach((payment)=>{
    pay += payment.total;
  })

  items.forEach((item)=>{
    total += item.subtotal;
  })

  return total - pay;
}

const getTotal = (items)=> {
  let total = 0;
  items.forEach((item)=>{
    total += item.subtotal;
  })
  return total;
}


const getPagado = (payments = []) => {
  let pagado = 0;

  console.log("PAYMENTS---", payments)

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
  getTotal,
  getPagado,
};

export default toExport;
