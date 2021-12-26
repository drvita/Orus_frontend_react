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

const toExport = {
  confirm,
  getMethodName,
  getSession,
};

export default toExport;

/*
function makeItems(items) {
  const itemToBack = items.map((item) => ({
    ...item,
    cant: item.cantidad,
    out: 0,
    price: item.precio,
  }));

  return itemToBack;
}
*/
