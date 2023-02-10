import { useEffect, useState } from "react";

// Context
import { StoreContext } from "../context/StoreContext";

// Components
import ToolBar from "../components/Store/ToolBar";
import Inbox from "../components/Store/Inbox";
import Add from "../components/Store/Add";
import Categories from "./StoreCategories";
import Brands from "./StoreBrand";
import Inventory from "./StoreInventory";
import Entries from "./StoreEntriesArm";
// Hooks
import CatHook from "../hooks/useCategory";
import ContHook from "../hooks/useContact";
import ConfigHook from "../hooks/useConfig";

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
    panel: "",
    cats: [],
    suppliers: [],
    branches: [],
    options: optionsDefault,
  });
  const categories = CatHook();
  const contacts = ContHook();
  const config = ConfigHook();
  const { id } = props.match.params;

  const handleGetCategories = async () => {
    return await categories
      .getCategories({ search: "armazones" })
      .then(({ data }) => {
        const dataFilter = data.filter((cat) => cat.name === "armazones");
        return dataFilter[0].sons;
      });
  };
  const handleGetSuppliers = async () => {
    return await contacts
      .getContacts({ type: 1, business: 0 })
      .then(({ data }) => {
        const filters = data.filter((row) => row.brands && row.brands.length);

        return filters;
      });
  };
  const handleGetBranchs = async () => {
    return await config.get({ itemsPage: 100 }).then(({ data }) => {
      const filters = data.filter((row) => row.name === "branches");
      const branches = filters.map((row) => ({ ...row.data, id: row.id }));

      return branches;
    });
  };
  const handleSet = async (panel) => {
    const cats = await handleGetCategories();
    const suppliers = await handleGetSuppliers();
    const branches = await handleGetBranchs();

    setState({
      ...state,
      cats,
      suppliers,
      panel,
      branches,
    });
  };

  useEffect(() => {
    let panel = "inbox";

    if (id) {
      if (!isNaN(id)) {
        panel = "neworedit";
      } else {
        switch (id?.toLowerCase()) {
          case "categorias":
            panel = "category";
            break;
          case "marcas":
            panel = "brands";
            break;
          case "inventario":
            panel = "inventory";
            break;
          case "entradas":
            panel = "entries";
            break;
          default:
            panel = "inbox";
        }
      }
    }
    handleSet(panel);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StoreContext.Provider value={{ ...state, set: setState }}>
      <div className="row" style={{ minHeight: "100vh" }}>
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
          {state.panel === "inbox" && <Inbox />}
          {state.panel === "neworedit" && <Add {...props} />}
          {state.panel === "category" && <Categories></Categories>}
          {state.panel === "brands" && <Brands></Brands>}
          {state.panel === "inventory" && <Inventory></Inventory>}
          {state.panel === "entries" && <Entries></Entries>}
        </div>
      </div>
    </StoreContext.Provider>
  );
}
