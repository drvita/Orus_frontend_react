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

const toExport = {
  confirm,
};

export default toExport;
