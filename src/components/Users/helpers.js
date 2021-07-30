const validInputs = (body) => {
    const REGEXUSER =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      REGEXPASS = /^(?=.*[A-Z])(?=.*[!@#$&.*])(?=.*[0-9])(?=.*[a-z]).{8,16}$/,
      { email: U, password: P } = body;

    if (REGEXUSER.test(U)) {
      if (REGEXPASS.test(P)) {
        return {
          isValid: true,
        };
      } else {
        console.error("[Orus System] Fallo validacion de password");
        return {
          isValid: false,
          msg: "Los datos introducidos no son validos",
          input: "password",
        };
      }
    } else {
      console.error("[Orus System] Fallo validacion de email");
      return {
        isValid: false,
        msg: "Los datos introducidos no son validos",
        input: "email",
      };
    }
  },
  getNameRol = (rolNumber) => {
    switch (rolNumber) {
      case 0: {
        return "Administracion";
      }
      case 1: {
        return "Ventas";
      }
      case 2: {
        return "Optometria";
      }
      default:
        return "Indefinido";
    }
  };
const handleDelete = (item, options, _delete, text) => {
  if (item.id) {
    //Check text
    if (!text) text = `¿Esta seguro de eliminar el usuario ${item.username}?`;
    //delete confirm
    window.Swal.fire({
      text,
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
        return true;
      }
    });
    return false;
  }
};
const handleSave = (id, data, options, _save, _close, text) => {
  if (!text) {
    text = id
      ? "¿Esta seguro de actualizar el usuario?"
      : "¿Esta seguro de crear un nuevo usuario?";
  }
  window.Swal.fire({
    title: "Almacenamiento",
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    confirmButtonText: id ? "Actualizar" : "Crear",
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
  validInputs,
  getNameRol,
  handleDelete,
  handleSave,
};

export default toExport;
