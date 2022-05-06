/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Components
import Suppliers from "./views/input_suppliers";
import Brands from "./views/input_brand";
import BranchesSelect from "./views/BranchesSelect";
import BranchesForm from "./views/BranchesForm";
//Actions
// import helper from "./helpers";
import CategoriesProcess from "./data/CategoriesProcess";
import useStore from "../../hooks/useStore";

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
  supplier: 0,
  category_id: 0,
  branch_default: 12,
  data: {
    category: { code: "|||" },
    categories: [],
    inBranches: "",
    codes: [],
  },
  loading: false,
};

export default function Add(props) {
  const { id } = props.match.params;
  const [state, setState] = useState(initialState);
  const _store = useStore();
  const {
    supplier,
    category_id,
    brand_id,
    code,
    name,
    grad,
    unit,
    branch_default,
    data: { category, categories, inBranches, codes: list },
    loading: LOADING,
  } = state;

  const idsCategory = category.code
    ? category.code.split("|").filter((i) => i !== "")
    : [];
  let readyToSave = false;

  if (idsCategory.includes("1")) {
    readyToSave = category_id && code && name;
  } else {
    readyToSave = category_id && code && name && supplier && brand_id;
  }

  // Functions

  const getItem = () => {
    _store.getItem(id).then((res) => {
      console.log("[DEBUG] Responses:", res);
      // setState({
      //   ...state,
      //   data: {
      //     ...state.data,
      //     category: res.categoria,
      //   },
      //   loading: false,
      // });
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

                  <CategoriesProcess
                    categories={categories}
                    category={category}
                    setCategoryId={() => {}}
                    references={[]}
                  />
                </fieldset>
              </div>
            </div>

            {idsCategory.length && !idsCategory.includes("1")
              ? {
                  /* <Suppliers
                    supplier={supplier}
                    supplierRef={{}}
                    handleChangeSupplier={(e) => {
                      setState({
                        supplier: e,
                      });
                    }}
                  /> */
                }
              : null}

            {supplier
              ? {
                  /* <Brands
                    brand={brand_id}
                    supplier={supplier}
                    textSelect="Selecione la marca"
                    brandRef={{}}
                    handleChangeBrand={(e) => {
                      setState({
                        brand_id: e,
                      });
                    }}
                  /> */
                }
              : null}

            {category_id ? (
              <>
                <div className="row">
                  {idsCategory.includes("1") ? (
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
                          name="grad"
                          value={grad}
                          onChange={() => {}}
                          onBlur={() => {}}
                          maxLength="7"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  ) : null}
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
                            unit
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
                        name="unit"
                        value={unit}
                        onChange={() => {}}
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    {code ? (
                      <small>
                        <label>Codigo</label>
                      </small>
                    ) : (
                      <br />
                    )}

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span
                          className={
                            code
                              ? !id && list.length
                                ? "input-group-text bg-warning"
                                : "input-group-text bg-primary"
                              : "input-group-text bg-warning"
                          }
                        >
                          <i className="fas fa-code"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control text-uppercase"
                        placeholder="Codigo"
                        name="code"
                        ref={{}}
                        defaultValue={code}
                        onChange={() => {}}
                        onBlur={() => {}}
                        autoComplete="off"
                        maxLength="18"
                      />
                      {!id && list.length ? (
                        <span className="text-muted text-xs d-block w-100">
                          El codigo ya esta en uso
                        </span>
                      ) : null}
                    </div>
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
                        onChange={() => {}}
                        autoComplete="off"
                        maxLength="100"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {name ? (
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
                            name
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
                        placeholder="Nombre del producto"
                        name="name"
                        ref={{}}
                        defaultValue={name}
                        onChange={() => {}}
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
                    onClick={() => {}}
                  >
                    <i className="fas fa-ban mr-1"></i>
                    {id ? "Cerrar" : "Cancelar"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {}}
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
                  {/* <BranchesSelect
                    branch_default={branch_default}
                    showIcon={false}
                    setBranchId={(id) => setState({ branch_default: id })}
                  /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* <BranchesForm
                inBranches={inBranches}
                store_item_id={id}
                branch_default={branch_default}
              /> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// class StoreAddComponent extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       id: 0,
//       code: "",
//       codebar: "",
//       grad: "",
//       brand_id: 0,
//       name: "",
//       unit: "PZ",
//       cant: 1,
//       price: 1,
//       supplier: 0,
//       category: { code: "|||" },
//       categories: [],
//       created_at: null,
//       created: {},
//       updated_at: null,
//       category_id: 0,
//       branch_default: 0,
//       inBranches: [],
//     };

//     this.category0 = createRef(); //Primera categoria
//     this.category1 = createRef(); //Segunda categoria
//     this.category2 = createRef(); //Tercera categoria
//     this.category3 = createRef(); //Cuarta categoria
//     this.supplierRef = createRef(); //Referencia de proveedor
//     this.brandRef = createRef(); //Referencia de proveedor
//     this.codeRef = createRef(); //Referencia del codigo
//     this.nameRef = createRef(); //REferencia del nombre del producto
//   }

//   componentDidMount() {
//     const { _getListCategories, _setListStore } = this.props;

//     _getListCategories({
//       categoryid: "raiz",
//     });

//     _setListStore({
//       result: {
//         list: [],
//         metaList: {},
//       },
//     });
//   }

//   componentDidUpdate(props, state) {
//     const {
//       category_list1,
//       category_id,
//       category_id1,
//       category_id2,
//       category_id3,
//     } = this.state;
//     const { listCategories, item } = this.props;

//     if (props.listCategories !== listCategories && listCategories.length) {
//       if (item.id) {
//         this.getItem();
//       } else {
//         this.setState({
//           categories: listCategories,
//         });
//       }
//     }
//     if (item && props.item && item.id && props.item.id !== item.id) {
//       this.setState({
//         id: item.id,
//       });
//     }

//     if (state.category_id !== category_id) {
//       if (state.category_id1 !== category_id1 && category_id1 !== 0) {
//         const next = category_list1.find((e) => e.id === category_id1);
//         if (next) {
//           this.setState({
//             category_list2: next.hijos,
//           });
//         }
//       }
//       if (state.category_id2 !== category_id2 && category_id2 !== 0) {
//         const next = category_list1.find((e) => e.id === category_id2);
//         if (next) {
//           this.setState({
//             category_list3: next.hijos,
//           });
//         }
//       }
//       if (state.category_id3 !== category_id3 && category_id3 !== 0) {
//         const next = category_list1.find((e) => e.id === category_id3);
//         if (next) {
//           this.setState({
//             category_list4: next.hijos,
//           });
//         }
//       }
//     }
//   }

//   componentWillUnmount() {
//     const { _setListStore } = this.props;

//     _setListStore({
//       result: {
//         list: [],
//         metaList: {},
//         item: {},
//       },
//     });
//   }

//   render() {

//   }

//   getNameCodeDefault = (grad = "") => {
//     const { code: currentCode } = this.state;
//     // Make name
//     if (parseInt(this.category0.current.value) !== 1) {
//       // To other categories
//       const type =
//           this.category0.current !== null &&
//           this.category0.current.selectedIndex
//             ? this.category0.current.options[
//                 this.category0.current.selectedIndex
//               ].text
//                 .trim()
//                 .replace(/\s/gim, "")
//                 .slice(0, 7)
//             : "",
//         name = helper.handleCodeString(
//           type === "varios" ? "" : type,
//           this.category1,
//           this.brandRef,
//           currentCode
//         ),
//         code = "";

//       return {
//         name,
//         code,
//       };
//     } else {
//       // To lent categories
//       const name = helper.handleNameLent(
//           grad,
//           this.category1,
//           this.category2,
//           this.category3
//         ),
//         code = helper.handleCodeLent(
//           grad,
//           this.category1,
//           this.category2,
//           this.category3
//         );

//       return {
//         name,
//         code,
//       };
//     }
//   };

//   handleCategoriesChange = (select) => {
//     const countCategories = select.parents.split("|").filter((i) => i !== "");
//     let { id, code, name } = this.state;

//     if (!id) {
//       name = "";
//       code = "";
//       if (countCategories.includes("1")) {
//         if (countCategories.length === 4) {
//           // Get names default if no define
//           const data = this.getNameCodeDefault();
//           code = data.code;
//           name = data.name;
//         }
//       }
//     }

//     this.setState({
//       category_id: select.id,
//       supplier: 0,
//       brand_id: 0,
//       category: {
//         ...this.state.category,
//         code: select.parents,
//       },
//       code,
//       name,
//     });
//   };
//   handleSetNameNCode = () => {
//     let { id, code, name, grad } = this.state;

//     if (!id) {
//       // Get names default if no define
//       const data = this.getNameCodeDefault(grad);
//       code = data.code ? data.code : code;
//       name = data.name;
//     }

//     this.setState({
//       code,
//       name,
//     });
//   };
//   handleSearchCode = () => {
//     const { _getListStore, _setListStore } = this.props,
//       { code } = this.state;

//     if (code.length < 3) {
//       _setListStore({
//         result: {
//           list: [],
//           metaList: {},
//         },
//       });
//     } else {
//       _getListStore({
//         code,
//       });
//       this.handleSetNameNCode();
//     }
//   };
//   handleClose = () => {
//     const { handleClose: _handleClose } = this.props;
//     _handleClose("inbox");
//   };
//   catchInputs = ({ target }) => {
//     const { name, type } = target;
//     let { value } = target;

//     if (type === "text") value = value.toLowerCase();
//     if (type === "number") value = parseInt(value);

//     this.setState({
//       [name]: value,
//     });
//   };
//   handleSave = async () => {
//     const {
//         category_id,
//         supplier,
//         brand_id,
//         code,
//         id,
//         codebar,
//         name,
//         unit,
//         cant,
//         price,
//         grad,
//         branch_default,
//       } = this.state,
//       { list, _saveItem } = this.props;
//     //Verificamos campos validos
//     if (!helper.handleVerifyData(this.state, this.codeRef)) {
//       return false;
//     }
//     if (!id && list.length) {
//       window.Swal.fire("Verificación", "El codigo ya esta en uso", "warning");

//       return false;
//     }
//     //Make a body data
//     const body = {
//       code: code ? code : this.codeRef.current.value,
//       codebar: codebar ? codebar : null,
//       name: name ? name : this.nameRef.current.value,
//       unit,
//       cant,
//       price,
//       category_id,
//       grad: grad ? grad : "+000000",
//       brand_id: brand_id ? brand_id : "",
//       contact_id: supplier ? supplier : "",
//       branch_default: branch_default ? branch_default : null,
//     };
//     //Save
//     helper.handleSaveItem(id, body, null, _saveItem);
//   };
//   getItem = () => {
//     const { item: data, listCategories: categories } = this.props;

//     this.setState({
//       id: data.id,
//       code: data.codigo,
//       codebar: data.c_barra,
//       grad: data.graduacion,
//       brand_id: data.marca ? data.marca.id : 0,
//       name: data.producto,
//       unit: data.unidad,
//       cant: data.cantidades,
//       price: data.precio,
//       supplier: data.proveedor ? data.proveedor.id : 0,
//       category: data.categoria,
//       branch_default: data.branch_default ?? 0,
//       created_at: data.created_at,
//       created: data.created,
//       updated_at: data.updated_at,
//       inBranches: data.inBranches,
//       //Data need
//       category_id: data.categoria.id,
//       categories,
//       load: false,
//     });
//   };
// }
