import { useState } from "react";

//Componentes
import SearchCustomerModal from "./SearchCustomerModal";

//Context
import { Sale } from "../../../context/SaleContext";

export default function CustomerBtnComponent() {

  // Modal
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  const sale = Sale();
  
  return (
    <>
      <i className="fas fa-user mr-1 text-indigo"></i>
      Cliente:
      <label className="text-capitalize ml-1">
        {sale.customer ? sale.customer.name : "XXX - vuelva a cargar"}
      </label>
      <button
        type="button"
        className="btn bg-indigo btn-sm ml-2"
        title="Buscar cliente"
        onClick={handleModal}
      >
        <i className="fas fa-exchange-alt"></i>
      </button>
      {modal && <SearchCustomerModal handleClose={handleModal} />}
    </>
  );
}

