/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Input from "../Input";
import useStore from "../../hooks/useStore";

export default function Brands(props) {

  const [state, setState] = useState({
    brands: [],
    load: true,
  });

  const _store = useStore();

  const getBrands = () => {
    _store.getBrands({supplier: props.supplier}).then((brands) => {
        if(brands){
          console.log(brands);
          setState({
            ...state, 
          brands: brands.data,  
          load: false,
        });
        }else{
          console.error("Error al obetner las marcas");
        }
        
      });
  };

  useEffect(() => {
    getBrands();
  }, [props.supplier]);
  return (
    <div className="row">
      <div className="col">
        <small>
          <label>Marca</label>
        </small>
        <Input
          options={state.brands}
          value={props.brand}
          text="Seleccione una marca"
          icon="copyright"
          emptyText="No hay marcas para este proveedor"
          load={state.load}
          loadText="Cargando marcas"
          handleChange={(id) => {
            if (props.handleChange) {
              props.handleChange(id);
            }
          }}
        />
      </div>
    </div>
  );
}
