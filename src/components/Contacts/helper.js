/* eslint-disable no-useless-escape */
const patternEmail =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/i;

const handleVerificationData = (data, showMsg = true) => {
  const { name, email, birthday, phone, type } = data,
    patternName =
      /^[A-ZÁÉÍÓÚñáéíóúÑ]+\s[A-ZÁÉÍÓÚñáéíóúÑ]{2,}(\s?[A-ZÁÉÍÓÚñáéíóúÑ]+){1,}/gim,
    patternPhone = /^\d{10}$/gim;

  if (!type && !patternName.test(name)) {
    if (showMsg) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El nombre del contacto es erroneo",
        icon: "warning",
      });
    }
    return {
      result: false,
      name: "name",
    };
  }
  if (!patternEmail.test(email)) {
    if (showMsg) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El correo electrónico del contacto es erroneo",
        icon: "warning",
      });
    }

    return {
      result: false,
      name: "email",
    };
  }

  let telefonoVerify = patternPhone.test(phone);

  if (!type && !telefonoVerify) {
    if (showMsg) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El numero de contacto es erroneo",
        icon: "warning",
      });
    }

    return {
      result: false,
      name: "telnumbers",
    };
  }

  const date = new Date(birthday),
    today = new Date(),
    anos = today.getFullYear() - date.getFullYear();

  if (!type && (!birthday || anos < 1)) {
    if (showMsg) {
      window.Swal.fire({
        title: "Verificacion",
        text: "La fecha de nacimiento es erronea",
        icon: "warning",
      });
    }

    return {
      result: false,
      name: "bithday",
    };
  }

  return {
    result: true,
  };
};

const saveContact = (title = "contacto", data, _save, id = null) => {
  window.Swal.fire({
    title: "Almacenamiento",
    text: id
      ? `¿Esta seguro de actualizar al ${title}?`
      : `¿Esta seguro de crear un nuevo ${title}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: id ? "Actualizar" : "Crear",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss && _save) {
      _save({
        id,
        data,
      });
    }
  });
};

const changeDataInput = (input, data, _setData) => {
  const { name, value } = input;
  let val = value;

  if (name === "telnumbers") {
    val = {
      ...data.telnumbers,
      t_movil: value,
    };
  }

  _setData({
    ...data,
    [name]: val,
  });
};

const dataPrimary = {
  name: "",
  telnumbers: { t_casa: "", t_oficina: "", t_movil: "" },
  email: "",
  birthday: "",
  type: 0,
  business: 0,
  gender: "female",
};

const handleGetDataObject = (key, value, verification) => {
  switch (key) {
    case "name":
      return {
        name: value,
        verification: {
          ...verification,
          name: true,
        },
      };
    case "email":
      return {
        email: value,
        verification: {
          ...verification,
          email: true,
        },
      };
    case "birthday":
      return {
        birthday: value,
        verification: {
          ...verification,
          birthday: true,
        },
      };
    case "telefonos":
      return {
        telefonos: value,
        verification: {
          ...verification,
          telefonos: true,
        },
      };
    default:
      return {
        [key]: value,
      };
  }
};

function isEmail(email) {
  return email ? patternEmail.test(email) : false;
}

const toExport = {
  handleVerificationData,
  saveContact,
  changeDataInput,
  handleGetDataObject,
  dataPrimary,
  isEmail,
};

export default toExport;
