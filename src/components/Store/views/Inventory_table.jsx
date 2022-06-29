/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SetQantityModal from "./SetQantityModal";

export default function InventoryTableView({ header, body, itemsProp }) {
  const [state, setState] = useState({
    item: {},
    showModal: false,
    items: [],
  });

  const handleUpdateItems = (newItem) => {
    const items = [...state.items];

    items.forEach((item) => {
      if (item.id === newItem.id) {
        item.cant = newItem.cant;
      }
    });

    setState({
      ...state,
      items: items,
      showModal: false,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      items: itemsProp,
    });
  }, []);

  return (
    <div className="table-responsive" style={{ height: "100vh" }}>
      <table className="table table-sm table-bordered table-hover">
        <thead>
          <tr>
            <th>/</th>
            {header}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => {
            const zero = row.props.children.type === "label" ? true : false;
            return (
              <tr className={zero ? "table-secondary" : ""} key={i}>
                {row}
                {header.map((h, i) => {
                  let grad = zero
                    ? parseFloat(row.props.children.props.children)
                        .toFixed(2)
                        .replace(".", "")
                    : parseFloat(row.props.children)
                        .toFixed(2)
                        .replace(".", "");
                  if (parseInt(grad) >= 0) grad = "+" + grad;
                  grad += parseFloat(h.props.children)
                    .toFixed(2)
                    .replace(/[-.]/g, "");

                  return (
                    <td key={grad + i} className="text-center">
                      {state.items.length ? (
                        state.items.map((item, index) => {
                          return grad === item.grad ? (
                            <div key={index}>
                              {item.cant_total ? (
                                <span
                                  onClick={() => {
                                    setState({
                                      ...state,
                                      item: item,
                                      showModal: true,
                                    });
                                  }}
                                  style={{ cursor: "pointer" }}
                                  title={item.grad}
                                  key={item.id + index}
                                  className={
                                    item.cant > 0
                                      ? "badge badge-success"
                                      : "badge badge-danger"
                                  }
                                >
                                  {item.cant}
                                </span>
                              ) : null}
                            </div>
                          ) : null;
                        })
                      ) : (
                        <Link to="/almacen/registro">
                          <i className="fas fa-plus text-secondary"></i>
                        </Link>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {state.showModal ? (
        <SetQantityModal item={state.item} handleClose={handleUpdateItems} />
      ) : null}
    </div>
  );
}
