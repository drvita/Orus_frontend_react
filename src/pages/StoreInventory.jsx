import React, { useState, useEffect } from "react";
import InventoryTableView from "../components/Store/views/Inventory_table";
import SetPriceModal from "../components/Store/views/SetPriceModal";

//Hooks
import useCategory from "../hooks/useCategory";
import useStore from "../hooks/useStore";

//Context
// import { AuthContext } from "../context/AuthContext";

export default function Inventory() {
  // const authContext = useContext(AuthContext);

  const [state, setState] = useState({
    catData_1: [],
    catData_2: [],
    catData_3: [],
    catid_1: 0,
    catid_2: 0,
    catid_3: 0,
    load: false,
    items: [],
    meta: {},
    price: 0,
  });
  const [modal, setModal] = useState(false);

  const hookCategory = useCategory();
  const hookStore = useStore();

  const header = [];
  const body = [];

  let i = 0;
  do {
    header.push(<th key={i}>{i.toFixed(2)}</th>);
    i = i - 0.25;
  } while (i > parseFloat(state.meta.cil) - 0.25);

  i = parseFloat(state.meta.rangoInf);
  do {
    if (i === 0)
      body.push(
        <td>
          <label>0.00</label>
        </td>
      );
    else body.push(<td>{i.toFixed(2)}</td>);
    i = i + 0.25;
  } while (i < parseFloat(state.meta.rangoSup) + 0.25);

  const disabled = state.items.length !== 0 ? false : true;

  const handleModal = () => {
    setModal(!modal);
  };

  const savePriceGlobal = (price) => {
    hookStore
      .saveGlobalPrice({
        price,
        productCategoryId: state.catid_3,
      })
      .then((data) => {
        handleModal();
        if (data) {
          window.Swal.fire({
            title: "Productos",
            text: "Precio asignado correctamente",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#007bff",
            confirmButtonText: "OK",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              console.log("[DEBUG] Show message ok");
            }
          });
        } else {
          console.error("Error en la cosulta");
          window.Swal.fire({
            title: "Productos",
            text: "Erro al guardar el precio global",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#007bff",
            confirmButtonText: "OK",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              console.log("[DEBUG] Show message failer");
            }
          });
        }
      });
  };

  const getItems = async (catid) => {
    const { load } = state;
    const filters = {
      cat: catid,
      itemsPage: 500,
    };
    //Cargando
    if (!load) {
      setState({
        ...state,
        load: true,
      });
    }

    hookStore.getItems(filters).then((data) => {
      if (data) {
        const noGraduationData = data.data.filter(
          (item) => item.grad !== "+000000"
        );
        setState({
          ...state,
          items: noGraduationData ? noGraduationData : [],
          catid_3: catid,
          load: false,
        });
      } else {
        console.error("Error al obtener la lista de productos");
        setState({
          ...state,
          load: false,
        });
      }
    });
  };

  const handleClickCat = (e) => {
    const { name, value } = e.target;
    const { catData_1, catData_2 } = state;
    let sons = [];
    let meta = {};

    if (name === "catid_1") {
      catData_1.map((cat) => {
        if (cat.id === parseInt(value)) {
          sons = cat.sons;
          meta = cat.meta;
          return true;
        } else return false;
      });

      setState({
        ...state,
        catid_1: parseInt(value),
        catid_2: 0,
        catid_3: 0,
        catData_2: sons,
        catData_3: [],
        meta,
      });
    } else if (name === "catid_2") {
      catData_2.map((cat) => {
        if (cat.id === parseInt(value)) {
          sons = cat.sons;
          return true;
        } else return false;
      });

      setState({
        ...state,
        catid_2: parseInt(value),
        catid_3: 0,
        catData_3: sons,
      });
    }
  };

  const getCategories = () => {
    hookCategory.getCategories({ categoryid: "raiz" }).then((data) => {
      if (data && data.data) {
        setState({
          ...state,
          catid_1: 5,
          meta: data.data[0].meta,
          catData_1: data.data[0].sons,
          catData_2: data.data[0].sons[0].sons,
        });
      } else {
        console.error("Error al descargar categorías");
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row" style={{ height: "1000px" }}>
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-around align-items-center">
              <div className="col-lg-3">
                <select
                  className="custom-select"
                  name="catid_2"
                  value={state.catid_2}
                  onChange={handleClickCat}
                >
                  <option value="0">Seleccione un material</option>
                  {state.catData_2.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {state.catid_2 && state.catData_3.length ? (
                <div className="col-lg-9 d-flex justify-content-around align-items-center">
                  <div
                    className="btn-group col-lg-8"
                    role="group"
                    aria-label="Basic example"
                    style={{ height: "3rem" }}
                  >
                    {state.catData_3.map((cat) => {
                      return (
                        <button
                          key={cat.id}
                          className={
                            state.catid_3 === cat.id
                              ? "btn btn-primary"
                              : "btn btn-secondary"
                          }
                          onClick={(e) => {
                            getItems(cat.id);
                            setState({
                              ...state,
                              catid_3: cat.id,
                              load: true,
                            });
                          }}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className="col-lg-4 d-flex flex-column align-items-center justify-content-center">
                    <p>Total de productos: {state.items.length}</p>
                    <button
                      disabled={disabled}
                      className="btn btn-success bg-success"
                      onClick={handleModal}
                    >
                      Asignar Precio
                      <i className="fas fa-money-bill ml-2"></i>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="card-body">
            {state.catid_3 ? (
              <React.Fragment>
                {state.load ? (
                  <div className="text-center">
                    <span className="text-primary">Cargando productos</span>
                    <div
                      className="spinner-border text-primary ml-4"
                      role="status"
                    >
                      <span className="sr-only">Cargando ...</span>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="row mb-2">
                      <div className="col mt-2"></div>
                      <div className="col"></div>
                      <div className="col-6">
                        <div className="row"></div>
                      </div>
                    </div>

                    {modal && (
                      <SetPriceModal
                        handleClose={handleModal}
                        handleSave={savePriceGlobal}
                        category={(() => {
                          const cat1 = state.catData_1.filter(
                            (item) => item.id === state.catid_1
                          );
                          const cat2 = state.catData_2.filter(
                            (item) => item.id === state.catid_2
                          );
                          const cat3 = state.catData_3.filter(
                            (item) => item.id === state.catid_3
                          );
                          const name = `${cat1[0].name} / ${cat2[0].name} / ${cat3[0].name}`;

                          return `${name}`;
                        })()}
                      />
                    )}

                    <InventoryTableView
                      header={header}
                      body={body}
                      itemsProp={state.items}
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <div className="alert alert-warning text-light" role="alert">
                <h4 className="alert-heading">
                  <i className="fas fa-exclamation"></i> Seleccion.
                </h4>
                <hr />
                <ul>
                  {/* {!state.catid_1 ? (
                      <li>Selecciones primero el tipo de lente</li>
                    ) : null} */}
                  {!state.catid_2 ? <li>Seleccione el material</li> : null}
                  <li>Por ultimo el tratamiento</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
