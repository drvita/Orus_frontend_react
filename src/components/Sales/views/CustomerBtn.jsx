import { useState, useContext } from "react";

//Components
import SearchCustomerModal from "./SearchCustomerModal";

//Context
import { SaleContext } from "../../../context/SaleContext";

export default function CustomerBtnComponent() {

  const { sale } = useContext(SaleContext);

  
  const [data, setData] = useState(false);

  //Functions
  const handleSetCustomer = () => {
      setData(true);
    };

  const closeModal = ()=>{
      setData(false);
    };

  return (
    <>
      <i className="fas fa-user mr-1 text-indigo"></i>
      Cliente:
      <label className="text-capitalize ml-1">
        {sale.customer ? sale.customer.nombre : "XXX"}
      </label>
      <button
        type="button"
        className="btn bg-indigo btn-sm ml-2"
        title="Buscar cliente"
        onClick={handleSetCustomer}
      >
        <i className="fas fa-exchange-alt"></i>
      </button>
      {data && (
        <SearchCustomerModal
          handleClose={closeModal}
          handleSelect={closeModal}
        />
      )}
    </>
  );
}
