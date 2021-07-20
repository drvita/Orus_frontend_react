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
const handleVerifyData = (data, codeRef) => {
  const {
    category_id,
    category_id1,
    category_id2,
    category_id4,
    supplier,
    brand_id,
    code,
  } = data;

  if (!category_id) {
    window.Swal.fire(
      "Verificación",
      "Selecione una categoria primero",
      "warning"
    );
    return false;
  }

  if (category_id) {
    if (category_id1 === 1 && category_id4 !== category_id) {
      window.Swal.fire(
        "Verificación",
        "Selecione una categoria valida para lentes",
        "warning"
      );
      return false;
    } else if (category_id1 === 2 && category_id2 !== category_id) {
      window.Swal.fire(
        "Verificación",
        "Selecione una categoria valida para armazones",
        "warning"
      );
      return false;
    }
  }

  if (category_id1 === 2 && !supplier) {
    window.Swal.fire(
      "Verificación",
      "Selecione un PROVEEDOR valido primero",
      "warning"
    );
    return false;
  }
  if (category_id1 === 2 && !brand_id) {
    window.Swal.fire(
      "Verificación",
      "Selecione una MARCA valida primero",
      "warning"
    );
    return false;
  }
  if (!code && !codeRef.current.value) {
    window.Swal.fire(
      "Verificación",
      "Escriba una CODIGO para este producto",
      "warning"
    );
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
const handleSaveItem = (id = null, data, options, _save, _close) => {
  return window.Swal.fire({
    title: "Almacenamiento",
    text: data.id
      ? "¿Esta seguro de actualizar el producto?"
      : "¿Esta seguro de crear un nuevo producto?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    confirmButtonText: data.id ? "Actualizar" : "Crear",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss && _save) {
      //Save
      _save({
        id,
        data,
        options,
      });
      //close
      if (_close) _close();
    }
  });
};

const toExport = {
  verifyItem,
  handleDeleteItem,
  handleVerifyData,
  handleSaveItem,
};

export default toExport;
