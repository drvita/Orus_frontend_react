import DatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";

import SideBar from "../../pages/partials/SideBar";
import { Exams } from "../../context/ExamContext";
import { Config } from "../../context/ConfigContext";

import es from "date-fns/locale/es";
registerLocale("es", es);

export default function ToolBar({ newOrEdit, handleNewOrEdit }) {
  const context = Exams();
  const config = Config();
  const branches = config.data?.filter((b = {}) => b.name === "branches");
  const date = context.options?.date ? moment(context.options.date) : moment();

  return (
    <div className="col-sm-12 col-md-2 d-print-none mb-5">
      <button
        className="btn bg-info btn-block mb-3"
        type="button"
        disabled={newOrEdit}
        onClick={handleNewOrEdit}
      >
        <i className="fas fa-plus mr-1"></i>
        Nuevo examen
      </button>

      <SideBar title="Filtros">
        <li className="nav-item p-2">
          <label htmlFor="orderby">Ordenar por</label>
          <select
            className="form-control"
            id="orderby"
            defaultValue={context.options?.orderby}
            onChange={({ target }) => {
              context.set({
                ...context,
                options: {
                  ...context.options,
                  orderby: target.value,
                },
              });
            }}
          >
            <option value="created_at">Fecha de registro</option>
            <option value="updated_at">Fecha de modificacion</option>
          </select>
        </li>
        <li className="nav-item p-2">
          <label htmlFor="date">Fecha</label>
          <DatePicker
            className={`form-control`}
            locale="es"
            selected={new Date(date.format("YYYY/MM/DD"))}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            placeholderText="Seleccione una fecha"
            onSelect={(date) => {
              if (date) {
                date = date.toLocaleDateString("es-MX");
                date = moment(date, "DD/MM/YYYY");

                if (date.isValid()) {
                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                      date: date.format("YYYY/MM/DD"),
                    },
                  });
                }
              }
            }}
            onChange={(date) => {
              if (date) {
                date = date.toLocaleDateString("es-MX");
                date = moment(date, "DD/MM/YYYY");

                if (date.isValid()) {
                  context.set({
                    ...context,
                    options: {
                      ...context.options,
                      date: date.format("YYYY/MM/DD"),
                    },
                  });
                }
              }
            }}
          />
          <button
            type="button"
            className="btn btn-info btn-block text-bold mt-1"
            onClick={(e) => {
              context.set({
                ...context,
                options: {
                  ...context.options,
                  date: "",
                },
              });
            }}
          >
            <i className="fas fa-trash mr-1"></i>
            Borrar fecha
          </button>
        </li>
        <li className="nav-item p-2">
          <label htmlFor="order">Mostrar por</label>
          <select
            className="form-control"
            id="order"
            value={context.options?.order}
            onChange={({ target }) => {
              context.set({
                ...context,
                options: {
                  ...context.options,
                  order: target.value,
                },
              });
            }}
          >
            <option value="asc">Antiguos</option>
            <option value="desc">Recientes</option>
          </select>
        </li>
        <li className="nav-item p-2">
          <label htmlFor="itemsPage">Numero de examenes</label>
          <select
            className="form-control"
            id="itemsPage"
            value={context.options?.itemsPage}
            onChange={({ target }) => {
              context.set({
                ...context,
                options: {
                  ...context.options,
                  itemsPage: target.value,
                },
              });
            }}
          >
            <option value="25">ver 25</option>
            <option value="50">ver 50</option>
            <option value="75">ver 75</option>
            <option value="100">ver 100</option>
          </select>
        </li>
        <li className="nav-item p-2">
          <label htmlFor="status">Estado</label>
          <select
            className="form-control"
            id="status"
            value={context.options?.status}
            onChange={({ target }) => {
              context.set({
                ...context,
                options: {
                  ...context.options,
                  status: target.value,
                },
              });
            }}
          >
            <option value="">-- Todos --</option>
            <option value="1">Solo terminados</option>
            <option value="0">En proceso</option>
          </select>
        </li>
        <li className="nav-item p-2">
          <label htmlFor="status">Sucursales</label>
          <select
            className="form-control text-capitalize"
            id="branch"
            value={context.options?.branch}
            onChange={({ target }) => {
              context.set({
                ...context,
                options: {
                  ...context.options,
                  branch: target.value,
                },
              });
            }}
          >
            <option value="all">-- Todas --</option>
            {branches?.map((branch) => (
              <option value={branch.id} key={branch.id}>
                {branch.data?.name}
              </option>
            ))}
          </select>
        </li>
      </SideBar>
    </div>
  );
}
