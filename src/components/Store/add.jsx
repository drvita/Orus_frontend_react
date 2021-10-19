import React, { Component, Fragment, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Components
import InputCategory from "./views/input_category";
import Suppliers from "./views/input_suppliers";
import Brands from "./views/input_brand";
import BranchesSelect from "./views/BranchesSelect";
import BranchesForm from "./views/BranchesForm";
//Actions
import { storeActions } from "../../redux/store/index";
import { categoryActions } from "../../redux/category/index";
import helper from "./helpers";

class StoreAddComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      category: "",
      created_at: null,
      created: {},
      updated_at: null,
      category_id: 0,
      category_data: {},
      category_id1: 0,
      category_id2: 0,
      category_id3: 0,
      category_id4: 0,
      category_list1: [],
      category_list2: [],
      category_list3: [],
      category_list4: [],
      branch_default: 0,
      inBranches: [],
    };
    this.category1 = createRef(); //Primera categoria
    this.category2 = createRef(); //Segunda categoria
    this.category3 = createRef(); //Tercera categoria
    this.category4 = createRef(); //Cuarta categoria
    this.supplierRef = createRef(); //Referencia de proveedor
    this.brandRef = createRef(); //Referencia de proveedor
    this.codeRef = createRef(); //Referencia del codigo
    this.nameRef = createRef(); //REferencia del nombre del producto
  }
  componentDidMount() {
    const { _getListCategories, _setListStore } = this.props;

    _getListCategories({
      categoryid: "raiz",
    });

    _setListStore({
      result: {
        list: [],
        metaList: {},
      },
    });
  }
  componentDidUpdate(props, state) {
    const {
      category_list1,
      category_id,
      category_id1,
      category_id2,
      category_id3,
    } = this.state;
    const { listCategories, item } = this.props;

    if (props.listCategories !== listCategories && listCategories.length) {
      this.setState({
        category_list1: listCategories,
      });
      if (item.id) {
        this.getItem();
      }
    }
    if (item && props.item && item.id && props.item.id !== item.id) {
      this.setState({
        id: item.id,
      });
    }

    if (state.category_id !== category_id) {
      if (state.category_id1 !== category_id1 && category_id1 !== 0) {
        const next = category_list1.find((e) => e.id === category_id1);
        if (next) {
          this.setState({
            category_list2: next.hijos,
          });
        }
      }
      if (state.category_id2 !== category_id2 && category_id2 !== 0) {
        const next = category_list1.find((e) => e.id === category_id2);
        if (next) {
          this.setState({
            category_list3: next.hijos,
          });
        }
      }
      if (state.category_id3 !== category_id3 && category_id3 !== 0) {
        const next = category_list1.find((e) => e.id === category_id3);
        if (next) {
          this.setState({
            category_list4: next.hijos,
          });
        }
      }
    }
  }
  componentWillUnmount() {
    const { _setListStore } = this.props;

    _setListStore({
      result: {
        list: [],
        metaList: {},
        item: {},
      },
    });
  }

  render() {
    const {
        id,
        supplier,
        category_id,
        category_id1,
        category_id2,
        category_id3,
        category_id4,
        category_list1,
        category_list2,
        category_list3,
        category_list4,
        brand_id,
        code,
        name,
        grad,
        unit,
        branch_default,
        inBranches,
      } = this.state,
      { list, loadStore, loadCategory, loadContact } = this.props,
      LOADING = loadStore || loadCategory || loadContact;
    let codeValue = code,
      nameValue = name;

    //Make a code and name if no exist
    if (
      this.category1.current !== null &&
      parseInt(this.category1.current.value) !== 1
    ) {
      //Make name of other categories
      if (name.length <= 3) {
        const type =
          this.category1.current !== null &&
          this.category1.current.selectedIndex
            ? this.category1.current.options[
                this.category1.current.selectedIndex
              ].text
                .trim()
                .replace(/\s/gim, "")
                .slice(0, 7)
            : "";

        nameValue = helper.handleCodeString(
          codeValue,
          type === "varios" ? "" : type,
          this.category2,
          this.brandRef
        );
      }
    } else {
      //Make code and name of glass
      if (code.length <= 3) {
        codeValue = helper.handleCodeLent(
          grad,
          this.category2,
          this.category3,
          this.category4
        );
      }
      if (name.length <= 3) {
        nameValue = helper.handleNameLent(
          grad,
          this.category2,
          this.category3,
          this.category4
        );
      }
    }

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
              {category_list1 && category_list1.length ? (
                <Fragment>
                  <div className="row">
                    <div className="col">
                      <fieldset>
                        <small className="mr-2">
                          <label>Categoria</label>
                        </small>

                        <InputCategory
                          data={this.props.data}
                          category={category_id1}
                          categoryName="category_id1"
                          categoryData={category_list1}
                          textSelect="Seleciona la categoria"
                          categoryRef={this.category1}
                          handleChangeCategory={(data) => {
                            this.setState(helper.handleCatOne(data));
                          }}
                        />

                        {category_id1 &&
                        category_list2 &&
                        category_list2.length ? (
                          <InputCategory
                            data={this.props.data}
                            category={category_id2}
                            categoryName="category_id2"
                            categoryData={category_list2}
                            textSelect="Seleciona el tipo"
                            categoryRef={this.category2}
                            handleChangeCategory={(data) => {
                              this.setState(helper.handleCatTwo(data));
                            }}
                          />
                        ) : null}

                        {category_id2 &&
                        category_list3 &&
                        category_list3.length ? (
                          <InputCategory
                            data={this.props.data}
                            category={category_id3}
                            categoryName="category_id3"
                            categoryData={category_list3}
                            textSelect="Seleciona el material"
                            categoryRef={this.category3}
                            handleChangeCategory={(data) => {
                              this.setState(helper.handleCatTree(data));
                            }}
                          />
                        ) : null}

                        {category_id3 &&
                        category_list4 &&
                        category_list4.length ? (
                          <InputCategory
                            data={this.props.data}
                            category={category_id4}
                            categoryName="category_id4"
                            categoryData={category_list4}
                            textSelect="Seleciona el tratamiento"
                            categoryRef={this.category4}
                            handleChangeCategory={(data) => {
                              this.setState({
                                category_id: data.id,
                                category_id4: data.id,
                              });
                            }}
                          />
                        ) : null}
                      </fieldset>
                    </div>
                  </div>

                  {category_id1 && category_id1 !== 1 ? (
                    <Suppliers
                      supplier={supplier}
                      supplierRef={this.supplierRef}
                      handleChangeSupplier={(e) => {
                        this.setState({
                          supplier: e,
                        });
                      }}
                    />
                  ) : null}

                  {category_id1 && category_id1 !== 1 && supplier ? (
                    <Brands
                      brand={brand_id}
                      supplier={supplier}
                      textSelect="Selecione la marca"
                      brandRef={this.brandRef}
                      handleChangeBrand={(e) => {
                        this.setState({
                          brand_id: e,
                        });
                      }}
                    />
                  ) : null}

                  {category_id ? (
                    <Fragment>
                      <div className="row">
                        <div className="col-5">
                          {codeValue ? (
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
                                  codeValue
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
                              ref={this.codeRef}
                              value={codeValue}
                              onChange={this.catchInputs}
                              onBlur={this.handleSearchCode}
                              autoComplete="off"
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
                              value={this.state.codebar}
                              onChange={this.catchInputs}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {category_id1 === 1 ? (
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
                                onChange={this.catchInputs}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                        ) : null}
                        <div className="col">
                          {nameValue ? (
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
                                  nameValue
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
                              ref={this.nameRef}
                              value={nameValue}
                              onChange={this.catchInputs}
                              maxLength="149"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {this.state.unit ? (
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
                              onChange={this.catchInputs}
                            />
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <div className="row">
                      <div className="col">
                        <h6 className="text-warning">
                          Seleccione primero una categoría.
                        </h6>
                      </div>
                    </div>
                  )}
                </Fragment>
              ) : (
                <div className="text-center">
                  <h2 className="text-primary">
                    <i className="fas fa-info-circle mr-2"></i>
                    Cargando formulario
                  </h2>
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
                      onClick={this.handleClose}
                    >
                      <i className="fas fa-ban mr-1"></i>
                      {id ? "Cerrar" : "Cancelar"}
                    </Link>
                    <button
                      type="button"
                      onClick={this.handleSave}
                      className="btn btn-primary"
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
                      branch_default={branch_default}
                      showIcon={false}
                      setBranchId={(id) =>
                        this.setState({ branch_default: id })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <BranchesForm
                  inBranches={inBranches}
                  store_item_id={id}
                  branch_default={branch_default}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  handleSearchCode = (event) => {
    const { _getListStore, _setListStore } = this.props,
      { code } = this.state;

    console.log("[DEBUG] Start search code...");
    if (code.length < 3) {
      _setListStore({
        result: {
          list: [],
          metaList: {},
          item: {},
        },
      });
    } else {
      _getListStore({
        code,
      });
    }
  };
  handleClose = () => {
    const { handleClose: _handleClose } = this.props;
    _handleClose("inbox");
  };
  catchInputs = ({ target }) => {
    const { name, type } = target;
    let { value } = target;

    if (type === "text") value = value.toLowerCase();
    if (type === "number") value = parseInt(value);

    this.setState({
      [name]: value,
    });
  };
  handleSave = async () => {
    const {
        category_id,
        supplier,
        brand_id,
        code,
        id,
        codebar,
        name,
        unit,
        cant,
        price,
        grad,
        branch_default,
      } = this.state,
      { list, _saveItem } = this.props;
    //Verificamos campos validos
    if (!helper.handleVerifyData(this.state, this.codeRef)) {
      return false;
    }
    if (!id && list.length) {
      window.Swal.fire("Verificación", "El codigo ya esta en uso", "warning");

      return false;
    }
    //Make a body data
    const body = {
      code: code ? code : this.codeRef.current.value,
      codebar,
      name: name ? name : this.nameRef.current.value,
      unit,
      cant,
      price,
      category_id,
      grad: grad ? grad : "+000000",
      brand_id: brand_id ? brand_id : "",
      contact_id: supplier ? supplier : "",
      branch_default: branch_default ? branch_default : null,
    };
    //Save
    helper.handleSaveItem(id, body, null, _saveItem);
  };
  getItem = () => {
    let category_id1 = 0,
      category_list2 = [],
      category_list3 = [],
      category_list4 = [],
      category_id2 = 0,
      category_id3 = 0,
      category_id4 = 0;
    const { item: data } = this.props;

    if (data.categoria && data.categoria.depende_de) {
      if (data.categoria.depende_de && data.categoria.depende_de.depende_de) {
        if (
          data.categoria.depende_de.depende_de &&
          data.categoria.depende_de.depende_de.depende_de
        ) {
          category_id1 = data.categoria.depende_de.depende_de.depende_de.id;
          category_id2 = data.categoria.depende_de.depende_de.id;
          category_id3 = data.categoria.depende_de.id;
          category_id4 = data.categoria.id;
          //Listas
          category_list2 =
            data.categoria.depende_de.depende_de.depende_de.hijos;
          category_list3 = data.categoria.depende_de.depende_de.hijos;
          category_list4 = data.categoria.depende_de.hijos;
        } else {
          category_id1 = data.categoria.depende_de.depende_de.id;
          category_id2 = data.categoria.depende_de.id;
          category_id3 = data.categoria.id;
          //Lista
          category_list2 = data.categoria.depende_de.depende_de.hijos;
          category_list3 = data.categoria.depende_de.hijos;
        }
      } else {
        category_id1 = data.categoria.depende_de.id;
        category_id2 = data.categoria.id;
        //Lista
        category_list2 = data.categoria.depende_de.hijos;
      }
    } else {
      category_id1 = data.categoria.id;
      //Lista
      category_list2 = data.categoria.hijos;
    }

    this.setState({
      id: data.id,
      code: data.codigo,
      codebar: data.c_barra,
      grad: data.graduacion,
      brand_id: data.marca ? data.marca.id : 0,
      name: data.producto,
      unit: data.unidad,
      cant: data.cantidades,
      price: data.precio,
      supplier: data.proveedor ? data.proveedor.id : 0,
      category: data.categoria,
      branch_default: data.branch_default ?? 0,
      created_at: data.created_at,
      created: data.created,
      updated_at: data.updated_at,
      inBranches: data.inBranches,
      //Data need
      category_id: data.categoria.id,
      category_id1,
      category_list2,
      category_list3,
      category_list4,
      category_id2,
      category_id3,
      category_id4,
      category_data: data.categoria,
      load: false,
    });
  };
}

const mapStateToProps = ({ storeItem, category, contact }) => {
    return {
      list: storeItem.list,
      item: storeItem.item,
      messages: storeItem.messages,
      options: storeItem.options,
      listCategories: category.list,
      loadStore: storeItem.loading,
      loadCategory: category.loading,
      loadContact: category.loading,
    };
  },
  mapActionsToProps = {
    _deleteItem: storeActions.deleteItem,
    _getItem: storeActions.getItem,
    _saveItem: storeActions.saveItem,
    _getListStore: storeActions.getListStore,
    _setListStore: storeActions.setListStore,
    _getListCategories: categoryActions.getListCategories,
  };

export default connect(mapStateToProps, mapActionsToProps)(StoreAddComponent);
