import React, { useState, useEffect } from "react";
//Components
import Catalogo from "../components/Store/data/Category_list";
import useCategory from "../hooks/useCategory";

export default function CategoriesStoreComponent(){

  const hookCategory = useCategory();

  const [state, setState] = useState({
    category_id: 0,
    category_data: [],
  })

  const { category_id, category_data } = state;
  
  let category_view_sons = category_data, category_current = {};
  
  if (category_id) {
    const category_cache = category_data.filter(
      (cat) => cat.id === category_id
    );

    if (category_cache.length) {
      category_current = category_cache[0];
      if (category_current && category_current.sons) {
        category_view_sons = category_current.sons;
      }
    }
  }

  const handleLoadCategories = () => {
    hookCategory.getCategories({categoryid: "raiz"}).then((data)=>{
      if(data){
        setState({
          ...state,
          category_data: data.data,
        })
      }else{
        console.error("Error al obtener la lista de categorias");
      }
    })
  };

  const handleChangeState = (data) => {
    setState(data);
  };


  const handleClickParent = (e) => {
    if (e) e.preventDefault();

    hookCategory.getCategories({categoryid: "raiz"}).then((data)=>{
      if(data){
        setState({
          category_data: data.data,
          category_id: null,
        });
      }else{
        console.error("Error al obtener la lista de categorias");
      }
    })
  };

  useEffect(()=>{
    handleLoadCategories();
  },[]);


  return (
    <div className="row">
      <div className="col-8">
        <nav>
          <ol className="breadcrumb">
            { state.category_id ? (
              <>
                <li className="breadcrumb-item active" aria-current="page">
                  <a href="#link" onClick={handleClickParent}>
                    Raiz
                  </a>
                </li>
                {category_current.id ? (
                  <li className="breadcrumb-item active" aria-current="page">
                    {category_current.name}
                  </li>
                ) : null}
              </>
            ) : (
              <li className="breadcrumb-item active" aria-current="page">
                Seleccione una categoria para ver su contenido
              </li>
            )}
          </ol>
        </nav>
        <Catalogo
          category={category_id}
          categoryData={category_view_sons ?? []}
          categorySelect={handleChangeState}
        />
      </div>
    </div>
  );
}


