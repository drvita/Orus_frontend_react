import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../layouts/pagination";
import GraduacionExamComponent from "../Exam/views/graduacionExam";
import BicelacionOrderComponent from "./views/bicelacionOrder";
import LabOrderComponent from "./views/labOrder";
//Actions
import { orderActions } from "../../redux/order";
import helpers from "./helpers";

export default function ReportOrderComponent({ handleChangePanel: panel }) {
  const { list, metaList, loading } = useSelector((state) => state.order),
    dispatch = useDispatch(),
    [options, setOptions] = useState({
      page: 1,
      orderby: "created_at",
      order: "desc",
      status: 0,
      itemsPage: 1,
    }),
    [data, setData] = useState({
      lab_id: null,
      npedidolab: null,
      ncaja: null,
      observaciones: null,
      status: 0,
    });
  //Functions
  const handlePagination = (page) => {
      setOptions({
        ...options,
        page,
      });
    },
    handleSaveOrder = (order) => {
      const _save = (payload) => dispatch(orderActions.saveOrder(payload));

      if (!data.status) {
        window.Swal.fire({
          title: "Verificacion",
          text: "Seleccione una accion, antes de guardar",
          icon: "warning",
        });
        return false;
      }
      if (data.status === 1) {
        if (!data.lab_id) {
          window.Swal.fire({
            title: "Verificacion",
            text: "Seleccione un laboratorio",
            icon: "warning",
          });
          return false;
        }
        if (!data.npedidolab) {
          window.Swal.fire({
            title: "Verificacion",
            text: "Escriba el folio del laboratorio",
            icon: "warning",
          });
          return false;
        }
      }
      if (data.status === 2) {
        if (!data.ncaja) {
          window.Swal.fire({
            title: "Verificacion",
            text: "Escriba el numero de la caja de bicelación",
            icon: "warning",
          });
          return false;
        }
      }

      if (order.id) helpers.handleSaveOrder(order.id, data, options, _save);
      else
        console.error(
          "[error] Se perdio el identificador del pedido",
          order.id
        );
    },
    handleChangeData = (name, value) => {
      if (name) {
        setData({
          ...data,
          [name]: value,
        });
      }
    };

  useEffect(() => {
    dispatch(orderActions.getListOrder(options));
    return () => {
      dispatch(orderActions.setListOrder());
    };
    //eslint-disable-next-line
  }, [options]);

  //console.log("[DEBUG] List", list);

  return (
    <div className="card">
      <div className="card-header">
        <i className="fas fa-folder-open mr-1"></i>
        <label>Reporte de pedidos</label>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col table-responsive">
            {list.map((order) => (
              <div key={order.id}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Paciente</th>
                      <th>Creado</th>
                      <th>Realizo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-capitalize">
                      <th>{order.id}</th>
                      <td>{order.paciente.nombre.toLowerCase()}</td>
                      <td>{moment(order.created_at).fromNow()}</td>
                      <td>{order.created.name.toLowerCase()}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="text-center">
                        <PaginationComponent
                          meta={metaList}
                          handlePagination={handlePagination}
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {order.exam && (
                  <>
                    <h5 className="my-4">
                      <i className="fas fa-notes-medical mr-1"></i>
                      Examen
                    </h5>
                    <GraduacionExamComponent
                      esferaod={order.exam.esferaod ?? 0}
                      esferaoi={order.exam.esferaoi ?? 0}
                      cilindrod={order.exam.cilindrod ?? 0}
                      cilindroi={order.exam.cilindroi ?? 0}
                      ejeod={order.exam.ejeod ?? 0}
                      ejeoi={order.exam.ejeoi ?? 0}
                      adiciond={order.exam.adiciond ?? 0}
                      adicioni={order.exam.adicioni ?? 0}
                      adicion_media_od={order.exam.adicion_media_od ?? 0}
                      adicion_media_oi={order.exam.adicion_media_oi ?? 0}
                      dpod={order.exam.dpod ?? 0}
                      dpoi={order.exam.dpoi ?? 0}
                      alturaod={order.exam.alturaod ?? 0}
                      alturaoi={order.exam.alturaoi ?? 0}
                      lcmarca={order.exam.lcmarca ?? 0}
                      lcgod={order.exam.lcgod ?? 0}
                      lcgoi={order.exam.lcgoi ?? 0}
                      showContactGlasses={false}
                      readOnly={true}
                    />
                  </>
                )}

                <h5 className="my-4">
                  <i className="fas fa-clipboard-list mr-1"></i>
                  Productos
                </h5>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr className="text-capitalize" key={item.id}>
                        <td>{item.producto.toLowerCase()}</td>
                        <td>{item.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h5 className="my-4">
                  <i className="fas fa-cog mr-1"></i>
                  Proceso
                </h5>

                <div className="my-4 py-4">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="status">
                          ¿Cual es la siguiente accion de este pedido?
                        </label>
                        <select
                          id="status"
                          className="form-control"
                          defaultValue={order.status}
                          onChange={({ target }) => {
                            const { value } = target;
                            handleChangeData("status", parseInt(value));
                          }}
                        >
                          <option>-- Seleccione primero una accion --</option>
                          <option value="1">Laboratorio</option>
                          <option value="2">Bicelación</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {data.status === 1 ? (
                      <div className="col">
                        <h5>Laboratorio</h5>
                        <LabOrderComponent
                          lab_id={data.lab_id}
                          npedidolab={data.npedidolab}
                          handleChange={handleChangeData}
                        />
                      </div>
                    ) : null}

                    {data.status === 2 ? (
                      <div className="col">
                        <h5>Bicelación</h5>
                        <BicelacionOrderComponent
                          ncaja={data.ncaja}
                          observaciones={data.observaciones}
                          handleChange={handleChangeData}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSaveOrder(order)}
                  >
                    <i className="fas fa-save mr-1"></i>
                    Actualizar pedido
                  </button>
                </div>
              </div>
            ))}
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
