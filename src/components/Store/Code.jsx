import { useState } from "react";
//Hooks
import useProducts from "../../hooks/useProducts";


export default function Code(props) {
  const hookStore = useProducts();
  const [inUse, setInUse] = useState(props.code.length === 0 ? true : false);

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
          const {value} = target;
          props.onChangeProductCode(value);
        }}
        
        onBlur={() => {
          if(props.code.length === 0){
            setInUse(true);
          }else{
            hookStore.getProductByCode(props.code, props.id).then((data)=>{
              if(data.data.length){         
                if(data.data[0].code === props.code){                                  
                  setInUse(false);
                }else{
                  setInUse(true);
                }              
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
          Campo vacio o còdigo en uso
        </span>
      ) : null}
    </div>
  );
}
