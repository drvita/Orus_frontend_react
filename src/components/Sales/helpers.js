const confirm = (text, _make) => {
  window.Swal.fire({
    title: "Ventas",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
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

const getForPay = (items, payments, discount = 0) => {
  if (!items || !Array.isArray(items) || !items.length) {
    return 0;
  }

  if (!Array.isArray(payments)) {
    payments = [];
  }

  const paid = payments.reduce((b, p) => b + p.total, 0);
  const total = items.reduce((b, p) => b + p.subtotal, 0);

  return total - paid - discount;
};

const getSubTotal = (items) => {
  if (!items || !items.length) {
    return 0;
  }

  return items.reduce((b, p) => b + p.subtotal, 0);
};

const getTotal = (subtotal, discount) => {
  return subtotal - discount;
};

const getPagado = (payments = []) => {
  if (!payments || !payments.length) {
    return 0;
  }

  return payments.reduce((b, p) => b + p.total, 0);
};

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
