import React, { Component, useState, useEffect } from "react";
import useStore from "../hooks/useStore";
import { connect } from "react-redux";

//Components
import Suppliers from "../components/Store/Suppliers";
import BrandsList from "../components/Store/data/BrandsList";

//Actions
///import { storeActions } from "../../redux/store/index";


export default function BrandsComponent(){

  const storeHook = useStore();

  const [state, setState] = useState({
    id: null,
    supplier: 0,
    brands: [],
    name: "",
  });


  useEffect(()=>{
    getBrands();
  },[]);


  const getBrands = () => {
    const { supplier } = state;
    console.log(supplier);
    if (supplier) {
      storeHook.getBrands({supplier, order: "name"}).then((data)=>{
        if(data){
          console.log(data);
        }else{
          console.error("Error al obtener la lista de marcas");
        }
      })
    }
  };


  const { id, supplier, name } = state, { brands, loading } = this.props;

  return (
    <div className="row">
      <div className="col-4">
        <div className="card card-primary card-outline">
          <h5 className="card-title mt-2 ml-2 text-bold">
            Marcas para productos
          </h5>
          <div className="card-body">
            <Suppliers
              supplier={supplier}
              handleChangeSupplier={(id) => {
                this.setState({
                  supplier: id,
                  brands: id ? this.state.brands : [],
                });
              }}
            />
            {!brands.length && (
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
                brands={brands}
                handleEdit={(brand) => this.prevEdit(brand)}
                handleDelete={(brand) => {
                  this.deleteBrand(brand.id, brand.nombre);
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
                  onChange={({ target }) => this.changeInput(target)}
                />
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default"
                    disabled={!name}
                    onClick={this.handleCancelBtn}
                  >
                    <i className="fas fa-eraser"></i>
                  </button>
                  <button
                    type="button"
                    className={id ? "btn btn-success" : "btn btn-primary"}
                    onClick={this.saveBrand}
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





/* class BrandsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      supplier: 0,
      brands: [],
      name: "",
    };
  }

  componentDidUpdate(props, state) {
    const { supplier } = this.state;

    if (state.supplier !== supplier && supplier) {
      this.getBrands();
    }
  }
  render() {
    const { id, supplier, name } = this.state,
      { brands, loading } = this.props;

    return (
      <div className="row">
        <div className="col-4">
          <div className="card card-primary card-outline">
            <h5 className="card-title mt-2 ml-2 text-bold">
              Marcas para productos
            </h5>
            <div className="card-body">
              <Suppliers
                supplier={supplier}
                handleChangeSupplier={(id) => {
                  this.setState({
                    supplier: id,
                    brands: id ? this.state.brands : [],
                  });
                }}
              />
              {!brands.length && (
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
                  brands={brands}
                  handleEdit={(brand) => this.prevEdit(brand)}
                  handleDelete={(brand) => {
                    this.deleteBrand(brand.id, brand.nombre);
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
                    onChange={({ target }) => this.changeInput(target)}
                  />
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default"
                      disabled={!name}
                      onClick={this.handleCancelBtn}
                    >
                      <i className="fas fa-eraser"></i>
                    </button>
                    <button
                      type="button"
                      className={id ? "btn btn-success" : "btn btn-primary"}
                      onClick={this.saveBrand}
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

  prevEdit = (brand) => {
    this.setState({
      name: brand.nombre,
      id: brand.id,
    });
  };
  handleCancelBtn = () => {
    this.setState({
      name: "",
      id: null,
    });
  };
  changeInput = ({ name, value }) => {
    this.setState({
      [name]: value.toLowerCase(),
    });
  };
  deleteBrand = (id, item) => {
    const { supplier } = this.state,
      { _deleteBrand } = this.props;

    window.Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro de eliminar la marca " + item.toUpperCase() + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        console.log("[Orus Suystem] Enviando datos para eliminar marca", id);
        _deleteBrand({
          id,
          options: {
            supplier,
            order: "name",
          },
        });
      }
    });
  };
  saveBrand = (e) => {
    e.preventDefault();
    const { id, name, supplier } = this.state,
      { _saveBrand } = this.props,
      data = {
        name,
        contact_id: supplier,
      };

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
      text: id
        ? "¿Esta seguro de ACTUALIZAR la marca?"
        : "¿Esta seguro de CREAR una nueva marca?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        _saveBrand({
          id,
          data,
          options: {
            supplier,
            order: "name",
          },
        });
        this.setState({
          name: "",
          id: null,
        });
      }
    });
  };

  getBrands = () => {
    //Constantes
    const { supplier } = this.state,
      { _getBrands } = this.props;

    if (supplier) {
      _getBrands({
        supplier,
        order: "name",
      });
    }
  };
}

const mapStateToProps = ({ storeItem }) => {
    return {
      brands: storeItem.brands,
      loading: storeItem.loading,
    };
  },
  mapActionsToProps = {
    _getBrands: storeActions.getListBrands,
    _saveBrand: storeActions.saveBrand,
    _deleteBrand: storeActions.deleteBrand,
  };

export default connect(mapStateToProps, mapActionsToProps)(BrandsComponent);
 */