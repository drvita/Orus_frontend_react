/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";

//Compinentes
import Inbox from "../components/Store/Inbox";
import ToolBar from "../components/Store/ToolBar";
import Add from "../components/Store/Add";

const optionsDefault = {
  page: 1,
  orderby: "created_at",
  order: "desc",
  search: "",
  itemsPage: 25,
  supplier: "",
  brand: "",
  zero: "false",
};

export default function Store(props) {
  const [state, setState] = useState({
    panel: "inbox",
    options: optionsDefault,
  });
  const { id } = props.match.params;

  useEffect(() => {
    setState({
      ...state,
      panel: id ? "neworedit" : "inbox",
    });
  }, [id]);

  return (
    <StoreContext.Provider value={{ ...state, set: setState }}>
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <button
            className="btn bg-primary btn-block mb-3"
            type="button"
            disabled={state.panel !== "inbox"}
            onClick={() => setState({ ...state, panel: "neworedit" })}
          >
            <i className="fas fa-plus mr-1"></i>
            Nuevo producto
          </button>
          <ToolBar />
        </div>
        <div className="col-sm-12 col-md-10">
          {state.panel === "inventory" && <div>Inventario</div>}
          {state.panel === "inbox" && <Inbox />}
          {state.panel === "neworedit" && <Add {...props} />}
          {state.panel === "category" && <div>Catgorias</div>}
          {state.panel === "brands" && <div>Marcas</div>}
        </div>
      </div>
    </StoreContext.Provider>
  );
}
