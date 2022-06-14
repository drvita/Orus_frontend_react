//import { configActions } from "../../redux/config";

function saveConfig(data, options, dispatch) {
  window.Swal.fire({
    title: "Almacenamiento",
    text: data.id
      ? `¿Esta seguro de actualizar la sucursal ${data.name}?`
      : "¿Esta seguro de crear una nueva sucursal?",
    icon: "question",
    showCancelButton: true,
    //confirmButtonColor: "#007bff",
    confirmButtonText: data.id ? "Actualizar" : "Crear",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss) {
      //TODO: Redu eliminado
      /* dispatch(
        configActions.saveConfig({
          data: {
            name: "branches",
            value: {
              name: data.name,
              address: data.address,
              phone: data.phone,
            },
          },
          id: data.id,
          options,
        })
      ); */
    }
  });
}

function deleteConfig(id, options, name, dispatch) {
  window.Swal.fire({
    title: "Almacenamiento",
    text: `¿Esta seguro de ELIMINAR la sucursal ${name}?`,
    icon: "question",
    showCancelButton: true,
    //confirmButtonColor: "#007bff",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss) {
      //TODO: Redu eliminado
      /* dispatch(
        configActions.deleteConfig({
          id,
          options,
        })
      ); */
    }
  });
}

function verifyData(data) {
  if (data.name.length <= 3) {
    window.Swal.fire({
      title: "Verificacion",
      text: "Por favor escriba un nombre valido para la sucursal",
      icon: "warning",
    });
    return false;
  }
  if (data.address.length <= 3) {
    window.Swal.fire({
      title: "Verificacion",
      text: "Por favor escriba un domicilio valido para la sucursal",
      icon: "warning",
    });
    return false;
  }
  if (data.phone.length !== 10) {
    window.Swal.fire({
      title: "Verificacion",
      text: "Por favor escriba un numero telefonico a 10 numeros",
      icon: "warning",
    });
    return false;
  }

  return true;
}

const toExport = {
  deleteConfig,
  saveConfig,
  verifyData,
};
export default toExport;
