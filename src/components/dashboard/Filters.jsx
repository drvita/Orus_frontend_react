/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
//Context
import { ConfigContext } from "../../context/ConfigContext";
//Hooks
import useUsers from "../../hooks/useUsers";

export default function Filters({ filters, changeState }) {
  const { user_id, branch_id, date_end, date_start } = filters;
  const [state, setState] = useState({
    branch_id,
    user_id,
    date_start,
    date_end,
    userData: [],
    load: false,
  });
  const usersHook = useUsers();
  const config = useContext(ConfigContext);
  const branches = config.data.filter((c) => c.name === "branches");

  // Functions
  const sendDataFilter = () => {
    const { user_id, branch_id, date_end, date_start } = state;

    changeState({
      branch_id,
      user_id,
      date_start,
      date_end,
    });
    getDataApi();
  };
  const handleChangeDate = (field, date) => {
    setState({
      ...state,
      [field]: moment(date).format("YYYY-MM-DD"),
    });
  };
  const getDataApi = () => {
    setState({
      ...state,
      load: true,
    });
    usersHook.getListUsers({ branch_id: state.branch_id }).then(({ data }) => {
      if (data) {
        const users = data.filter((u) => !u.roles.includes("doctor"));
        console.log("[DEBUG] users load:", data, users);
        setState({
          ...state,
          userData: users,
          load: false,
        });
      } else {
        console.error("[Orus System] Error al obtener la lista de usuarios");
        setState({
          ...state,
          load: false,
        });
      }
    });
  };

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <div className="border-bottom pb-3 mb-4">
      <div className="card-body p-0 bg-light">
        <div className="form-group row col-lg-12 m-0">
          <div className="col-lg-1 mt-sm-3 ml-sm-3">
            <p className="mt-2 font-weight-bold text-secondary h5">Filtros</p>
          </div>

          <div className="col-lg-2 mt-sm-3">
            <div className="col-lg-12">
              <select
                className="form-control text-capitalize"
                value={state.branch_id}
                onChange={({ target }) =>
                  setState({ ...state, branch_id: target.value })
                }
              >
                <option value="">
                  {state.load && !branches.length ? "Cargando..." : "Todas"}
                </option>
                {branches.map((branch) => {
                  return (
                    <option key={branch.id} value={branch.id}>
                      {branch.data.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-lg-2 mt-sm-3">
            <div className="col-lg-12">
              <select
                className="form-control text-capitalize"
                defaultValue={state.user_id}
                onChange={({ target }) =>
                  setState({ ...state, user_id: target.value })
                }
              >
                <option value="">{state.load ? "Cargando..." : "Todos"}</option>
                {state.userData.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row mt-sm-3 m-0 ml-sm-2">
            <label className="col-lg-1 col-form-label p-0 ml-5 mt-2 ml-sm-3">
              De:
            </label>
            <div className="col-lg-10">
              <DatePicker
                className="form-control"
                selected={
                  new Date(moment(state.date_start).format("MM-DD-YYYY"))
                }
                onSelect={(date) => handleChangeDate("date_start", date)}
                onChange={(date) => handleChangeDate("date_start", date)}
              />
            </div>
          </div>

          <div className="row mt-sm-3 m-0">
            <label className="col-lg-1 col-form-label p-0 mt-2 ml-sm-3">
              a:
            </label>
            <div className="col-lg-10">
              <DatePicker
                className="form-control"
                selected={new Date(moment(state.date_end).format("MM-DD-YYYY"))}
                onSelect={(date) => handleChangeDate("date_end", date)}
                onChange={(date) => handleChangeDate("date_end", date)}
              />
            </div>
          </div>

          <div className="col-lg-2 row mt-sm-3 d-flex justify-content-center m-0 h-50">
            <button
              type="button"
              className="btn w-50 btn-success font-weight-bold"
              onClick={sendDataFilter}
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
