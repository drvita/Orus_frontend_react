import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//Components
import InputSearchItem from "./views/InputSearchItem";
import DiscountBtnComponent from "./views/DiscountBtn";
import ListSalesBtn from "./views/ListSalesBtn";
import PrintSaleComponent from "./views/Print_sale";
import PaymentBtnComponent from "./views/PaymentBtn";
import EraseBtn from "./views/EraseSaleBtn";
import CustomerBtnComponent from "./views/CustomerBtn";
import SalesDetailsTableComponent from "./views/SalesDetailsTable";
//Actions
import { saleActions } from "../../redux/sales";
import helpers from "./helpers";

export default function IndexSalesComponent() {
  //Store Redux
  const { sales } = useSelector((state) => state),
    { sale, loading } = sales,
    dispatch = useDispatch();
  //Store Local
  const [data, setData] = useState({
    pagado: 0,
    order_id: 0,
  });
  //Functions
  const handleAddItem = (result) => {
      const found = sale.items.filter(
        (item) => item.store_items_id === result.store_items_id
      );
      let newItems = sale.items.filter(
        (item) => item.store_items_id !== result.store_items_id
      );

      if (found.length) {
        const cantidad = parseInt(result.cant) + parseInt(found[0].cant),
          item = {
            ...found[0],
            cant: cantidad,
            subtotal: parseFloat(result.price) * cantidad,
            inStorage: cantidad >= parseInt(result.cantInStore) ? true : false,
            out: parseInt(result.cantInStore) - cantidad,
          };
        newItems.push(item);
      } else {
        newItems.push(result);
      }

      //Add to redux
      dispatch(
        saleActions.setSale({
          ...sale,
          items: newItems,
        })
      );
    },
    handleDeleteSale = () => setData({ pagado: 0, order_id: 0 }),
    handleSetSale = (res) => {
      setData({
        ...data,
        ...res,
      });
    };

  useEffect(() => {
    const toSave = {
      customer: sale.customer,
      items: sale.items,
      session: sale.session,
      descuento: sale.descuento,
      subtotal: sale.subtotal,
      total: sale.total,
      payments: sale.payments,
    };
    let sum = 0,
      pagado = 0;

    sale.items.forEach((item) => (sum += item.subtotal));
    sale.payments.forEach((pay) => (pagado += pay.total));

    if (sum !== sale.subtotal || data.pagado !== pagado) {
      const total = sum - sale.descuento;
      setData({
        pagado,
      });
      dispatch(
        saleActions.setSale({
          ...sale,
          subtotal: sum,
          total,
          pagado,
        })
      );
    }

    localStorage.setItem("OrusSales", JSON.stringify(sale.id ? {} : toSave));
    window.addEventListener("afterprint", () => {
      helpers.confirm("Cerrar la venta actual", () => {
        dispatch(
          saleActions.setSale({
            id: 0,
            customer: {},
            contact_id: null,
            items: [],
            session: helpers.getSession(),
            descuento: 0,
            subtotal: 0,
            total: 0,
            payments: [],
            created_at: null,
          })
        );
        handleDeleteSale();
      });
    });

    return () => {
      localStorage.setItem("OrusSales", "{}");
    };
    //eslint-disable-next-line
  }, [sale]);

  const paid = sale.total <= data.pagado ? true : false;

  return (
    <>
      <div className="card border border-gray mb-4" style={{ height: "36rem" }}>
        <div className="card-body pb-2 d-print-none">
          <nav className="row mb-2">
            <div className="col">
              <CustomerBtnComponent sale={sale} setSale={handleSetSale} />
            </div>
            <div className="col">
              <label className="mx-1">Folio:</label>
              <span className="mx-1">{sale.id ? sale.id : "Nuevo"}</span>
              <label className="mx-1">Fecha:</label>
              <span className="mx-1">
                {sale.id ? moment(sale.created_at).format("LL") : "--"}
              </span>
              {data.order_id ? (
                <>
                  <label className="mx-1">Pedido:</label>
                  <span className="mx-1">{data.order_id}</span>
                </>
              ) : null}
            </div>
            <div className="col-3">
              <div className="card-tools text-right">
                <ListSalesBtn setSale={handleSetSale} />
                <DiscountBtnComponent sale={sale} paid={paid} />
                <EraseBtn sale={sale} erase={handleDeleteSale} />
              </div>
            </div>
          </nav>
          <div
            className="overflow-auto text-right p-0 border border-gray"
            style={{ height: "27rem" }}
          >
            <SalesDetailsTableComponent paid={paid} />
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col d-print-none">
              {sale.total ? (
                <>
                  <span className="text-lg">Total:</span>
                  <label className="text-lg ml-1">${sale.total}</label>
                </>
              ) : null}
            </div>
            <div className="col d-print-none">
              {!paid && (
                <>
                  <span className="text-lg">Por pagar:</span>
                  <label className="text-lg ml-1">
                    ${sale.total - data.pagado}
                  </label>
                </>
              )}
            </div>
            <div className="col-6 text-right">
              <InputSearchItem
                handleAdd={handleAddItem}
                session={sale.session}
              />
              <PaymentBtnComponent
                sale={sale}
                paid={paid}
                forPaid={sale.total - data.pagado}
              />
              <PrintSaleComponent sale={sale} payed={data.pagado} />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
      </div>
    </>
  );
}
