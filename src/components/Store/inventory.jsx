import React, { Component } from "react";
import InventoryTableView from "./views/Inventory_table";

import { getUrl, api } from "../../redux/sagas/api";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
  componentDidMount() {
    this.getCategories();
    console.log("Prueba-------------")
  }
  componentDidUpdate(props, state) {
    if (state.catid_3 !== this.state.catid_3) {
      this.getItems(this.state.catid_3);
    }
  }
  
  render() {
    const {
        catid_1,
        catData_1,
        catid_2,
        catData_2,
        catid_3,
        catData_3,
        load,
        items,
        meta,
      } = this.state,
      header = [],
      body = [];
    let i = 0;

    do {
      header.push(<th key={i}>{i.toFixed(2)}</th>);
      i = i - 0.25;
    } while (i > parseFloat(meta.cil) - 0.25);

    i = parseFloat(meta.rangoInf);
    do {
      if (i === 0)
        body.push(
          <td>
            <label>0.00</label>
          </td>
        );
      else body.push(<td>{i.toFixed(2)}</td>);
      i = i + 0.25;
    } while (i < parseFloat(meta.rangoSup) + 0.25);

    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row">
                {/* <div className="col">
                  <label>Seleccione la sucursal</label>
                </div> */}
                <div className="col">
                  <select
                    className="custom-select"
                    name="catid_1"
                    value={catid_1}
                    onChange={this.handleClickCat}
                  >
                    <option value="0">Seleccione un tipo</option>
                    {catData_1.map((cat) => {
                      return (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoria}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {catid_1 && catData_2.length ? (
                  <div className="col">
                    <select
                      className="custom-select"
                      name="catid_2"
                      value={catid_2}
                      onChange={this.handleClickCat}
                    >
                      <option value="0">Seleccione un material</option>
                      {catData_2.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.categoria}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}

                {catid_2 && catData_3.length ? (
                  <div className="col">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      {catData_3.map((cat) => {
                        return (
                          <button
                            key={cat.id}
                            className={
                              catid_3 === cat.id
                                ? "btn btn-primary"
                                : "btn btn-secondary"
                            }
                            onClick={(e) => {
                              this.setState({
                                catid_3: cat.id,
                                load: true,
                              });
                            }}
                          >
                            {cat.categoria}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="card-body">
              {catid_3 ? (
                <React.Fragment>
                  {load ? (
                    <div className="text-center">
                      <span className="text-primary">Cargando productos</span>
                      <div
                        className="spinner-border text-primary ml-4"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <React.Fragment>
                      <div className="row mb-2">
                        <div className="col">
                          Total de productos: <label>{items.length}</label>
                        </div>
                        <div className="col-6">
                          <div className="row">          
                          </div>
                        </div>
                      </div>

                      <InventoryTableView
                        header={header}
                        body={body}
                        items={items}
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
                    {!catid_1 ? (
                      <li>Selecciones primero el tipo de lente</li>
                    ) : null}
                    {!catid_2 ? <li>Despues el material</li> : null}
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

  handleToPrice = () => {
    const { price, catid_3: catid, load } = this.state;

    if (price && catid) {
      console.log("Send data to API", price, catid);

      const ls = JSON.parse(localStorage.getItem("OrusSystem")),
        url =
          "http://" +
          ls.host +
          "/api/store/prices?cat=" +
          catid +
          "&price=" +
          price;

      //Cargando
      if (!load) {
        this.setState({
          load: true,
        });
      }

      //Categories main
      // TODO:  FETCH CON BODY PENDIENTE(espera solución del error)
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + ls.token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("[Orus System] Item actualizados", result);
          this.setState({
            load: false,
          });
        });
    }
  };



  handelChangePrice = (e) => {
    const { value } = e.target;
    this.setState({
      price: parseInt(value),
    });
  };




  getItems = async (catid) => {
    const { load } = this.state;
    
    const getItemsParams = {
      cat:catid,
      itemsPage:500
    };
    const urlGetItems = getUrl("store", null, getItemsParams );

    //Cargando
    if (!load) {
      this.setState({
        load: true,
      });
    }

    //Categories main
    const {data, message} = await api(urlGetItems);

    if(data){
      console.log("[Orus System] Descarga de producto exitosa");
      this.setState({
        items: data && data.length ? data : [],
        load: false,
      });
    }else{
      console.error("[Orus system] Salida por error:", message);
      this.setState({
        load: false,
      });
    }
  };



  
  handleClickCat = (e) => {
    const { name, value } = e.target,
      { catData_1, catData_2 } = this.state;
    let sons = [],
      meta = {};

    if (name === "catid_1") {
      catData_1.map((cat) => {
        if (cat.id === parseInt(value)) {
          sons = cat.hijos;
          meta = cat.meta;
          return true;
        } else return false;
      });

      this.setState({
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
          sons = cat.hijos;
          return true;
        } else return false;
      });

      this.setState({
        catid_2: parseInt(value),
        catid_3: 0,
        catData_3: sons,
      });
    }
  };




  getCategories = async () => {
    //Variables en localStorage
    //url = "http://" + ls.host + "/api/categories/1";

    //Categories main


    const urlGetCategories = getUrl("categories", 1)

    const {data, message} = await api(urlGetCategories);

    if(data){
      if (data && data.hijos.length) {
        console.log("Descarga de categoria exitos");
        this.setState({
          catData_1: data.hijos,
        });
      }
    }else{
      console.log("Error al descargar categorías");
      console.error("[Orus system] Salida por error:", message);
      window.Swal.fire(
        "Fallo de conexion",
        "Verifique la conexion al servidor",
        "error"
      );
    }
  };
}
