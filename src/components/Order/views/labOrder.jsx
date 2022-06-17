import { useState,useEffect } from "react";
import useContact from "../../../hooks/useContact";

export default function LabOrderComponent({
  status = false,
  lab_id = "",
  npedidolab = "",
  handleChange: _handleChange,
}) {

  const optionsDefault = {
    page: 1,
    orderby: "created_at",
    order: "desc",
    itemsPage: 100,
    type:1,
    business:1
  };
  const [suppliers, setSuppliers] = useState([]);
  const hookContacts =  useContact();

  const getSuppliers = ()=>{
    hookContacts.getContacts(optionsDefault).then((data)=>{
      if(data){
        setSuppliers(data.data);
      }
    })
  }

  
  //Functions
  const changeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let val = value;

    if (name === "lab_id") val = parseInt(value);

    if (_handleChange) _handleChange(name, val);
  };

  useEffect(() => {
    getSuppliers();
    //dispatch(contactActions.getListSuppliers(1));
    //eslint-disable-next-line
  }, []);

  return (
    <div className="row m-2">
      <div className="col">
        <div className="border border-warning rounded p-2">
          <label>Laboratorio</label>
          <select
            className={status > 1 ? "form-control disabled" : "form-control"}
            disabled={status > 1 ? true : false}
            name="lab_id"
            defaultValue={lab_id}
            onChange={changeInput}
          >
            {suppliers && suppliers.length ? (
              <>
                <option value="0">Seleccione un proveedor</option>
                {suppliers.map((s) => {                                    
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                })}
              </>
            ) : (
              <option value="0">Configure primero los proveedores</option>
            )}
          </select>
        </div>
      </div>
      <div className="col">
        <div className="border border-warning rounded p-2">
          <label>Folio</label>
          <input
            type="text"
            className={status > 1 ? "form-control disabled" : "form-control"}
            disabled={status > 1 ? true : false}
            name="npedidolab"
            defaultValue={npedidolab}
            onChange={changeInput}
          />
        </div>
      </div>
    </div>
  );
}
