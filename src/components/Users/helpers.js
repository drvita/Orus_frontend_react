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
};

const toExport = {
  validInputs,
};

export default toExport;
