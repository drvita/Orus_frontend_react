import { useContext, useState } from "react";
import { ConfigContext } from "../../context/ConfigContext";
import useUsers from "../../hooks/useUsers";

export default function Filters({ filters, changeState }) {
  const { currentUser, branch_id, date_end, date_start } = filters;

  const [state, setState] = useState({
    branch_id: branch_id,
    currentUser: currentUser,
    date_start,
    date_end,
  });
  
  const config = useContext(ConfigContext);
  

  // Functions
  const sendDataFilter = () => {
    const { currentUser, branch_id, date_end, date_start } = state;
    changeState({
      branch_id,
      currentUser,
      date_start,
      date_end,
    });
  };

  const usersHook = useUsers();

  const branches = config.data.filter((c) => c.name === "branches");


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
                defaultValue={branch_id}
                onChange={({ target }) =>
                  setState({ ...state, branch_id: target.value })
                }
              >
                <option value="">
                  {branch_id === "" ? "Sucursal" : "Todas"}
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
                defaultValue={currentUser}
                onChange={({ target }) =>
                  setState({ ...state, currentUser: target.value })
                }
              >
                <option value="">
                  {currentUser === "" ? "Usuarios" : "Todos"}
                </option>
                {usersHook.listUsers.map((user) => {
                  if (!branch_id) {
                    return(
                      <option key={user.id} value={user.id}>{user.name}</option>
                    )
                  } else {
                    return user.branch.id === branch_id && user.roles[0] !== 'doctor' ? (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ) : null;
                  }
                })}
              </select>
            </div>
          </div>

          <div className="row mt-sm-3 m-0 ml-sm-2">
            <label className="col-lg-1 col-form-label p-0 ml-5 mt-2 ml-sm-3">
              De:
            </label>
            <div className="col-lg-10">
              <input
                type="date"
                className="form-control"
                defaultValue={date_start}
                onChange={({ target }) =>
                  setState({ ...state, date_start: target.value })
                }
              />
            </div>
          </div>

          <div className="row mt-sm-3 m-0">
            <label className="col-lg-1 col-form-label p-0 mt-2 ml-sm-3">
              a:
            </label>
            <div className="col-lg-10">
              <input
                type="date"
                className="form-control"
                defaultValue={date_end}
                onChange={({ target }) =>
                  setState({ ...state, date_end: target.value })
                }
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
