import useProducts from "../../hooks/useProducts";
import { useState } from "react";

export default function Code(props) {
  console.log("props del input de codigo", props);
  const hookStore = useProducts();
  const [inUse, setInUse] = useState(false);

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className={
            inUse === true ? "input-group-text bg-warning" :  "input-group-text bg-primary"
          }
        >
          <i className="fas fa-code"></i>
        </span>
      </div>
      <input
        type="text"
        className="form-control text-uppercase"
        placeholder="Codigo"
        name="code"
        defaultValue={props.code}

        onChange={({target}) => {
          const {name, value} = target;
          console.log(name, value);
          props.onChangeProductCode(value);
        }}
        
        onBlur={() => {
          if(props.code.length === 0){
            return null;
          }else{
            hookStore.getProductByCode(props.code).then((data)=>{
              if(data.data.length){            
                setInUse(true);
              }else if(data.data.length === 0){
                setInUse(false);
              }
            })
          }
        }}
        autoComplete="off"
        maxLength="18"
      />
      {inUse === true ? (
        <span className="text-muted text-xs d-block w-100">
          El codigo ya esta en uso
        </span>
      ) : null}
    </div>
  );
}
