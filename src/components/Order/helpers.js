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
const getBadgeStatus = (status) => {
  switch (status) {
    case 0:
      return (
        <span className="badge badge-light mr-2 text-uppercase">
          {handleStatusString(status)}
        </span>
      );
    case 1:
    case 2:
      return (
        <span className="badge badge-primary mr-2 text-uppercase">
          {handleStatusString(status)}
        </span>
      );
    case 3:
      return (
        <span className="badge badge-info mr-2 text-uppercase">
          {handleStatusString(status)}
        </span>
      );
    case 4:
      return (
        <span className="badge badge-secondary mr-2 text-uppercase">
          {handleStatusString(status)}
        </span>
      );
    default:
      return (
        <span className="badge badge-dark mr-2 text-uppercase">
          {handleStatusString(status)}
        </span>
      );
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
      removeDataTemporary(data.contact_id);
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
    // localStorage.setItem("OrusSystem", JSON.stringify(localToSave));
  },
  removeDataTemporary = (id, fn) => {
    // const local = getDataTemporary(),
    //   data = {
    //     ...local,
    //     orders: local.orders.filter((item) => item.id !== id),
    //   };
    // localStorage.setItem("OrusSystem", JSON.stringify(data));
    if (fn) fn();
  },
  getDataOneItem = (id) => {
    const local = getDataTemporary(),
      data = local.orders.filter((item) => item.id === id);
    if (data) {
    }
    return data[0] ?? {};
  };

const toExport = {
  handleStatusString,
  getBadgeStatus,
  handleDeleteOrder,
  handleSaveOrder,
  getDataTemporary,
  addDataTemporary,
  removeDataTemporary,
  getDataOneItem,
  getStatusType,
};

export default toExport;
