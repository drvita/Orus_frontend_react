import { useEffect, useState } from "react";
import FormEntries from "../components/Store/FormEntries";

export default function StoreEntries() {
  const [state, setState] = useState({
    items: [
      {
        id: `${Date.now()}`,
        code: "",
        name: "",
        branch_id: 0,
        cant: 0,
      },
    ],
  });

  useEffect(() => {
    // console.log("[DEBUG] Items", state.items);
  }, [state.items]);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h5 className="card-title mt-2 ml-2 text-bold">
              Entradas de productos por lote
            </h5>
            <div className="card-tools">
              <button
                className="btn btn-sm btn-primary"
                title="Agregar una linea nueva"
                alt="Agregar una linea nueva"
                onClick={() => {
                  const items = [...state.items];
                  items.push({
                    id: `${Date.now()}`,
                    code: "",
                    name: "",
                    branch_id: 0,
                    cant: 0,
                  });

                  setState({
                    items,
                  });
                }}
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>

          <div className="card-body">
            {state.items.map((item) => (
              <FormEntries
                key={item.id}
                data={item}
                eraseItem={(item) => {
                  const items = [...state.items];
                  const newItems = items.filter((i) => i.id !== item.id);
                  console.log("[DEBUG] delete Item", item, newItems);
                  setState({
                    items: newItems,
                  });
                }}
              />
            ))}
          </div>
          <div className="card-footer text-right">
            <button className="btn btn-primary">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
