import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";


export default function Code(props) {

  const hookProducts = useProducts();
  const [state, setState] = useState({
    productCodes:[], 
    codeMessage:'', 
    codeStatus:'empty'
  })

  useEffect(()=>{    
    if(!props.code.length){
      setState({
        ...state,
        codeMessage:'Còdigo vacio',
        codeStatus:'empty'
      });
    }else{
      validCode();
    }
  },[props.code]);

  useEffect(()=>{
    hookProducts.getProductByCode(props.code, props.id)
    .then((data)=>{
      if(data.data.length){       
        setState({
          ...state,
          productCodes: data.data.map((product)=> product.code.toUpperCase())
        });        
      }
    })
    .catch((error) => console.log(error));
  },[]);

  useEffect(()=>{
    console.log("Cambio de status del codigo");
    props.onChangeStatusCode(state.codeStatus);
  },[state.codeStatus]);


  const validCode = ()=>{   
    const searchReturned = state.productCodes.filter((code)=> code == props.code.toUpperCase());
    if(searchReturned.length){
      setState({
        ...state,
        codeMessage:'Còdigo ya en uso',
        codeStatus:'inUse'
      });    
    }else{
      setState({
        ...state,
        codeMessage:'Còdigo disponible',
        codeStatus:'available'
      });
    }
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className={
            state.codeStatus === 'empty' || state.codeStatus === 'inUse' ? "input-group-text bg-warning" :  "input-group-text bg-primary"
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
        
        /* onBlur={({target}) => {
          const {value} = target;          
          props.validateOnBlur(value);
        }} */
        autoComplete="off"
        maxLength="18"
      />
      <span className="text-muted text-xs d-block w-100">
          {state.codeMessage}
        </span>
    </div>
  );
}
