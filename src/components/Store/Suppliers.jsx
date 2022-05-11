import { useEffect, useState } from "react";

import useContact from "../../hooks/useContact";
import Input from "../Input";

export default function Suppliers(props) {
  const _contacts = useContact();
  const [state, setState] = useState({
    suppliers: [],
    load: true,
  });

  const getSuppliers = () => {
    _contacts
      .getContacts({
        type: 1,
        orderby: "name",
        order: "asc",
      })
      .then((sup) => {
        setState({
          suppliers: sup.data,
          load: false,
        });
      });
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <small>
          <label>Proveedor</label>
        </small>
        <Input
          options={state.suppliers}
          value={props.supplier ?? ""}
          text="Seleccione un provedor"
          icon="address-book"
          load={state.load}
          handleChange={(id) => {
            if (props.handleChangeSupplier) {
              props.handleChangeSupplier(id);
            }
          }}
        />
      </div>
    </div>
  );
}
