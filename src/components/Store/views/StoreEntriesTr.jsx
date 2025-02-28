import { Store } from "../../../context/StoreContext";

export default function StoreEntriesTr({
  item,
  newRow,
  supplier_id,
  handleDelete,
}) {
  const ctx = Store();
  const cat = ctx.cats.filter((c) => c.id === item.category_id)[0];
  const supplier = ctx.suppliers.filter((s) => s.id === supplier_id)[0];
  const brand = supplier.brands.filter((b) => b.id === item.brand_id)[0];
  const branch = ctx.branches.filter((b) => b.id === item.branch_id)[0];

  return (
    <tr className={newRow && newRow === item.id ? "bg-info" : ""}>
      <td>
        {item.code.toUpperCase()}
        {item.codeBar && (
          <>
            {" "}
            / <i className="fas fa-barcode"></i> {item.codeBar.toUpperCase()}
          </>
        )}
      </td>
      <td
        className={
          newRow && newRow === item.id
            ? "small"
            : item.saved
            ? "text-warning small"
            : "text-secondary small"
        }
      >
        {item.name.toUpperCase()}
      </td>
      <td className={item.cantAdd ? "font-weight-bold" : ""}>{item.cant}</td>
      <td>$ {item.price}</td>
      <td className="text-capitalize">{cat.name}</td>
      <td className="text-capitalize">{brand?.name ?? ""}</td>
      <td className="text-capitalize">{branch?.name ?? ""}</td>
      <td>
        <i
          className="fas fa-trash text-danger"
          onClick={() => handleDelete(item.id)}
        ></i>
      </td>
    </tr>
  );
}
