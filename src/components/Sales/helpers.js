const confirm = (text, _make) => {
  window.Swal.fire({
    title: "Ventas",
    text,
    icon: "question",
    showCancelButton: true,
    //confirmButtonColor: "#007bff",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
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

const toExport = {
  confirm,
  getMethodName,
};

export default toExport;
