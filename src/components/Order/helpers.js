const handleStatusString = (status) => {
  switch (status) {
    case 0:
      return "procesando";
    case 1:
      return "laboratorio";
    case 2:
      return "bicelacion";
    case 3:
      return "terminado";
    case 4:
      return "entregado";
    default:
      return "garantia";
  }
};
const getStatusType = [
  "procesando",
  "laboratorio",
  "bicelacion",
  "terminado",
  "entregado",
];
const handleDeleteOrder = (order, options, _delete) => {
  if (order.id) {
    //Check sale
    if (order.estado) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El pedido tiene un proceso avanzado",
        icon: "warning",
      });
      return false;
    }
    if (order.nota) {
      window.Swal.fire({
        title: "Verificacion",
        text: "No se puede eliminar un pedido con una venta activa",
        icon: "warning",
      });
      return false;
    }
    //delete confirm
    window.Swal.fire({
      text: `¿Esta seguro de eliminar el pedido ${order.id}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss && _delete) {
        _delete({
          id: order.id,
          options,
        });
        console.log("[Orus System] Eliminando pedido: " + order.id);
        return true;
      }
    });
    return false;
  }
};
const handleSaveOrder = (id, data, options, _save, _erase) => {
  window.Swal.fire({
    title: "Almacenamiento",
    text: id
      ? `¿Esta seguro de actualizar el pedido ${id}?`
      : "¿Esta seguro de crear un nuevo pedido?",
    icon: "question",
    showCancelButton: true,
    //confirmButtonColor: "#007bff",
    confirmButtonText: id ? "Actualizar" : "Crear",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss && _save) {
      _save({
        data,
        id,
        options,
      });
      if (_erase) _erase();
    }
  });
};
const getDataTemporary = (field) => {
    const data = JSON.parse(localStorage.getItem("OrusSystem") ?? "");

    if (!data.orders) {
      data.orders = [];
    }

    return field ? data.orders : data;
  },
  addDataTemporary = (data) => {
    const local = getDataTemporary();
    let localToSave = {
      ...local,
      orders: local.orders.filter((item) => item.id !== data.id),
    };

    localToSave.orders.push(data);
    localStorage.setItem("OrusSystem", JSON.stringify(localToSave));
  },
  removeDataTemporary = (id, fn) => {
    const local = getDataTemporary(),
      data = {
        ...local,
        orders: local.orders.filter((item) => item.id !== id),
      };
    console.log("[DEBUG] delete item", id, data);
    localStorage.setItem("OrusSystem", JSON.stringify(data));
    if (fn) fn();
  },
  getDataOneItem = (id) => {
    const local = getDataTemporary(),
      data = local.orders.filter((item) => item.id === id);

    return data[0] ?? {};
  };

const toExport = {
  handleStatusString,
  handleDeleteOrder,
  handleSaveOrder,
  getDataTemporary,
  addDataTemporary,
  removeDataTemporary,
  getDataOneItem,
  getStatusType,
};

export default toExport;
