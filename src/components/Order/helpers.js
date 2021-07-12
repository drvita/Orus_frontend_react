const handleStatusString = (status) => {
  switch (status) {
    case 0:
      return "proceso";
    case 1:
      return "laboratorio";
    case 2:
      return "bicelacion";
    case 3:
      return "terminado";
    case 4:
      return "entregadp";
    default:
      return "garantia";
  }
};

const toExport = {
  handleStatusString,
};

export default toExport;
