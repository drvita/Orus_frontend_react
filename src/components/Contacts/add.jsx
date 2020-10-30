import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Mapa from "./mapa";
import ListExam from "../Exam/listsExams";
import Personal from "./add_personal";
import Domicilio from "./add_domicilio";
import Telefono from "./add_telefonos";

export default class ContactsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      validName: false,
      rfc: "",
      email: "",
      validEmail: false,
      type: 0,
      birthday: "",
      calle: "",
      colonia: "",
      municipio: "",
      estado: "",
      cp: "",
      t_casa: "",
      t_oficina: "",
      t_movil: "",
      business: false,
      load: false,
      host: props.data.host,
      token: props.data.token,
    };
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.timeSave = null;
  }
  componentWillUnmount() {
    this.controller.abort(); // Cancelando cualquier carga de fetch
  }
  componentDidMount() {
    let id = this.props.match.params.id,
      //Recogemos valores de registro inconcluso
      data = JSON.parse(localStorage.getItem("OrusContactNew"));

    if (id) {
      this.getUser(id);
    } else {
      //Si existe un usuario previo
      if (
        data &&
        data.name &&
        data.name.length > 4 &&
        window.confirm(
          "Existe un registro previo de " +
            data.name.toUpperCase() +
            ", \n ¿Desea Cargar los datos?"
        )
      ) {
        this.setState({
          name: data.name,
          validName: true,
          rfc: data.rfc,
          email: data.email,
          validEmail: true,
          type: data.type,
          birthday: data.birthday,
          calle: data.calle,
          colonia: data.colonia,
          municipio: data.municipio,
          estado: data.estado,
          cp: data.cp,
          t_casa: data.t_casa,
          t_oficina: data.t_oficina,
          t_movil: data.t_movil,
        });
      }
      localStorage.setItem("OrusContactNew", JSON.stringify({}));
    }
  }
  componentDidUpdate(props, state) {
    if (
      !this.state.id &&
      !this.state.load &&
      this.state.validName &&
      this.state.validEmail
    ) {
      if (this.timeSave) clearTimeout(this.timeSave);
      this.timeSave = setTimeout(() => {
        localStorage.setItem(
          "OrusContactNew",
          JSON.stringify({
            name: this.state.name,
            rfc: this.state.rfc,
            email: this.state.email,
            type: this.state.type,
            birthday: this.state.birthday,
            calle: this.state.calle,
            colonia: this.state.colonia,
            municipio: this.state.municipio,
            estado: this.state.estado,
            cp: this.state.cp,
            t_casa: this.state.t_casa,
            t_oficina: this.state.t_oficina,
            t_movil: this.state.t_movil,
          })
        );
      }, 1500);
    } else {
      localStorage.setItem("OrusContactNew", JSON.stringify({}));
    }
  }

  render() {
    let {
      id,
      name,
      rfc,
      email,
      type,
      birthday,
      calle,
      colonia,
      municipio,
      estado,
      cp,
      t_casa,
      t_oficina,
      t_movil,
      business,
      load,
      validName,
      validEmail,
    } = this.state;

    return (
      <form onSubmit={this.handleSave}>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-danger card-outline">
              <div className="card-header">
                <h3 className="card-title text-danger">
                  <i className="fas fa-address-book mr-2"></i>
                  {id ? "Editar contacto" : "Registrar nuevo contacto"}
                  {validName && validEmail ? (
                    <span className="ml-2 text-muted">
                      <small>(Almacenado automatico)</small>
                    </span>
                  ) : null}
                </h3>
              </div>
              <div className="card-body">
                {load ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="row was-validated">
                    <Personal
                      id={id}
                      name={name}
                      rfc={rfc}
                      email={email}
                      type={type}
                      birthday={birthday}
                      business={business}
                      validName={validName}
                      validEmail={validEmail}
                      onChange={this.catchInputs}
                    />

                    <Domicilio
                      calle={calle}
                      colonia={colonia}
                      municipio={municipio}
                      estado={estado}
                      cp={cp}
                      onChange={this.catchInputs}
                    />

                    <Telefono
                      t_casa={t_casa}
                      t_movil={t_movil}
                      t_oficina={t_oficina}
                      onChange={this.catchInputs}
                    />
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-md-12">
                    <div className="btn-group float-right" role="group">
                      <Link
                        to="/contactos"
                        className="btn btn-dark"
                        onClick={(e) => {
                          this.changePage("/contactos");
                        }}
                      >
                        <i className="fas fa-ban mr-1"></i>
                        Cancelar
                      </Link>
                      <button
                        type="submit"
                        className={
                          validName &&
                          validEmail &&
                          (t_casa || t_oficina || t_movil)
                            ? "btn btn-danger"
                            : "btn btn-danger disabled"
                        }
                        disabled={
                          validName &&
                          validEmail &&
                          (t_casa || t_oficina || t_movil)
                            ? ""
                            : "disabled"
                        }
                      >
                        <i className="fas fa-save mr-1"></i>
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.calle && !this.state.type ? (
            <div className="col">
              <Mapa
                calle={this.state.calle}
                colonia={this.state.colonia}
                municipio={this.state.municipio}
                estado={this.state.estado}
                cp={this.state.cp}
                changeAddress={this.changeAddress}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.id && !this.state.type ? (
            <div className="col">
              <ListExam
                paciente={this.state.id}
                exam={{}}
                page={this.changePage}
                edad={
                  moment(this.state.birthday)
                    .fromNow(true)
                    .replace(/[a-zA-ZñÑ]/gi, "") * 1
                }
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    );
  }

  changeAddress = (json) => {
    this.setState(json);
  };
  changePage = (e) => {
    this.props.page(e);
  };
  catchInputs = (e) => {
    const { name } = e.target,
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    //Confirmación de almacenamiento
    let conf = window.confirm("¿Esta seguro de almacenar a este contacto?");

    if (conf) {
      let {
          id,
          name,
          validName,
          rfc,
          email,
          validEmail,
          type,
          birthday,
          calle,
          colonia,
          municipio,
          estado,
          cp,
          t_casa,
          t_oficina,
          t_movil,
          business,
          load,
          host,
          token,
        } = this.state,
        //Creamos el body
        body = {
          name,
          rfc,
          email,
          type,
          birthday: business ? "" : birthday,
          business,
          domicilio:
            calle + "," + colonia + "," + municipio + "," + estado + "," + cp,
          telnumbers: t_casa + "," + t_oficina + "," + t_movil,
        },
        //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
        url = id
          ? "http://" + host + "/api/contacts/" + id
          : "http://" + host + "/api/contacts",
        //Actualiza el contacto o creamos el contacto
        method = id ? "PUT" : "POST";

      //Verificamos campos validos
      if (!validName) {
        window.alert("El contacto ya esta registrado");
        return false;
      }
      if (!validEmail) {
        window.alert("El email ya esta registrado");
        return false;
      }

      //Mandamos señal de procesamiento
      if (!load) {
        this.setState({
          load: true,
        });
      }
      //Enviamos datos al API
      console.log("Enviando datos a API para almacenar");
      fetch(url, {
        method: method,
        body: JSON.stringify(body),
        signal: this.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.data) {
            console.log("Contacto almacenado");
            localStorage.setItem("OrusContactNew", JSON.stringify({}));
            if (
              window.confirm(
                "Contacto almacenado con exito!.\n¿Desea cerrar este contacto?"
              )
            ) {
              this.props.history.goBack();
            } else {
              this.setState({
                load: false,
                id: data.data.id,
                validName: true,
                validEmail: true,
              });
            }
          } else {
            window.alert("Error al almacenar el contacto. Intentelo mas tarde");
            console.error(data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
          this.setState({
            load: false,
          });
        });
    }
  };
  getUser = (id) => {
    if (id > 0) {
      //Variables en localStorage
      let { load, host, token } = this.state;

      //Mandamos señal de carga si no lo he hecho
      if (!load) {
        this.setState({
          load: true,
        });
      }
      //Realiza la peticion al API
      console.log("Descargando datos del contacto");
      fetch("http://" + host + "/api/contacts/" + id, {
        method: "GET",
        signal: this.signal,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
            console.error(res);
          }
          return res.json();
        })
        .then((data) => {
          if (!data.message) {
            let { domicilio, telefonos } = data.data;
            console.log("Mostrando datos del contacto");
            this.setState({
              id: data.data.id,
              name: data.data.nombre,
              rfc: data.data.rfc,
              email: data.data.email,
              type: data.data.tipo,
              business: data.data.empresa,
              birthday: data.data.f_nacimiento,
              calle: domicilio[0] ? domicilio[0].replace(/undefined/g, "") : "",
              colonia: domicilio[1]
                ? domicilio[1].replace(/undefined/g, "")
                : "",
              municipio: domicilio[2]
                ? domicilio[2].replace(/undefined/g, "")
                : "",
              estado: domicilio[3]
                ? domicilio[3].replace(/undefined/g, "")
                : "",
              cp: domicilio[4] ? domicilio[4].replace(/undefined/g, "") : "",
              t_casa: telefonos[0]
                ? telefonos[0].replace(/undefined/g, "")
                : "",
              t_oficina: telefonos[1]
                ? telefonos[1].replace(/undefined/g, "")
                : "",
              t_movil: telefonos[2]
                ? telefonos[2].replace(/undefined/g, "")
                : "",
              validName: true,
              validEmail: true,
              load: false,
            });
          } else {
            console.error("Error al cargar el usuario", data.message);
            this.setState({
              load: false,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          this.setState({
            load: false,
          });
        });
    }
  };
}
