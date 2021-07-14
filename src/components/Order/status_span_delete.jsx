import React from "react";

const StatusToString = ({ status }) => {
  switch (status) {
    case 0:
      return <span className="text-warning text-uppercase">En proceso</span>;
    case 1:
      return <span className="text-info text-uppercase">En laboratorio</span>;
    case 2:
      return <span className="text-primary text-uppercase">Bicelación</span>;
    case 3:
      return <span className="text-success text-uppercase">Terminado</span>;
    case 4:
      return <span className="text-info text-uppercase">Entregado</span>;
    default:
      return <span className="text-secondary text-uppercase">Garantia</span>;
  }
};

export default StatusToString;
