/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../../context/StoreContext";
import useStore from "../../hooks/useStore";

//Components
import ListInbox from "../../layouts/list_inbox";
import { api, getUrl } from "../../redux/sagas/api";

export default function Inbox(props) {
  const context = Store();
  const _store = useStore();
  const history = useHistory();
  //const storeContext = useContext(StoreContext);

  //States
  const [state, setState] = useState({
    itemSelected: {},
    items: [],
    meta: {},
    loading: false,
  });
  //Functions
  const handleChangeOptions = (key, value) => {
      if (context.options[key] !== value) {
        context.set({
          ...context,
          options: {
            ...context.options,
            [key]: value,
          },
        });
      }
    },
    deleteItem = () => {
      window.Swal.fire({
        title: "Productos",
        text: "Desea eliminar el producto seleccionado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
      }).then(({ dismiss }) => {
        if (!dismiss) {
          //Hook de eliminar producto
          _store.deleteItem(state.itemSelected.id).then((data)=>{
            if(data === true){
              window.Swal.fire({
                title: "Productos",
                text: "Producto eliminado correctamente",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#007bff",
                confirmButtonText: "Ok",
                cancelButtonText: "Cancelar",
                showLoaderOnConfirm: true,
              }).then(({ dismiss }) => {
                if (!dismiss) {
                  setState({
                    ...state,
                    itemSelected: {},
                  });

                  setState({
                    ...state,
                    loading: true,
                  });

                  _store.getItems(context.options).then((res) => {
                    if (res) {
                      setState({
                        ...state,
                        items: res.data,
                        meta: res.meta,
                        loading: false,
                      });
                    }
                  });
                }
              });
            }
          })
        }
      });


      //helper.handleDeleteItem(state.itemSelected, context.options, () => {});
      /* setState({
        ...state,
        itemSelected: {},
      }); */
    },

    handleItemSelect = ({ checked }, item) => {
      setState({
        ...state,
        itemSelected: checked ? item : {},
      });
    },


    handleSelectItem = (e, item) => {
      if (e) e.preventDefault();

      if (item?.id) {
        history.push(`/almacen/${item.id}`);
      } else if (state.itemSelected?.id) {
        history.push(`/almacen/${state.itemSelected.id}`);
      }
    },
    handleDownload = async () => {
      // _setLoading(true);
      const newOptions = { ...context.options, responseType: "csv" };
      console.log("[Orus Sytem] Start donwload csv");
      const url = getUrl("store", null, newOptions);
      const data = await api(url);
      // _setLoading();
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
  const handleSync = () => {
    setState({
      ...state,
      loading: true,
    });
    _store.getItems(context.options).then((res) => {
      if (res) {
        setState({
          ...state,
          items: res.data,
          meta: res.meta,
          loading: false,
        });
      }
    });
  };

  useEffect(() => {
    handleSync();
  }, [context.options]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ListInbox
      title="Lista de productos"
      icon="id-badge"
      color="primary"
      loading={state.loading}
      meta={state.meta}
      itemSelected={state.itemSelected?.id}
      defaultSearch={context.options.search}
      handlePagination={(page) => handleChangeOptions("page", page)}
      handleSearch={(search) => handleChangeOptions("search", search)}
      handleDeleteItem={deleteItem}
      handleEditItem={handleSelectItem}
      handleDownload={handleDownload}
      handleSync={handleSync}
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
          {state.items.length ? (
            <>
              {state.items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="icheck-primary pl-2">
                      <input
                        type="checkbox"
                        className="form-check-input mt-4"
                        value={item.id}
                        id={"item_" + item.id}
                        checked={
                          state.itemSelected?.id === item.id ? true : false
                        }
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
                        {item.code}
                      </div>
                    </td>
                    <td className="mailbox-name text-capitalize text-truncate">
                      <a
                        href="·link"
                        onClick={(e) => handleSelectItem(e, item)}
                        className="text-bold"
                      >
                        {item.name}
                      </a>
                    </td>
                    <td className="mailbox-attachment text-capitalize text-truncate text-muted">
                      <span>{item.supplier ? item.supplier.name : "--"}</span>
                    </td>
                    <td className="mailbox-attachment text-uppercase text-truncate text-muted">
                      <span>{item.brand ? item.brand.name : "--"}</span>
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
