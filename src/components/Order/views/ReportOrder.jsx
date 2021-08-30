import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../../layouts/pagination";
//Actions
import { orderActions } from "../../../redux/order";

export default function ReportOrderComponent({ handleChangePanel: panel }) {
  const { list, metaList, loading } = useSelector((state) => state.order),
    dispatch = useDispatch(),
    [data, setData] = useState({
      page: 1,
      orderby: "created_at",
      order: "desc",
      status: 0,
      itemsPage: 10,
    });
  //Functions
  const handlePrintReport = () => {
      console.log("[DEBUG] Create report");
    },
    handlePagination = (page) => {
      setData({
        ...data,
        page,
      });
    },
    handleSetSelectOptions = ({ value: itemsPage }) => {
      setData({
        ...data,
        itemsPage,
      });
    },
    handleViewOrder = (order) => {
      //console.log("[DEBUG] set Order", order.id);
      dispatch(orderActions.setOrder(order));
      panel(null, 3);
    };

  useEffect(() => {
    dispatch(orderActions.getListOrder(data));
    return () => {
      dispatch(orderActions.setListOrder());
    };
    //eslint-disable-next-line
  }, [data]);

  return (
    <div className="card">
      <div className="card-header">
        <i className="fas fa-folder-open mr-1"></i>
        <label>Reporte de pedidos</label>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Paciente</th>
                  <th>Creado</th>
                  <th>Realizo</th>
                  <th>
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((order) => (
                  <tr key={order.id} className="text-capitalize">
                    <th>{order.id}</th>
                    <td>{order.paciente.nombre.toLowerCase()}</td>
                    <td>{moment(order.created_at).fromNow()}</td>
                    <td>{order.created.name.toLowerCase()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-default"
                        onClick={() => handleViewOrder(order)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">
                    <PaginationComponent
                      meta={metaList}
                      handlePagination={handlePagination}
                    />
                  </td>
                  <td>
                    <select
                      className="form-control"
                      value={data.itemsPage}
                      onChange={({ target }) => handleSetSelectOptions(target)}
                    >
                      <option value="10">ver 10</option>
                      <option value="20">ver 20</option>
                      <option value="50">ver 50</option>
                      <option value="100">ver 100</option>
                    </select>
                  </td>
                  <td colSpan="2" className="text-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handlePrintReport}
                    >
                      <i className="fas fa-print"></i>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {loading && (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      )}
    </div>
  );
}
