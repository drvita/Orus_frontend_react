import { useState,useEffect } from "react";
import useContact from "../../../hooks/useContact";

export default function LabOrderComponent({
  status = false,
  lab_id = "",
  lab_order = "",
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
  const [supDefault, setSupDefault] = useState('');
  const hookContacts =  useContact();

  const getSuppliers = ()=>{
    hookContacts.getContacts(optionsDefault).then((data)=>{
      if(data){
        setSuppliers(data.data);
        const supDefault = data.data.filter((supplier)=> supplier.id === lab_id);
        if(!supDefault.length){ 
          return null
        }else{
          setSupDefault(supDefault[0].name);
        }        
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
            <option value="0">
              {lab_id === 0 ? "Seleccione un proveedor" : supDefault}
            </option>   
            {suppliers.map((s) => {                                                                     
                  return (
                    <option key={s.id} value={s.id}>                      
                      {s.name}
                    </option>
                  );
                })}
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
            name="lab_order"
            maxLength="50"
            defaultValue={lab_order}
            onChange={changeInput}
          />
        </div>
      </div>
    </div>
  );
}
