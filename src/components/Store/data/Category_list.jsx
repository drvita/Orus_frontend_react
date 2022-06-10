import React, { useEffect, useState, useContext } from "react";
import useCategory from "../../../hooks/useCategory";
import { StoreContext } from "../../../context/StoreContext";


export default function CategoryListComponent(props){

  const hookCategory = useCategory();
  
  const ls = JSON.parse(localStorage.getItem("OrusSystem"));

  const storeContext = useContext(StoreContext);

  const [state, setState] = useState({
    id: 0,
    meta: {},
    dd: false,
    name: "",
    category_raiz: [],
    category_id: props.category,
    page: 1,
    host: ls.host,
    token: ls.token,
    load: false,
  });

  const { category_raiz, category_id, name, add } = state, { loading: load } = props;

  useEffect(()=>{

    const { categoryData = [] } = props;

    if (categoryData) {
      setState({
        ...state, 
        category_raiz: categoryData,
      });
    }
  },[props])// eslint-disable-line react-hooks/exhaustive-deps


  const handleClickAdd = () => {
    setState({
      ...state,
      add: !state.add,
      name: "",
    });
  };

  const handleSelectCategory = (cat) => {

    const { last, categorySelect: _categorySelect } = props, { category_raiz } = state;

    if (last) return false;
    if (!cat.sons || (cat.sons && !cat.sons.length)) return false;

    _categorySelect({
      category_id: cat.id,
      category_data: category_raiz,
    });

    setState({
      ...state, 
      category_id: cat.id,
    });
  };

  const handleClickDelete = (id, name) => {
    if (id) {
      //const { _delete } = this.props;
      /* const item = { id }, options = { categoryid: "raiz" },
      text =
      "Esta seguro de eliminar la categoria: " + name.toUpperCase() + "?"; */

      //Ejecutar hook para eliminar la categoria
      hookCategory.deleteCategory(id).then((data)=>{
        if(data){
          window.Swal.fire({
            title: "Categorias",
            text: 'Categoria eliminada correctamente',
            icon: "success",
            showCancelButton: false,
            confirmButtonText:"OK",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              storeContext.set({
                ...storeContext,
                panel:"inbox",
              })
            }
          });
        }else{
          window.Swal.fire({
            title: "Categorias",
            text: 'Error al eliminar la categoria',
            icon: "error",
            showCancelButton: false,
            confirmButtonText:"OK",
            showLoaderOnConfirm: true,
          })
        }
      })
      //helper.handleDeleteItem(item, options, _delete, text);
    }
  };


 const catchInputs = (e) => {
    const { name, value } = e.target;
    setState({
      ...state, 
      [name]: value.toLowerCase(),
    });
  };


  const handleClickSave = () => {
    //Verificamos campos validos
    if (state.name.length < 4) {
      window.Swal.fire(
        "Verificación",
        "Debe de escribir el nombre de la categoria",
        "warning"
      );
      //this.nameInput.focus();
      return false;
    }

    const { category_id, name } = state;
    const data = { name, category_id: category_id};
    //const { _save } = this.props;
    
    //const options = { categoryid: "raiz" };

   /*  const text = id
        ? "¿Esta seguro de actualizar la categoria?"
        : "¿Esta seguro de crear una nueva categoria?",
      _close = () => {
        setState({
          ...state,
          name: "",
          category_id: 0,
          add: false,
        });
      };
 */

      hookCategory.saveCategory(data).then((data)=>{
        if(data){
          window.Swal.fire({
            title: "Categorias",
            text: 'Categoria guardada correctamente',
            icon: "success",
            showCancelButton: false,
            confirmButtonText:"OK",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              storeContext.set({
                ...storeContext,
                panel:"inbox",
              })
            }
          });
        }else{
          window.Swal.fire(
            "Categorias",
            "Error al guardar la categoria",
            "error"
          );
        }
      });

      


    //helper.handleSaveItem(id, data, options, _save, _close, text);
  };



  return (
    <div className="card card-primary card-outline">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th style={{ width: 48 }}></th>
            </tr>
          </thead>
          <tbody>
            {!load && category_raiz ? (
              <React.Fragment>
                {category_raiz.map((cat) => {                  
                  return (
                    <tr key={cat.id}>
                      <td className="text-capitalize">
                        <a
                          href={"#select!" + cat.id}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectCategory(cat);
                          }}
                          className={
                            cat.sons && cat.sons.length
                              ? "text-primary"
                              : "text-dark"
                          }
                        >
                          {cat.name}
                        </a>
                      </td>
                      <td className="btn-group">
                        <button
                          type="button"
                          className="btn btn-default"
                          disabled={true}
                          title="Proximamente"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          title="Eliminar"
                          className={
                            cat.hijos && cat.hijos.length
                              ? "btn btn-outline-secondary btn-sm"
                              : "btn btn-outline-danger btn-sm"
                          }
                          onClick={(e) => {
                            handleClickDelete(cat.id, cat.name);
                          }}
                          disabled={cat.hijos && cat.hijos.length}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {add && !load ? (
            <tfoot>
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    className="form-control text-uppercase"
                    autoComplete="off"
                    value={name}
                    onChange={catchInputs}
                    ref={(input) => {
                      //this.nameInput = input;
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={handleClickSave}
                    disabled={name.length < 3}
                    title="Guardar categoria"
                  >
                    <i className="fas fa-save"></i>
                  </button>
                </td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
      <div className="card-footer text-right">
        <button
          className={
            add
              ? "btn btn-secondary btn-sm text-bold"
              : "btn btn-primary btn-sm"
          }
          onClick={handleClickAdd}
          disabled={!category_id}
          title={add ? "Cancelar" : "Crear nueva categoria"}
        >
          {add ? (
            <>
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </>
          ) : (
            <>
              <i className="fas fa-plus mr-1"></i>
              Agregar
            </>
          )}
        </button>
      </div>
    </div>
  );
}

