import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Components
import ListInbox from "../../../layouts/list_inbox";
import { api, getUrl } from "../../../redux/sagas/api";
//Actions
import { storeActions } from "../../../redux/store/index";
import helper from "../helpers";

function InboxComponent(props) {
  const {
    loading,
    meta,
    list = [],
    options,
    //Functions
    _getList,
    _setOptions,
    _deleteItem,
    _getItem,
    _setLoading,
  } = props;
  //States
  const [itemSelected, setItemSelected] = useState({ id: 0 });
  //Functions
  const handleChangeOptions = (key, value) => {
      if (options[key] !== value) {
        _setOptions({
          key,
          value,
        });
      }
    },
    deleteItem = () => {
      helper.handleDeleteItem(itemSelected, options, _deleteItem);
      setItemSelected({ id: 0 });
    },
    handleItemSelect = ({ checked }, item) => {
      if (!checked) item = { id: 0 };
      setItemSelected(item);
    },
    handleSelectItem = (e, item = { id: 0 }) => {
      if (e) e.preventDefault();

      if (item.id) {
        _getItem(item.id);
      } else if (itemSelected.id) {
        _getItem(itemSelected.id);
      }
    },
    handleDownload = async () => {
      _setLoading(true);
      const newOptions = { ...options, responseType: "csv" };
      console.log("[Orus Sytem] Start donwload csv");
      const url = getUrl("store", null, newOptions);
      const data = await api(url);
      _setLoading();
      if (data) {
        console.log("[Orus Sytem] Process data csv");
        window.open(URL.createObjectURL(data));
        console.log("[Orus Sytem] Donwload is ok");
        window.Swal.fire({
          title: "Descargas",
          text: "El archivo CSV fue generado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        window.Swal.fire({
          title: "Descargas",
          text: "El archivo CSV no se genero correctamente",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };

  useEffect(() => {
    _getList(options);
    //eslint-disable-next-line
  }, [options]);

  //console.log("[DEBUG] Render", list);
  return (
    <ListInbox
      title="Lista de productos"
      icon="id-badge"
      color="primary"
      loading={loading}
      meta={meta}
      itemSelected={itemSelected.id}
      defaultSearch={options.search}
      handlePagination={(page) => handleChangeOptions("page", page)}
      handleSearch={(search) => handleChangeOptions("search", search)}
      handleDeleteItem={deleteItem}
      handleEditItem={handleSelectItem}
      handleDownload={handleDownload}
      handleSync={() => _getList(options)}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Codigo</th>
            <th>Describción</th>
            <th>Proveedor</th>
            <th>Marca</th>
            <th>Cant</th>
          </tr>
        </thead>
        <tbody>
          {list.length ? (
            <>
              {list.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="icheck-primary pl-2">
                      <input
                        type="checkbox"
                        className="form-check-input mt-4"
                        value={item.id}
                        id={"item_" + item.id}
                        checked={itemSelected.id === item.id ? true : false}
                        onChange={({ target }) =>
                          handleItemSelect(target, item)
                        }
                      />
                      <label
                        htmlFor={"item_" + item.id}
                        className="sr-only"
                      ></label>
                    </td>
                    <td className="icheck-primary">
                      <div className="badge badge-dark text-uppercase">
                        {item.codigo}
                      </div>
                    </td>
                    <td className="mailbox-name text-capitalize text-truncate">
                      <a
                        href="·link"
                        onClick={(e) => handleSelectItem(e, item)}
                        className="text-bold"
                      >
                        {item.producto}
                      </a>
                    </td>
                    <td className="mailbox-attachment text-capitalize text-truncate text-muted">
                      <span>
                        {item.proveedor ? item.proveedor.nombre : "--"}
                      </span>
                    </td>
                    <td className="mailbox-attachment text-uppercase text-truncate text-muted">
                      <span>{item.marca ? item.marca.marca : "--"}</span>
                    </td>
                    <td className="mailbox-date text-muted text-truncate text-right">
                      <span>{item.cant_total}</span>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <th className="text-center text-muted" colSpan="6">
                No hay productos registrados
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </ListInbox>
  );
}

const mapStateToProps = ({ storeItem }) => {
    return {
      list: storeItem.list,
      meta: storeItem.metaList,
      messages: storeItem.messages,
      loading: storeItem.loading,
      options: storeItem.options,
    };
  },
  mapActionsToProps = {
    _getList: storeActions.getListStore,
    _setOptions: storeActions.setOptions,
    _deleteItem: storeActions.deleteItem,
    _setItem: storeActions.setItem,
    _getItem: storeActions.getItem,
    _setLoading: storeActions.setLoading,
  };

export default connect(mapStateToProps, mapActionsToProps)(InboxComponent);
