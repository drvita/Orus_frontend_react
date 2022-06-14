/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import moment from "moment";
import Modal from "../../layouts/modal";
import { AuthContext } from "../../context/AuthContext";
import { ConfigContext } from "../../context/ConfigContext";

export default function BreadcrumbComponent() {



  const { auth, setBranch } = useContext(AuthContext);
  const config = useContext(ConfigContext);
  const pathName = useLocation().pathname.split("/");
  const pathArray = pathName && pathName.length ? pathName : ["dashboard"];
  const pathFilter = pathArray.filter((path) => ![""].includes(path));
  const namePage = pathFilter[0];
  const currentBranch = auth.branch;
  const [state, setState] = useState({
    showChangeBranchs: false,
    date: moment().format("LLLL"),
    branchSelect: currentBranch.id,
  });

  const branches = config.data?.filter((c) => c.name === "branches") ?? [];
  
  // functions
  const handleChangeBranch = (e) => {
    e.preventDefault();

    setState({
      ...state,
      showChangeBranchs: true,
    });
  };
  const handleCancelModal = () => {
    setState({ ...state, showChangeBranchs: false });
  };
  const handleClickChangeBranch = () => {
    const { branchSelect: branch_id } = state;

    handleCancelModal();

    if (!branch_id) {
      console.error("[Orus System][ERROR] branch id is empty");
      window.location.reload();
      return;
    }

    window.Swal.fire({
      text: "¿Realmente desea cambiarse de sucursal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        setBranch(branch_id).then((res) => {
          if (res) {
            window.location.reload();
          } else {
            window.Swal.fire({
              icon: "error",
              text: "Lo sentimos, hay un problema de comunicacion con el servidor. Comfirme el IP.",
              showConfirmButton: false,
              timer: 3000,
              position: "top center",
            });
          }
        });
      }
    });
  };
  const getHtmlBody = () => {
    const { branchSelect } = state;

    return (
      <div className="form-group">
        <label>Seleccione la sucursal</label>
        <select
          className="form-control text-capitalize"
          onChange={({ target }) =>
            setState({ ...state, branchSelect: parseInt(target.value) })
          }
          defaultValue={currentBranch?.id}
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.data.name}
            </option>
          ))}
        </select>
        <div className="mt-2 text-right">
          <button
            className="btn btn-default"
            type="button"
            onClick={handleClickChangeBranch}
            disabled={branchSelect === currentBranch?.id ? true : false}
          >
            Cambiar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="m-0 text-dark text-capitalize">
              <i className="mr-1 fas fa-file"></i> {namePage}
            </h1>
          </div>
          <div className="text-center col">
            <small
              className="p-2 badge badge-secondary text-capitalize"
              alt="conectado a"
              title="conectado a"
            >
              <i className="mr-1 fas fa-wifi text-success"></i>
              {config.server?.host}
              {config.server?.port && config.server?.port !== "80"
                ? `:${config.server?.port}`
                : null}
            </small>
            <small
              className="p-2 mt-1 ml-1 badge badge-secondary text-capitalize"
              alt="Almacenando en"
              title="Almacenando en"
            >
              <i className="mr-1 fas fa-server text-success"></i>
              {auth.permissions?.includes("auth.changeBranch") ? (
                <a
                  href="#link"
                  className="text-white"
                  onClick={handleChangeBranch}
                >
                  {currentBranch.name}
                </a>
              ) : (
                currentBranch.name
              )}
            </small>
            <small
              className="p-2 mt-1 ml-2 badge badge-secondary text-capitalize"
              alt="Usuario conectado"
              title="Usuario conectado"
            >
              <i className="mr-1 fas fa-user text-info"></i> {auth.username}
            </small>
            {state.showChangeBranchs ? (
              <Modal
                title="Cambiar de sucursal"
                body={getHtmlBody()}
                handleCancel={handleCancelModal}
              />
            ) : null}
          </div>
          <div className="col">
            <h6 className="text-right text-muted">
              <i className="mr-1 fas fa-calendar"></i> {state.date}
            </h6>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );

  
}
