import { useEffect, useState } from "react";

//Context
import { StoreContext } from "../context/StoreContext";

//Compinentes
import ToolBar from "../components/Store/ToolBar";
import Inbox from "../components/Store/Inbox";
import Add from "../components/Store/Add";
import Categories from './categories_page';
import Brands from './brands_page';
import Inventory from "../components/Store/inventory";

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
          {state.panel === "category" && <Categories></Categories>}
          {state.panel === "brands" && <Brands></Brands>}
          {state.panel === "inventory" && <Inventory></Inventory>}
        </div>
      </div>
    </StoreContext.Provider>
  );
}
