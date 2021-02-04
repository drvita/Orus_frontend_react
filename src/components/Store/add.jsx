import React, { Component } from "react";
import { Link } from "react-router-dom";
import StoreLote from "./add_lote";
import InputCategory from "./input_category";
import Suppliers from "./input_suppliers";
import Brands from "./input_brand";
import Codestring from "../Layouts/codeLentString";

export default class StoreAdd extends Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    this.state = {
      id: id ? id : 0,
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
      category_data: {},
      category_id1: 0,
      category_id2: 0,
      category_id3: 0,
      category_id4: 0,
      category_list1: [],
      category_list2: [],
      category_list3: [],
      category_list4: [],
      load: false,
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.category1 = React.createRef(); //Primera categoria
    this.category2 = React.createRef(); //Segunda categoria
    this.category3 = React.createRef(); //Tercera categoria
    this.category4 = React.createRef(); //Cuarta categoria
    this.supplierRef = React.createRef(); //Referencia de proveedor
    this.brandRef = React.createRef(); //Referencia de proveedor
    this.codeRef = React.createRef(); //Referencia del codigo
    this.nameRef = React.createRef(); //REferencia del nombre del producto
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    const { id } = this.state;
    this.getItem(id);
    this.getCategory();
  }
  componentDidUpdate(props, state) {
    const {
      category_list1,
      category_id,
      category_id1,
      category_id2,
      category_id3,
    } = this.state;

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

  render() {
    const {
      id,
      load,
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
      cant,
      price,
    } = this.state;
    let codeValue = code,
      nameValue = name;

    if (
      this.category1.current !== null &&
      parseInt(this.category1.current.value) === 2
    ) {
      if (name.length <= 3) {
        nameValue = this.handleCodeString(codeValue);
      }
    } else if (
      this.category1.current !== null &&
      parseInt(this.category1.current.value) === 1
    ) {
      if (code.length <= 3) {
        codeValue = this.handleCodeLent(grad);
      }
      if (name.length <= 3) {
        nameValue = this.handleNameLent(grad);
      }
    }

    return (
      <div className="row">
        <div className={id ? "col-5" : "col-6"}>
          <form
            className="card card-primary card-outline"
            onSubmit={this.handleSave}
          >
            <div className="card-header">
              <h3 className="card-title text-primary">
                <i className="fas fa-database mr-1"></i>
                {id ? "Editar producto" : "Registrar nuevo producto"}
              </h3>
            </div>
            <div className="card-body">
              {category_list1 && category_list1.length && !load ? (
                <React.Fragment>
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
                            this.setState({
                              category_id: data.id,
                              category_id1: data.id,
                              category_id2: 0,
                              category_list2: data.hijos,
                              category_id3: 0,
                              category_list3: [],
                              category_id4: 0,
                              category_list4: [],
                              supplier: 0,
                            });
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
                              this.setState({
                                category_id: data.id,
                                category_id2: data.id,
                                category_id3: 0,
                                category_list3: data.hijos,
                                category_id4: 0,
                                category_list4: [],
                              });
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
                              this.setState({
                                category_id: data.id,
                                category_id3: data.id,
                                category_id4: 0,
                                category_list4: data.hijos,
                              });
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
                      data={this.props.data}
                      supplier={supplier}
                      textSelect="Selecione el proveedor"
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
                      data={this.props.data}
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
                    <React.Fragment>
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
                                    ? "input-group-text bg-primary"
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
                              autoComplete="off"
                            />
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
                                <span
                                  className={
                                    grad
                                      ? "input-group-text bg-primary"
                                      : "input-group-text bg-warning"
                                  }
                                >
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
                              autoComplete="off"
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
                        <div className="col">
                          <small>
                            <label>Cantidad en existencia</label>
                          </small>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span
                                className={
                                  cant
                                    ? "input-group-text bg-primary"
                                    : "input-group-text"
                                }
                              >
                                <i className="fas fa-database"></i>
                              </span>
                            </div>
                            <input
                              type="number"
                              className="form-control text-right"
                              placeholder="Cantidades en existencia"
                              name="cant"
                              value={cant}
                              onChange={this.catchInputs}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <small>
                            <label>Precio</label>
                          </small>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span
                                className={
                                  price
                                    ? "input-group-text bg-primary"
                                    : "input-group-text bg-warning"
                                }
                              >
                                <i className="fas fa-money-bill"></i>
                              </span>
                            </div>
                            <input
                              type="number"
                              className="form-control text-right"
                              placeholder="Precio"
                              name="price"
                              value={price}
                              onChange={this.catchInputs}
                            />
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className="row">
                      <div className="col">
                        <h6 className="text-warning">
                          Seleccione primero una categoría.
                        </h6>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <div className="text-center">
                  <span className="text-primary">Cargando formulario</span>
                  <div
                    className="spinner-border text-primary ml-4"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer text-right">
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-group" role="group">
                    <Link
                      to="/almacen/registro"
                      className="btn btn-dark"
                      onClick={this.setNew}
                    >
                      <i className="fas fa-plus mr-1"></i>
                      Nuevo
                    </Link>
                    <Link
                      to="/almacen"
                      className="btn btn-dark"
                      onClick={(e) => {
                        this.changePage("/almacen");
                      }}
                    >
                      <i
                        className={id ? "fas fa-ban mr-1" : "fas fa-undo mr-1"}
                      ></i>
                      {id ? "Cerrar" : "Cancelar"}
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save mr-1"></i>
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {id ? (
          <div className="col">
            <StoreLote
              id={id}
              price={this.state.price}
              refresh={this.getItem}
            />
          </div>
        ) : null}
      </div>
    );
  }

  handleNameLent = (grad) => {
    let stringcode = "";
    stringcode +=
      this.category2.current !== null
        ? this.category2.current.options[
            this.category2.current.selectedIndex
          ].text.trim()
        : "";
    stringcode +=
      this.category3.current !== null
        ? " " +
          this.category3.current.options[
            this.category3.current.selectedIndex
          ].text.trim()
        : "";
    stringcode +=
      this.category4.current !== null
        ? " " +
          this.category4.current.options[
            this.category4.current.selectedIndex
          ].text.trim()
        : "";

    stringcode += " " + grad.toString();
    return stringcode.toLowerCase();
  };
  handleCodeLent = (grad) => {
    let stringcode =
      this.category2.current !== null
        ? Codestring(
            this.category2.current.options[this.category2.current.selectedIndex]
              .text
          )
        : "";
    stringcode +=
      this.category3.current !== null
        ? Codestring(
            this.category3.current.options[this.category3.current.selectedIndex]
              .text
          )
        : "";
    stringcode +=
      this.category4.current !== null
        ? Codestring(
            this.category4.current.options[this.category4.current.selectedIndex]
              .text
          )
        : "";
    return stringcode + grad.toString();
  };
  handleCodeString = (code) => {
    let stringcode = "armazon";
    stringcode +=
      this.category2.current !== null
        ? " " +
          this.category2.current.options[
            this.category2.current.selectedIndex
          ].text.trim()
        : "";
    stringcode +=
      this.brandRef.current !== null
        ? " " +
          this.brandRef.current.options[
            this.brandRef.current.selectedIndex
          ].text.trim()
        : "";
    stringcode +=
      this.supplierRef.current !== null
        ? " " +
          this.supplierRef.current.options[
            this.supplierRef.current.selectedIndex
          ].text
            .trim()
            .split(" ")[0]
        : "";

    stringcode += " " + code.toString();
    return stringcode.toLowerCase();
  };
  setNew = (e) => {
    this.setState({
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
      brand: 0,
      category_id: 0,
      category_id1: 0,
      category_id2: 0,
      category_id3: 0,
      category_id4: 0,
      category_list2: [],
      category_list3: [],
      category_list4: [],
      load: false,
    });
  };
  changePage = (e) => {
    this.props.page(e);
  };
  catchInputs = (e) => {
    const { name, type } = e.target;
    let { value } = e.target;

    if (type === "text") value = value.toLowerCase();
    if (type === "number") value = parseInt(value);

    this.setState({
      [name]: value,
    });
  };
  getCategory = () => {
    //Variables
    let { host, token } = this.state;

    console.log("solicitando categorias al API");
    fetch("http://" + host + "/api/categories?categoryid=raiz", {
      method: "GET",
      signal: this.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((cat) => {
        if (cat.data !== null) {
          console.log("Almacenando categorias");
          this.setState({
            category_list1: cat.data,
          });
        } else {
          console.error("Orus: ", cat.message);
          window.Swal.fire(
            "Error",
            "Error al descargar las categorias",
            "error"
          );
        }
      })
      .catch((error) => {
        console.log("Orus:", error);
        window.Swal.fire(
          "Fallo de conexion",
          "Verifique la conexion al servidor",
          "error"
        );
      });
  };
  handleSave = async (e) => {
    e.preventDefault();
    const {
      id,
      category_id,
      category_id1,
      category_id2,
      category_id4,
      supplier,
      brand_id,
      code,
    } = this.state;
    //Verificamos campos validos
    if (!category_id) {
      window.Swal.fire(
        "Verificación",
        "Selecione una categoria primero",
        "warning"
      );
      return false;
    } else {
      if (category_id1 === 1 && category_id4 !== category_id) {
        window.Swal.fire(
          "Verificación",
          "Selecione una categoria valida para lentes",
          "warning"
        );
        return false;
      } else if (category_id1 === 2 && category_id2 !== category_id) {
        window.Swal.fire(
          "Verificación",
          "Selecione una categoria valida para armazones",
          "warning"
        );
        return false;
      }
    }
    if (category_id1 === 2 && !supplier) {
      window.Swal.fire(
        "Verificación",
        "Selecione un PROVEEDOR valido primero",
        "warning"
      );
      return false;
    }
    if (category_id1 === 2 && !brand_id) {
      window.Swal.fire(
        "Verificación",
        "Selecione una MARCA valida primero",
        "warning"
      );
      return false;
    }
    if (!code && !this.codeRef.current.value) {
      window.Swal.fire(
        "Verificación",
        "Escriba una CODIGO para este producto",
        "warning"
      );
      return false;
    }

    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar el producto?"
        : "¿Esta seguro de crear un nuevo producto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          const {
              id,
              code,
              codebar,
              brand_id,
              name,
              unit,
              cant,
              price,
              category_id,
              token,
              host,
              supplier,
              grad,
            } = this.state,
            url = id
              ? "http://" + host + "/api/store/" + id
              : "http://" + host + "/api/store",
            method = id ? "PUT" : "POST";
          let body = {
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
          };

          //Actualiza el pedido o creamos un pedido nuevo según el ID
          console.log("Enviando datos del producto a API");
          return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }).then(async (response) => {
            let back = {};
            if (response.status !== 204) back = await response.json();
            if (!response.ok) {
              console.error("Orus res: ", back.message, back.errors);
              if (back.errors && back.errors.code) {
                window.Swal.fire(
                  "Validacion",
                  "El CODIGO ya esta registrado",
                  "warning"
                );
              } else if (back.errors && back.errors.name) {
                window.Swal.fire(
                  "Validacion",
                  "El nombre del PRODUCTO ya esta registrado",
                  "warning"
                );
              } else
                window.Swal.fire("Error", "al almacenar el producto", "error");
            }
            return back;
          });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;

        if (data.data) {
          console.log("Producto almacenado", data.data);
          window.Swal.fire({
            icon: "success",
            title: id
              ? "Producto actualizado con exito"
              : "Producto almacenado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            if (id) {
              this.props.history.push(`/almacen`);
            } else {
              this.setState({
                id: data.data.id,
              });
              this.props.history.push(`/almacen/registro/${data.data.id}`);
            }
          });
        }
      }
    });
  };
  getItem = (id) => {
    if (id > 0) {
      //Variables
      let { host, token } = this.state;
      //Realiza la peticion al API
      console.log("Solicitando datos de producto a la API");
      fetch("http://" + host + "/api/store/" + id, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(async (data) => {
          if (data.data) {
            let category_id1 = 0,
              category_list2 = [],
              category_list3 = [],
              category_list4 = [],
              category_id2 = 0,
              category_id3 = 0,
              category_id4 = 0;

            if (data.data.categoria && data.data.categoria.depende_de) {
              if (
                data.data.categoria.depende_de &&
                data.data.categoria.depende_de.depende_de
              ) {
                if (
                  data.data.categoria.depende_de.depende_de &&
                  data.data.categoria.depende_de.depende_de.depende_de
                ) {
                  category_id1 =
                    data.data.categoria.depende_de.depende_de.depende_de.id;
                  category_id2 = data.data.categoria.depende_de.depende_de.id;
                  category_id3 = data.data.categoria.depende_de.id;
                  category_id4 = data.data.categoria.id;
                  //Listas
                  category_list2 =
                    data.data.categoria.depende_de.depende_de.depende_de.hijos;
                  category_list3 =
                    data.data.categoria.depende_de.depende_de.hijos;
                  category_list4 = data.data.categoria.depende_de.hijos;
                } else {
                  category_id1 = data.data.categoria.depende_de.depende_de.id;
                  category_id2 = data.data.categoria.depende_de.id;
                  category_id3 = data.data.categoria.id;
                  //Lista
                  category_list2 =
                    data.data.categoria.depende_de.depende_de.hijos;
                  category_list3 = data.data.categoria.depende_de.hijos;
                }
              } else {
                category_id1 = data.data.categoria.depende_de.id;
                category_id2 = data.data.categoria.id;
                //Lista
                category_list2 = data.data.categoria.depende_de.hijos;
              }
            } else {
              category_id1 = data.data.categoria.id;
              //Lista
              category_list2 = data.data.categoria.hijos;
            }
            /*console.log(
              "CAT principal",
              "Nombre: " + data.data.categoria.categoria,
              "Hijos: " + data.data.categoria.hijos.length,
              "Padre: ",
              data.data.categoria.depende_de
            );*/

            this.setState({
              id: data.data.id,
              code: data.data.codigo,
              codebar: data.data.c_barra,
              brand_id: data.data.marca ? data.data.marca.id : 0,
              grad: data.data.graduacion ? data.data.graduacion : "",
              name: data.data.producto,
              unit: data.data.unidad,
              cant: data.data.cantidades,
              price: data.data.precio,
              category_id: data.data.categoria.id,
              category_id1,
              category_list2,
              category_list3,
              category_list4,
              category_id2,
              category_id3,
              category_id4,
              category_data: data.data.categoria,
              supplier: data.data.proveedor ? data.data.proveedor.id : 0,
              load: false,
            });
          } else {
            console.error("[Store] add - ", data.message);
            window.Swal.fire(
              "Error",
              "Error en el sistema, comuniquese con el administrador de sistema",
              "error"
            );
            this.setState({
              load: false,
            });
          }
        })
        .catch((error) => {
          console.log("Orus:", error);
          window.Swal.fire(
            "Fallo de conexion",
            "Verifique la conexion al servidor",
            "error"
          );
          this.setState({
            load: false,
          });
        });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}
