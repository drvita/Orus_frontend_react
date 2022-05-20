import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

//Context
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";

//Hooks
import useStore from "../../hooks/useStore";

// Components
import CategoryInput from "./Categories";
import Suppliers from "./Suppliers";
import Brands from "./Brands";
import Code from "./Code";
import Activitys from "../Activitys";
import BranchesSelect from '../../components/Store/views/BranchesSelect';
import BranchesForm from '../../components/Store/views/BranchesForm';

const initialState = {
  id: 0,
  code: "",
  codebar: "",
  grad: "",
  brand_id: 0,
  name: "",
  unit: "PZ",
  cant: 1,
  price: 1,
  supplier_id: 0,
  category_id: 0,
  branch_default: 12,
  data: {
    category: { code: [] },
    categories: [],
    branches: [],
    codes: [],
    category_code: [],
    activity:[],
  },
  loading: false,
};

export default function Add(props) {
  const storeContext = useContext(StoreContext);
  const { id } = props.match.params;
  const [state, setState] = useState(initialState);
  const _store = useStore();
  const { code, loading: LOADING } = state;
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const idsCategory = state.data.category.code 
                      ? state.data.category.code.filter((i) => i !== "") 
                      : [];

  let readyToSave = false;  
  if (idsCategory.includes("1")) {
    readyToSave = state.category_id && state.code && state.name;
  } else {
    readyToSave = state.category_id && state.code && state.name && state.supplier_id && state.brand_id;
  }

  // Functions
  const saveProduct = ()=>{
    _store.saveItem(state).then((data) => {
      if(data){
        window.Swal.fire({
          title: "Productos",
          text: "Producto guardado correctamente",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#007bff",
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
        }).then(({ dismiss }) => {
          if (!dismiss) {
            setState(initialState);
            storeContext.set({
              ...storeContext,
              panel: 'inbox',
            })
            history.push('/almacen');
          }
        });
      }else{
        window.Swal.fire({
          title: "Almacenamiento",
          text: "Error al guardar el producto",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#007bff",
          confirmButtonText: "Crear",
          cancelButtonText: "Cancelar",
          showLoaderOnConfirm: true,
        })
      }
    })
  }



  const getItem = () => {
    _store.getItem(id).then((res) => {
      console.log("API response", res);
      setState({
        ...state,
        id: res.id ? res.id : 0,
        name: res.name ? res.name : '',
        category_id: res.category?.id,
        supplier_id: res.supplier?.id,
        brand_id: res.brand?.id,
        branch_default: authContext.auth.branch.id ? authContext.auth.branch.id : '12', 
        code: res.code ? res.code : '',
        data: {
          ...state.data,
          category: res.category ? res.category : [],
          inBranches: res.inBranches ? res.inBranches : '',
          branches: res.branches ? res.branches : [],
          activity: res.activity ? res.activity : [],
        },
        loading: false,
      });
    });
  };

  useEffect(() => {
    if (id) {
      getItem();
    }
  }, [id]);

  return (
    <div className="row">
      <div className="col">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h3 className="card-title text-primary text-bold">
              <i className="fas fa-database mr-1"></i>
              {id ? `Editar producto (${code})` : "Registrar nuevo producto"}
            </h3>
          </div>
          <form className="card-body" autoComplete="off">
            <div className="row">
              <div className="col">
                <fieldset>
                  <small className="mr-2">
                    <label>Categoria</label>
                  </small>

                  <CategoryInput
                    category={state.category_id}
                    handleChange={(id, code) => {
                      setState({
                        ...state,
                        category_id: id,                    
                        data: {
                          ...state.data,
                          category_code: code,
                        },
                      });
                    }}
                  />
                </fieldset>
              </div>
            </div>

            {Boolean(state.data.category_code.length) &&
              !state.data.category_code.includes("1") && (
                <Suppliers
                  supplier={state.supplier_id}
                  handleChangeSupplier={(id) => {
                    setState({
                      ...state,
                      supplier_id: id,
                      brand_id: 0,
                    });
                  }}
                />
              )}

            {Boolean(state.supplier_id) && (
              <Brands
                brand={state.brand_id}
                supplier={state.supplier_id}
                textSelect="Selecione la marca"
                handleChangeBrand={(id) => {
                  setState({
                    ...state,
                    brand_id: id,
                  });
                }}
              />
            )}

            {state.category_id ? (
              <>
                <div className="row">
                  {state.data.category_code.includes("1") && (
                    <div className="col-3">
                      <small>
                        <label>Graduacion</label>
                      </small>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text bg-primary">
                            <i className="fas fa-glasses"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="+100100"
                          defaultValue={state.grad}
                          onChange={({ target }) =>
                            setState({ ...state, grad: target.value })
                          }
                          maxLength="7"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  )}
                  <div className="col">
                    {state.unit ? (
                      <small>
                        <label>Unidad de presentacion</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className={
                            state.unit
                              ? "input-group-text bg-primary"
                              : "input-group-text bg-warning"
                          }
                        >
                          <i className="fas fa-balance-scale"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unidad de presentación"
                        defaultValue={state.unit}
                        onChange={({ target }) =>
                          setState({ ...state, unit: target.value })
                        }
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    {state.code ? (
                      <small>
                        <label>Codigo</label>
                      </small>
                    ) : (
                      <br />
                    )}

                    <Code
                      code = {state.code} 
                      id = {state.id}  
                      onChangeProductCode = {(codeReceibed)=>{
                        setState({
                          ...state,
                          code: codeReceibed
                        })
                      }}                          
                    />
                  </div>
                  <div className="col">
                    <small>
                      <label>Codigo de barras</label>
                    </small>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-primary">
                          <i className="fas fa-barcode"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Codigo de barras"
                        name="codebar"
                        defaultValue={state.codebar}
                        onChange={({target}) => {
                          setState({
                            ...state,
                            codebar: target.value,
                          })
                        }}
                        autoComplete="off"
                        maxLength="100"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {state.name ? (
                      <small>
                        <label>Nombre del producto</label>
                      </small>
                    ) : (
                      <br />
                    )}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className={
                            state.name
                              ? "input-group-text bg-primary"
                              : "input-group-text bg-warning"
                          }
                        >
                          <i className="fas fa-archive"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-uppercase"
                        placeholder="Nombre"
                        name="name"
                        defaultValue={state.name}
                        onChange={({target}) => {
                          setState({
                            ...state,
                            name: target.value,
                          })
                        }}
                        maxLength="149"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                <div className="col">
                  <h6 className="text-warning">
                    Seleccione primero una categoría.
                  </h6>
                </div>
              </div>
            )}
          </form>
          <div className="card-footer text-right">
            <div className="row">
              <div className="col-md-12">
                <div className="btn-group" role="group">
                  <Link
                    to="/almacen"
                    className="btn btn-default"
                    onClick={() => {
                      storeContext.set({
                        ...storeContext,
                        panel:'inbox',
                      })
                    }}
                  >
                    <i className="fas fa-ban mr-1"></i>
                    {id ? "Cerrar" : "Cancelar"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      saveProduct();
                    }}
                    className={
                      !readyToSave ? "btn btn-secondary" : "btn btn-primary"
                    }
                    disabled={!readyToSave}
                  >
                    <i className="fas fa-save mr-1"></i>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          {LOADING && (
            <div className="overlay dark">
              <i className="fas fa-2x fa-sync-alt fa-spin"></i>
            </div>
          )}
        </div>
      </div>
      {id ? (
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h5 className="card-title text-primary">
                    Sucursal por defecto
                  </h5>
                </div>
                <div className="card-body">
                  <BranchesSelect
                    branch_default={state.branch_default}
                    showIcon={false}
                    setBranchId={(target) => {
                      const { value } = target;
                      setState({ 
                        ...state, 
                        branch_default: value,
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <BranchesForm
                branches = {state.data.branches}
                storeItemID = {state.id}
              />
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="col-lg-12">
        <Activitys
            data = {state.data.activity}
          />
      </div>
    </div>
  );
}

