/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useCategory from "../../../hooks/useCategory";
import helper from "../helpers";

export default function RecomendationGlass(props) {
  const [state, setState] = useState({
    category_list: [],
    category_list_2: [],
    category_list_3: [],
    category_id_1: 0,
    category_id_2: 0,
    category_id_3: 0,
    category: {},
    codesItems: {},
  });
  const _category = useCategory();
  const {
      category_id,
      title,
      esferaod,
      esferaoi,
      cilindrod,
      cilindroi,
      handleCodesItems,
    } = props,
    {
      codesItems,
      category_id_1,
      category_id_2,
      category_id_3,
      category_list_2,
      category_list_3,
      category_list,
    } = state;
  // Functions
  const handleCategoryChange = (e) => {
    const { name, value } = e.target,
      { onChangeInput: _onChangeInput } = props;

    switch (name) {
      case "category_id_1":
        for (const key in category_list) {
          if (category_list[key].id === parseInt(value)) {
            setState({
              ...state,
              category_id_1: parseInt(value),
              category_id_3: 0,
              category_list_2: category_list[key].sons,
              category_list_3: [],
            });
            break;
          }
        }
        break;
      case "category_id_2":
        if (value) {
          state.category_list_2.map((cat) => {
            if (cat.id === parseInt(value)) {
              setState({
                ...state,
                category_id_2: parseInt(value),
                category_list_3: cat.sons,
              });
            }
            return null;
          });
        }
        break;
      case "category_id_3":
        _onChangeInput(parseInt(value));
        break;

      default:
        setState({
          ...state,
          [name]: parseInt(value),
        });
        break;
    }
  };
  const handleClickCategory = (e) => {
    e.preventDefault();
    const { onChangeInput } = props;
    setState({
      ...state,
      category_list_2: [],
      category_list_3: [],
      category_id_1: 0,
      category_id_2: 0,
      category_id_3: 0,
      category: {},
      codesItems: {},
    });
    onChangeInput(0);
  };
  const getCategory = async (id) => {
    if (id) {
      _category.getCategory(id).then((cat) => {
        if (cat.id) {
          setState({
            ...state,
            category: cat,
          });
        } else {
          console.error("[DEBUG] NEW ERROR", cat);
        }
      });
    }

    return {};
  };
  const getCategories = async () => {
    _category
      .getCategories({
        categoryid: "raiz",
        search: "lentes",
        order: "id",
      })
      .then(({ data: cat }) => {
        setState({
          ...state,
          category_list: cat[0].sons,
        });
      });
  };

  useEffect(() => {
    if (category_id) {
      getCategory(category_id);
    } else {
      getCategories();
    }
  }, [category_id]);

  useEffect(() => {
    if (state.category.id) {
      const data = helper.getCodeGrad(
        state.category,
        esferaod,
        esferaoi,
        cilindrod,
        cilindroi
      );

      setState({
        ...state,
        codesItems: data,
      });
    }
  }, [state.category]);

  return (
    <div className="card border border-info rounded d-print-none">
      <div className="card-body">
        <h3 className="card-title text-success m-2">{title}</h3>
        {!category_id && (
          <>
            {category_list.length ? (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Tipo</span>
                </div>
                <select
                  name="category_id_1"
                  className="custom-select"
                  defaultValue={category_id_1 ?? ""}
                  onChange={handleCategoryChange}
                >
                  <option value="0">-- Seleccione el tipo --</option>
                  {category_list.map((cat) => {
                    if (
                      cat.meta &&
                      cat.meta.rangoInf <= esferaod &&
                      esferaod <= cat.meta.rangoSup &&
                      cat.meta.rangoInf <= esferaoi &&
                      esferaoi <= cat.meta.rangoSup &&
                      cat.meta.cil <= cilindrod &&
                      cat.meta.cil <= cilindroi
                    ) {
                      return (
                        <option value={cat.id} key={cat.id}>
                          {cat.name}
                        </option>
                      );
                    } else return null;
                  })}
                </select>
              </div>
            ) : null}

            {category_id_1 && category_list_2.length ? (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Material</span>
                </div>
                <select
                  name="category_id_2"
                  className="custom-select"
                  defaultValue={category_id_2 ?? ""}
                  onChange={handleCategoryChange}
                >
                  <option value="0">-- Seleccione el material --</option>
                  {category_list_2.map((cat) => {
                    if (
                      cat.meta &&
                      cat.meta.rangoInf <= esferaod &&
                      esferaod <= cat.meta.rangoSup &&
                      cat.meta.rangoInf <= esferaoi &&
                      esferaoi <= cat.meta.rangoSup
                    ) {
                      return (
                        <option value={cat.id ?? ""} key={cat.id}>
                          {cat.name}
                        </option>
                      );
                    } else return false;
                  })}
                </select>
              </div>
            ) : null}

            {category_id_1 && category_id_2 && category_list_3.length ? (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Tratamiento</span>
                </div>
                <select
                  name="category_id_3"
                  className="custom-select"
                  defaultValue={category_id_3 ?? ""}
                  onChange={handleCategoryChange}
                >
                  <option value="0">-- Seleccione el tratamiento --</option>
                  {category_list_3.map((cat) => {
                    return (
                      <option value={cat.id ?? ""} key={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
          </>
        )}

        {Object.values(codesItems).length ? (
          <>
            {codesItems.code + codesItems.od ===
            codesItems.code + codesItems.oi ? (
              <p className="card-text">
                <label>Lente</label>: {codesItems.code + codesItems.od}
              </p>
            ) : (
              <div className="row card-text">
                <div className="col">
                  <label>Lente Derecho</label>
                  <br /> {codesItems.code + codesItems.od}
                </div>
                <div className="col">
                  <label>Lente Izquierdo</label>
                  <br /> {codesItems.code + codesItems.oi}
                </div>
              </div>
            )}

            {handleCodesItems && (
              <p className="card-text text-right">
                <button
                  className="btn btn-info"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCodesItems({
                      code: codesItems.code,
                      od: codesItems.od,
                      oi: codesItems.oi,
                    });
                  }}
                >
                  <i className="fas fa-check mr-2"></i>Siguiente
                </button>
              </p>
            )}

            {props.update ? (
              <p className="card-text text-right">
                <button
                  className="btn btn-outline-info btn-sm card-link mt-2"
                  onClick={handleClickCategory}
                >
                  Cambiar
                </button>
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
