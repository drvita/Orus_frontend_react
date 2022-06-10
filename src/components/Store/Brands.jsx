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
  }, [props.supplier]);// eslint-disable-line react-hooks/exhaustive-deps


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
            if (props.handleChangeBrand) {
              props.handleChangeBrand(id);
            }
          }}
        />
      </div>
    </div>
  );
}
