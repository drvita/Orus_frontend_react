import { useContext, useState } from "react";
// import { connect } from "react-redux";
import moment from "moment";
// import { configActions } from "../../redux/config";
// import { userActions } from "../../redux/user";
import Modal from "../../layouts/modal";
import { AuthContext } from "../../context/AuthContext";
import { ConfigContext } from "../../context/ConfigContext";

export default function BreadcrumbComponent() {
  const { auth: currentUser } = useContext(AuthContext);
  const config = useContext(ConfigContext);
  const HOST = config.host;
  const namePage = "Name page";
  const [state, setState] = useState({
    showChangeBranchs: false,
    date: moment().format("LLLL"),
    selectBranch: "",
  });
  const { name: USER_NAME, permissions } = currentUser;
  const branches = config.data.filter((c) => c.name === "branches");
  const branch = currentUser.branch;

  // functions
  const handleChangeBranch = (e) => {
    e.preventDefault();

    setState({
      ...state,
      showChangeBranchs: true,
    });
  };
  const handleChangeSelectBranchs = ({ target }) => {
    console.log("[DEBUG] Target:", target);
  };
  const handleCancelModal = () => {
    setState({ ...state, showChangeBranchs: false });
  };
  const handleClickChangeBranch = () => {
    const { selectBranch: branch_id } = state;

    handleCancelModal();

    if (!branch_id) {
      console.error("[Orus System][ERROR] branch id is empty");
      // window.location.reload();
      return;
    }

    // window.Swal.fire({
    //   text: "El cambio de sucursal, necesita volver a cargar la pagina",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonColor: "#d33",
    //   confirmButtonText: "Confirmar",
    //   cancelButtonText: "Cancelar",
    //   showLoaderOnConfirm: true,
    // }).then(({ dismiss }) => {
    //   if (!dismiss) {
    //     _saveUser({
    //       data: {
    //         branch_id,
    //       },
    //       id: idUser,
    //       currentUser: idUser,
    //     });
    //     setTimeout(() => document.location.reload(), 1500);
    //     return true;
    //   }
    // });
  };
  const getHtmlBody = (branches, currentBranch) => {
    const { selectBranch: branchState } = state;

    return (
      <div className="form-group">
        <label>Seleccione la sucursal</label>
        <select
          className="form-control text-capitalize"
          onChange={handleChangeSelectBranchs}
          value={branchState ? branchState : currentBranch}
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <div className="mt-2 text-right">
          <button
            className="btn btn-default"
            type="button"
            onClick={handleClickChangeBranch}
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
              {HOST}
            </small>
            <small
              className="p-2 mt-1 ml-1 badge badge-secondary text-capitalize"
              alt="Almacenando en"
              title="Almacenando en"
            >
              <i className="mr-1 fas fa-server text-success"></i>
              {permissions.includes("auth.changeBranch") ? (
                <a
                  href="#link"
                  className="text-white"
                  onClick={handleChangeBranch}
                >
                  {branch.name}
                </a>
              ) : (
                branch.name
              )}
            </small>
            <small
              className="p-2 mt-1 ml-2 badge badge-secondary text-capitalize"
              alt="Usuario conectado"
              title="Usuario conectado"
            >
              <i className="mr-1 fas fa-user text-info"></i> {USER_NAME}
            </small>
            {state.showChangeBranchs ? (
              <Modal
                title="Cambiar de sucursal"
                body={getHtmlBody(branches, branch.id)}
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
