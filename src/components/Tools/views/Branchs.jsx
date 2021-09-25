import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { configActions } from "../../../redux/config";
import helper from "../helpers";

export default function BranchsListComponent() {
  const { list } = useSelector((state) => state.config),
    dispatch = useDispatch();
  const [data, setData] = useState({
    showForm: false,
    id: 0,
    name: "",
    address: "",
    phone: "",
  });
  const options = {
    page: 1,
    name: "branches",
    itemsPage: 10,
  };

  //Actions
  const handleUpdateConfig = ({ id, values }) => {
      console.log("[DEBUG] Handle updated", id);
      setData({
        ...data,
        showForm: true,
        id,
        name: values.name.toString().toLowerCase(),
        address: values.address.toString().toLowerCase(),
        phone: values.phone.toString().toLowerCase(),
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

      if (helper.verifyData(data)) {
        helper.saveConfig(data, options, dispatch);
        handleCancelForm();
      }
    },
    handleDeleteConf = ({ id, values }) =>
      helper.deleteConfig(id, options, values.name, dispatch);

  useEffect(() => {
    dispatch(configActions.getListConfig(options));
    //eslint-disable-next-line
  }, []);

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
                {list.map((branch) => (
                  <tr key={branch.id}>
                    <td className="text-capitalize">{branch.values.name}</td>
                    <td className="text-truncate text-capitalize">
                      {branch.values.address ?? "--"}
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        onClick={() => handleDeleteConf(branch)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary ml-1"
                        onClick={() => handleUpdateConfig(branch)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
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
