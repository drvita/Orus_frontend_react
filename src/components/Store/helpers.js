const verifyItem = (item) => {
  if (item.cantidad <= 0) {
    window.Swal.fire({
      title: "Verificacion",
      text: "La cantidad debe de ser un valor valido",
      icon: "warning",
    });
    return false;
  }
  if (!item.store_items_id) {
    window.Swal.fire({
      title: "Verificacion",
      text: "No se selecciono un producto valido",
      icon: "warning",
    });
    return false;
  }
  if (!item.precio) {
    window.Swal.fire({
      title: "Verificacion",
      text: "El precio no es valido",
      icon: "warning",
    });
    return false;
  }

  return true;
};
const handleDeleteItem = (item, options, _delete) => {
  if (item.id) {
    //Check sale

    //delete confirm
    window.Swal.fire({
      text: `¿Esta seguro de eliminar el producto ${item.code}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss && _delete) {
        _delete({
          id: item.id,
          options,
        });
        console.log("[Orus System] Eliminando producto: " + item.id);
        return true;
      }
    });
    return false;
  }
};

const toExport = {
  verifyItem,
  handleDeleteItem,
};

export default toExport;
