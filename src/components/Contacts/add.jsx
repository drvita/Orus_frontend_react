import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

//import Mapa from "./mapa";
//import ListExam from "../Exam/views/listExamsCustomer";
import Personal from "./views/add_personal";
import Domicilio from "./views/add_domicilio";
import Telefono from "./views/add_telefonos";
import ListSales from "../Sales/views/listOfSales";
import Dashboard from "./views/dashboard_customer";
import ListBrands from "../Store/views/listOfBrands";
import ListOrders from "../Order/views/listOfOrders";
import CardExams from "../Exam/views/card_list_add";
//Actions
import { contactActions } from "../../redux/contact/.";
import { examActions } from "../../redux/exam/.";

class AddContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      rfc: "",
      email: "",
      type: 0,
      birthday: "",
      domicilios: {
        calle: "",
        colonia: "",
        municipio: "",
        estado: "",
        cp: "",
      },
      telefonos: { t_casa: "", t_oficina: "", t_movil: "" },
      business: false,
      verification: {
        name: true,
        email: true,
        birthday: true,
        telefonos: true,
      },
      load: false,
    };
    this.timeSave = null;
  }
  componentDidMount() {
    this.setState({
      load: true,
    });
  }
  componentDidUpdate(props, state) {
    const { msg_exams, contact, _setMsgExam, _getContact } = this.props,
      { load } = this.state;

    if (props.msg_exams.length !== msg_exams.length && msg_exams.length) {
      msg_exams.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
      _setMsgExam();
      _getContact(contact.id);
      this.setState({
        load: true,
      });
    }

    if (props.load !== load && load) {
      this.getUser();
    }
  }

  render() {
    const {
        id,
        name,
        rfc,
        email,
        type,
        birthday,
        domicilios,
        telefonos,
        business,
        load,
        verification,
      } = this.state,
      { handleClose, contact } = this.props,
      {
        compras = [],
        purchases_count,
        examenes = [],
        exams_count,
        marcas = [],
        brands_count,
        proveedor_de = [],
        suppliers_count,
        orders = [],
        orders_count,
        created_at,
        created,
        updated_at,
        updated,
      } = contact,
      hasTel = Object.values(telefonos).filter((tel) => tel.length === 10);

    //console.log("[DEBUG] Render");

    return (
      <>
        {contact.id ? (
          <Dashboard
            purchases={purchases_count}
            exams={exams_count}
            brands={brands_count}
            suppliers={suppliers_count}
            orders={orders_count}
            register={created_at ?? ""}
            created={created ? created.name : ""}
            updated={updated ? contact.updated.name : ""}
            updated_at={updated_at ?? ""}
          />
        ) : null}

        <div className="row">
          <div className="col-md-12">
            {contact.deleted_at ? (
              <div className="alert alert-warning">
                <h4 class="alert-heading">
                  <i className="fas fa-info-circle mr-1"></i>
                  Precaucion!
                </h4>
                <p>
                  Este contacto fue eliminado por {contact.updated.name} el{" "}
                  {moment(contact.deleted_at).format("LLLL")}
                </p>
              </div>
            ) : null}
            <div className="card card-indigo card-outline">
              <div className="card-header">
                <h3 className="card-title text-indigo">
                  <i className="fas fa-address-book mr-1"></i>
                  {id ? (
                    <label>
                      Editar contacto
                      <span className="badge bg-indigo ml-2">{id}</span>
                    </label>
                  ) : (
                    <label>Registrar nuevo contacto</label>
                  )}
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                    Datos personales
                  </h6>
                  <Personal
                    id={id}
                    name={name}
                    rfc={rfc}
                    email={email}
                    type={type}
                    birthday={birthday}
                    business={business}
                    verification={verification}
                    handleChangeData={this.handleChangeData}
                  />
                </div>
                <div className="row mt-5 border-top pt-5">
                  <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                    Medios de contacto <span className="text-orange">*</span>
                    {(!telefonos.t_casa &&
                      !telefonos.t_oficina &&
                      !telefonos.t_movil) | !verification.telefonos ? (
                      <small className="d-block w-100">
                        <span className="text-orange">
                          Ingrese por lo menos un telefono
                        </span>
                      </small>
                    ) : null}
                  </h6>
                  <Telefono
                    telefonos={telefonos}
                    handleChangeData={this.handleChangeData}
                  />
                </div>
                {!type ? (
                  <div className="row mt-5 border-top pt-5">
                    <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                      Domicilios del contacto
                    </h6>
                    <Domicilio
                      domicilios={domicilios}
                      handleChangeData={this.handleChangeData}
                    />
                  </div>
                ) : null}
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-md-12">
                    <div className="btn-group float-right" role="group">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={(e) => handleClose()}
                      >
                        <i
                          className={
                            id ? "fas fa-arrow-left mr-2" : "fas fa-ban mr-2"
                          }
                        ></i>
                        <strong>{id ? "Cerrar" : "Cancelar"}</strong>
                      </button>
                      <button
                        type="button"
                        className="btn bg-indigo"
                        onClick={this.handleSave}
                        disabled={
                          contact.deleted_at ||
                          !name.length ||
                          !email.length ||
                          (!birthday.length && !type) ||
                          !hasTel.length
                        }
                      >
                        <i className="fas fa-save mr-1"></i>
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {load ? (
                <div className="overlay dark">
                  <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {id ? (
          <div className="content" id="details">
            <div className="row">
              {!type ? (
                <div className="col">
                  <CardExams handeleChangePage={this.handleSelectExam} />
                </div>
              ) : null}

              {compras.length ? (
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-indigo text-bold w-100 mb-2">
                        <i className="fas fa-money-bill mr-1"></i>
                        Compras
                      </h5>
                      <ListSales sales={compras} />
                    </div>
                  </div>
                </div>
              ) : null}

              {marcas.length ? (
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-indigo text-bold w-100 mb-2">
                        <i className="fas fa-copyright mr-1"></i>
                        Marcas
                      </h5>
                      <ListBrands brands={marcas} />
                    </div>
                  </div>
                </div>
              ) : null}

              {proveedor_de.length ? (
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-indigo text-bold w-100 mb-2">
                        <i className="fas fa-building mr-1"></i>
                        Laboratorio
                      </h5>
                      <ListOrders orders={proveedor_de ?? []} />
                    </div>
                  </div>
                </div>
              ) : null}

              {orders.length ? (
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-indigo text-bold w-100 mb-2">
                        <i className="fas fa-shopping-basket mr-1"></i>
                        Pedidos
                      </h5>
                      <ListOrders orders={orders ?? []} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </>
    );
  }

  handleSelectExam = ({ id }) => {
    const { handleChangePage: _handleChangePage } = this.props;

    console.log("[DEBUG] exam selectd", id);
    _handleChangePage(`/consultorio/${id}`);
  };
  handleSaveExam = () => {
    const { _saveExam, contact } = this.props,
      examToday = contact.examenes.filter(
        (exam) =>
          moment(exam.created_at).diff(moment(), "days") === 0 || !exam.estado
      );

    if (examToday.length) {
      window.Swal.fire({
        title: "Examenes",
        text: "Existe un examen activo o del dia",
        icon: "error",
      });
      console.error("[OrusSystem] Examenes activos:", examToday.length);
      return false;
    }

    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear un nuevo examen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        _saveExam({
          id: 0,
          data: {
            edad: contact.edad,
            contact_id: contact.id,
          },
        });
      }
    });
  };
  handleChangeData = (key, value) => {
    const { verification } = this.state;

    switch (key) {
      case "name":
        this.setState({
          name: value,
          verification: {
            ...verification,
            name: true,
          },
        });
        break;
      case "email":
        this.setState({
          email: value,
          verification: {
            ...verification,
            email: true,
          },
        });
        break;
      case "birthday":
        this.setState({
          birthday: value,
          verification: {
            ...verification,
            birthday: true,
          },
        });
        break;
      case "telefonos":
        this.setState({
          telefonos: value,
          verification: {
            ...verification,
            telefonos: true,
          },
        });
        break;
      default:
        //console.log("[DEBUG] VERIFY: " + key, value);
        this.setState({
          [key]: value,
        });
        break;
    }
  };
  handleVerificationData = () => {
    const { name, email, birthday, telefonos, verification, type } = this.state,
      patternName =
        /^[A-ZÁÉÍÓÚñáéíóúÑ]+\s[A-ZÁÉÍÓÚñáéíóúÑ]{2,}(\s?[A-ZÁÉÍÓÚñáéíóúÑ]+){1,}/gim,
      patternEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim,
      patternPhone = /^\d{10}$/gim;

    if (!type && !patternName.test(name)) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El nombre del contacto es erroneo",
        icon: "warning",
      });
      this.setState({
        verification: {
          ...verification,
          name: false,
        },
      });
      return false;
    }
    if (!patternEmail.test(email)) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El correo electrónico del contacto es erroneo",
        icon: "warning",
      });
      this.setState({
        verification: {
          ...verification,
          email: false,
        },
      });
      return false;
    }
    const tel = Object.values(telefonos);
    let telefonoVerify = true;
    tel.every((num) => {
      if (patternPhone.test(num)) {
        telefonoVerify = false;
        return false;
      }
      return true;
    });

    if (!type && telefonoVerify) {
      window.Swal.fire({
        title: "Verificacion",
        text: "El numero de contacto es erroneo",
        icon: "warning",
      });
      this.setState({
        verification: {
          ...verification,
          telefonos: false,
        },
      });
      return false;
    }

    const date = new Date(birthday),
      today = new Date(),
      anos = today.getFullYear() - date.getFullYear();

    if (!type && (!birthday || anos < 1)) {
      window.Swal.fire({
        title: "Verificacion",
        text: "La fecha de nacimiento es erronea",
        icon: "warning",
      });
      this.setState({
        verification: {
          ...verification,
          birthday: false,
        },
      });
      return false;
    }

    return true;
  };
  handleSave = (e) => {
    e.preventDefault();
    const {
        id,
        name,
        rfc,
        email,
        type,
        birthday,
        domicilios,
        telefonos,
        business,
      } = this.state,
      { handleSave: _handleSave } = this.props;

    //Verificacion de datos
    if (!this.handleVerificationData()) return false;

    //Perarando datos
    let dataDom = {
      calle: domicilios.calle.trim(),
      colonia: domicilios.colonia.trim(),
      municipio: domicilios.municipio.trim(),
      estado: domicilios.estado.trim(),
      cp: domicilios.cp.trim(),
    };
    const data = {
      name: name.trim().toLocaleLowerCase(),
      rfc: rfc.trim().toLocaleLowerCase(),
      email: email.trim().toLocaleLowerCase(),
      type,
      birthday: new Date(birthday),
      domicilio: JSON.stringify(dataDom),
      telnumbers: JSON.stringify(telefonos),
      business: business ? 1 : 0,
    };

    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Almacenamiento",
      text: id
        ? "¿Esta seguro de actualizar al contacto?"
        : "¿Esta seguro de crear un nuevo contacto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        _handleSave(id, data);
      }
    });
  };
  getUser = () => {
    const { contact } = this.props,
      { id, domicilio, telefonos } = contact;

    if (id) {
      this.setState({
        id,
        name: contact.nombre,
        rfc: contact.rfc ?? "",
        email: contact.email ?? "",
        type: contact.tipo,
        business: contact.empresa,
        birthday: contact.f_nacimiento ?? "",
        domicilios: domicilio
          ? domicilio
          : {
              calle: "",
              colonia: "",
              municipio: "",
              estado: "",
              cp: "",
            },
        telefonos: telefonos
          ? telefonos
          : { t_casa: "", t_oficina: "", t_movil: "" },
        load: false,
      });
    } else {
      this.setState({
        load: false,
      });
    }
  };
}

const mapStateToProps = ({ contact, exam }) => {
    return {
      loading: contact.loading,
      msg_exams: exam.messages,
      contact: contact.contact,
    };
  },
  mapActionsToProps = {
    _setContact: contactActions.setContact,
    _getContact: contactActions.getContact,
    _saveExam: examActions.saveExam,
    _setMsgExam: examActions.setMessagesExam,
  };

export default connect(mapStateToProps, mapActionsToProps)(AddContactComponent);
