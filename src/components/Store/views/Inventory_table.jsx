import { Link } from "react-router-dom";

export default function InventoryTableView({ header, body, items }) {
  
  return (
    <div className="table-responsive">
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
              <tr className={zero ? "table-secondary" : ""} key = {i}>
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
                      {items.length ? (
                        items.map((item, index) => {
                          return grad === item.grad ? (
                            <>
                              {item.cant_total ? (
                                <span
                                  title = {item.grad}
                                  key={item.id + index}
                                  className={
                                    item.cant_total > 0
                                      ? "badge badge-success"
                                      : "badge badge-danger"
                                  }
                                >
                        
                                  <Link
                                    to={"/almacen/" + item.id}
                                    className="text-light"
                                  >
                                    {item.cant_total}
                                  </Link>
                                </span>
                              ) : null}
                            </>
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
    </div>
  );
}
