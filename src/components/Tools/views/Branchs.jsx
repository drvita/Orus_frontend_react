import { useState, useContext } from "react";
import { ConfigContext } from "../../../context/ConfigContext";
//import helper from "../helpers";

export default function BranchsListComponent() {

  const [data, setData] = useState({
    showForm: false,
    id: 0,
    name: "",
    address: "",
    phone: "",
  });
  
/*   const options = {
    page: 1,
    name: "branches",
    itemsPage: 10,
  }; */

  const configContext = useContext(ConfigContext);

  const branches = configContext.data.filter((item)=>item.name === 'branches');

  //Actions
  const handleUpdateConfig = ({ id, values, data }) => {
      setData({
        ...data,
        showForm: true,
        id,
        //TODO: Destructuramoos data, Cambiamos values por data, validamos si existen [name, address, phone] evitar toString //
        name: data.name?.toString().toLowerCase(),
        address: data.address?.toString().toLowerCase(),
        phone: data.phone?.toString().toLowerCase(),
      });
    },

    handleCancelForm = () =>
      setData({
        ...data,
        showForm: false,
        id: 0,
        name: "",
        address: "",
        phone: "",
      }),

    handleNewBranch = () => setData({ ...data, showForm: true }),

    handleChangeValue = ({ name, value }) => {
      setData({
        ...data,
        [name]: value.toString().toLowerCase(),
      });
    },

    handleSendDataForm = (e) => {
      e.preventDefault();
    };


  return (
    <div className="card card-primary card-outline">
      <div className="card-body">
        <h5 className="card-title d-block mb-2">
          <i className="fas fa-store mr-1"></i>
          Sucursales
        </h5>

        {data.showForm ? (
          <form className="card-text m-2 mt-4" onSubmit={handleSendDataForm}>
            <div className="form-group">
              <label>Nombre de la sucursal</label>
              <input
                type="text"
                placeholder="Escriba el nombre de la sucursal"
                className="form-control"
                name="name"
                defaultValue={data.name}
                onChange={({ target }) => handleChangeValue(target)}
              />
            </div>
            <div className="form-group">
              <label>Domicilio</label>
              <input
                type="text"
                placeholder="Escriba el domicilio de la sucursal"
                className="form-control"
                name="address"
                defaultValue={data.address}
                onChange={({ target }) => handleChangeValue(target)}
              />
            </div>
            <div className="form-group">
              <label>Telefono</label>
              <input
                type="phone"
                placeholder="Escriba el telefono de la sucursal"
                className="form-control"
                name="phone"
                defaultValue={data.phone}
                onChange={({ target }) => handleChangeValue(target)}
                maxLength={10}
              />
            </div>
            <div className="form-group text-right">
              <button
                type="button"
                className="btn btn-link"
                onClick={handleCancelForm}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-dark ml-2">
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Domicilio</th>
                  <td>
                    <span className="sr-only">Acciones</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch) => (
                  branch.name !== 'bank' ? (
                    <tr key={branch.id}>
                    <td className="text-capitalize">{branch.data.name}</td>
                    <td className="text-truncate text-capitalize">
                      {branch.data.address ?? "--"}
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary ml-1"
                        onClick={() => handleUpdateConfig(branch)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-right">
        <button
          className="btn btn-primary btn-sm"
          disabled={data.showForm}
          onClick={handleNewBranch}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
