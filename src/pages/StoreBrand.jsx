import React, {useState, useEffect, useContext } from "react";
import useStore from "../hooks/useStore";
import { StoreContext } from "../context/StoreContext";

//Components
import Suppliers from "../components/Store/Suppliers";
import BrandsList from "../components/Store/data/BrandsList";


export default function BrandsComponent(){

  const storeHook = useStore();

  const storeContext = useContext(StoreContext);

  const [state, setState] = useState({
    id: null,
    supplier: 0,
    brands: [],
    name: "",
    loading: false,
  });

  useEffect(()=>{
    getBrands();
  },[state.supplier]); // eslint-disable-line react-hooks/exhaustive-deps


  const getBrands = () => {
    const { supplier } = state;
    if (supplier) {
      storeHook.getBrands({supplier, order: "name"}).then((data)=>{ 
        if(data){
          setState({
            ...state,
            brands: data.data,
          })
        }else{
          console.error("Error al obtener la lista de marcas");
        }
      })
    }
  };

  const handleCancelBtn = () => {
    setState({
      ...state, 
      name: "",
      id: null,
    });
  };

  const saveBrand = (e) => {
    e.preventDefault();
    const {  name, supplier } = state, data = { name, contact_id: supplier};

    if (name.length < 3) {
      window.Swal.fire(
        "Error",
        "El nombre de la marca debe de tener por lo menos 3 caracteres",
        "error"
      );
      return false;
    } else if (!supplier) {
      window.Swal.fire(
        "Error",
        "Debe de elegir a un proveedor primero",
        "error"
      );
      return false;
    }

    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de CREAR un nuevo producto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        storeHook.saveBrand(data).then((data)=>{
          if(data){
            window.Swal.fire({
              title: "Almacenamiento",
              text: "Producto almacenado correctamente",
              icon:'success',
              showCancelButton: false,
              confirmButtonColor: "#007bff",
              confirmButtonText: "Ok",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,
            })
          }
          else{
            console.error("Error al guardar la data enviada");
          }
        })

        storeContext.set({
          ...storeContext,
          panel: 'inbox',
        })

        setState({
          ...state, 
          name: "",
          id: null,
        });
      }
    });
  };

  const prevEdit = (brand) => {
    setState({
      ...state, 
      name: brand.nombre,
      id: brand.id,
    });
  };

  const deleteBrand = (id, item) => {
    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar la marca " + item.toUpperCase() + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true
    }).then(({ dismiss }) => {
      if (!dismiss) {
        console.log("[Orus Suystem] Enviando datos para eliminar marca", id);
        storeHook.deleteBrand(id).then((data)=>{
          if(data === true){
            window.Swal.fire({
              title:'Marcas',
              text:'Marca eliminada correctamente',
              icon:'success',
              showCancelButton: false,
              confirmButtonColor: "#007bff",
              confirmButtonText: "Ok",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,

            })
          }
          else{
            window.Swal.fire({
              title:'Marcas',
              text:'Error al eliminar la marca',
              icon:'error',
              showCancelButton: false,
              confirmButtonColor: "#d33",
              confirmButtonText: "Ok",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,

            })
          }
        })
        storeContext.set({
          ...storeContext,
          panel: 'inbox',
        })
      }
    });
  };
  
  const changeInput = ({ name, value }) => {
    setState({
      ...state, 
      [name]: value.toLowerCase(),
    });
  };

  const { id, supplier, name } = state;

  const { loading } = state;

  return (
    <div className="row" style={{minHeight:'100vh'}}>
      <div className = {supplier ? "col-lg-6" : "col-lg-12"}>
        <div className="card card-primary card-outline">
          <h5 className="card-title mt-2 ml-2 text-bold">
            Marcas para productos
          </h5>
          <div className="card-body">
            <Suppliers
              supplier={supplier}
              handleChangeSupplier={(id) => {
                setState({
                  ...state, 
                  supplier: id,
                  brands: id ? state.brands : [],
                });
              }}
            />
            {!state.brands.length && (
              <p className="card-text">
                <i className="fas fa-info-circle mr-1"></i>
                Para iniciar, primero seleccione a un proveedor
              </p>
            )}
          </div>
        </div>
      </div>

      {supplier ? (
        <div className="col">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <h5 className="card-title text-dark mb-4 text-bold">
                Listado de marcas
              </h5>
              <BrandsList
                brands={state.brands}
                handleEdit={(brand) => prevEdit(brand)}
                handleDelete={(brand) => {
                  deleteBrand(brand.id, brand.name);
                }}
              />
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control mr-1"
                  name="name"
                  value={name}
                  onChange={({ target }) => changeInput(target)}
                />
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default"
                    disabled={!name}
                    onClick={handleCancelBtn}
                  >
                    <i className="fas fa-eraser"></i>
                  </button>
                  <button
                    type="button"
                    className={id ? "btn btn-success" : "btn btn-primary"}
                    onClick={saveBrand}
                    disabled={!name}
                  >
                    <i className="fas fa-save"></i>
                  </button>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="overlay dark">
                <i className="fas fa-2x fa-sync-alt fa-spin"></i>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}


