import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";

export default function Code(props) {
  const hookProducts = useProducts();
  const [state, setState] = useState({
    codeMessage: "",
    codeStatus: "empty",
    rendered: false,
  });

  useEffect(() => {
    if (!props.code.length) {
      setState({
        ...state,
        codeMessage: "Còdigo vacio",
        codeStatus: "empty",
      });
    } else {
      if (state.rendered) {
        return null;
      } else {
        validCode();
      }
    }
  }, [props.code]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    props.onChangeStatusCode(state.codeStatus);
  }, [state.codeStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  const validCode = () => {
    setState({
      ...state,
      codeMessage: "Validando código . . .",
      codeStatus: "validating",
    });
    hookProducts
      .getProductByCode(props.code, props.id)
      .then((data) => {
        if (data.data.length) {
          setState({
            ...state,
            codeMessage: "Còdigo ya en uso",
            codeStatus: "inUse",
            rendered: true,
          });
        } else {
          setState({
            ...state,
            codeMessage: "Còdigo disponible",
            codeStatus: "available",
            rendered: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className={
            state.codeStatus === "empty" || state.codeStatus === "inUse"
              ? "input-group-text bg-warning"
              : "input-group-text bg-primary"
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
        value={props.code}
        onChange={({ target }) => {
          const { value } = target;
          props.onChangeProductCode(value);
        }}
        onBlur={() => {
          if (props.type === "lentes") {
            validCode();
          } else {
            validCode();
            props.createName();
          }
        }}
        autoComplete="off"
        maxLength="18"
      />
      <span className="text-muted text-xs d-block w-100">
        {state.codeMessage}
      </span>
    </div>
  );
}
