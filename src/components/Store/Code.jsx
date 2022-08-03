import { useEffect } from "react";
export default function Code(props) {

  

  useEffect(()=>{
   /*  if(props.code.length){      
   } */
   props.validateOnBlur(props.code);
  },[props.code])

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className={
            props.codeAvailable === false ? "input-group-text bg-warning" :  "input-group-text bg-primary"
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
        
        onBlur={({target}) => {
          const {value} = target;          
          props.validateOnBlur(value);
        }}
        autoComplete="off"
        maxLength="18"
      />
      {props.codeAvailable === false ? (
        <span className="text-muted text-xs d-block w-100">
          {props.codeMessage}
        </span>
      ) : (
        <span className="text-muted text-xs d-block w-100">
          {props.codeMessage}
        </span>
      )}
    </div>
  );
}
