import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//Components
import Personal from "./views/add_personal";
import Domicilio from "./views/add_domicilio";
import Telefono from "./views/add_telefonos";
import ListSales from "../Sales/views/listOfSales_delete";
import Dashboard from "../Dashboard/dashboard_customer";
import ListBrands from "../Store/views/listOfBrands";
import ListOrders from "../Order/views/listOfOrders";
import CardExams from "../Exam/views/card_list_add";
import Confirm from "../../layouts/modal";
//Actions
import { contactActions } from "../../redux/contact/.";
import { examActions } from "../../redux/exam/.";
import helper from "./helper";

class AddContactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      rfc: "",
      email: "",
      type: 0,
      gender: "",
      birthday: "",
      domicilios: {
        calle: "",
        colonia: "",
        municipio: "",
        estado: "",
        cp: "",
      },
      telnumbers: { t_casa: "", t_oficina: "", t_movil: "" },
      business: false,
      verification: {
        name: true,
        email: true,
        birthday: true,
        telefonos: true,
      },
      load: false,
      showModal: false,
      idExamSelect: 0,
    };
    this.timeSave = null;
  }
  componentDidMount() {
    this.setState({
      load: true,
    });
  }
  componentDidUpdate(props) {
    const { msg_exams, msg_contact, contact, _setMsgExam, _getContact } =
        this.props,
      { load } = this.state;

      console.log("Contact",contact)

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

    if (props.msg_contact.length !== msg_contact.length && msg_contact.length) {
      msg_exams.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
    }

    //Reload user
    if (props.contact.id !== contact.id && contact.id) {
      this.setState({
        load: true,
      });
    }

    if (props.load !== load && load) {
      this.getUser();
    }
  }
  componentWillUnmount() {
    const { _setList } = this.props;

    _setList({
      result: {
        list: [],
        metaList: {},
        contact: {},
      },
    });
  }

  render() {
    const {
        id,
        name,
        rfc,
        email,
        type,
        gender,
        birthday,
        domicilios,
        telnumbers,
        business,
        load,
        verification,
        showModal,
        idExamSelect,
      } = this.state,
      { handleClose: _handleClose, contact } = this.props,
      {
        compras = [],
        purchases_count,
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
      hasTel = Object.values(telnumbers).filter((tel) => tel.length === 10);

    //console.log("HASTEL------",hasTel);

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
            updated={updated ? updated.name : ""}
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
                    gender={gender}
                    birthday={birthday}
                    business={business}
                    verification={verification}
                    handleChangeData={this.handleChangeData}
                  />
                </div>
                <div className="row mt-5 border-top pt-5">
                  <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                    Medios de contacto <span className="text-orange">*</span>
                    {(!telnumbers.t_casa &&
                      !telnumbers.t_oficina &&
                      !telnumbers.t_movil) | !verification.telefonos ? (
                      <small className="d-block w-100">
                        <span className="text-orange">
                          Ingrese por lo menos un telefono
                        </span>
                      </small>
                    ) : null}
                  </h6>
                  <Telefono
                    telefonos={telnumbers}
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
                        onClick={(e) => _handleClose()}
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
                        {id ? "Actualizar" : "Guardar"}
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
              ) : (
                <div>Type: {type}</div>
              )}

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
        {showModal && (
          <Confirm
            body={this.dataBodyConfirm(idExamSelect)}
            handleCancel={this.handleCloseModal}
          />
        )}
      </>
    );
  }

  dataBodyConfirm = (id_exam) => {
    return (
      <div>
        <p className="text-center">¿Realmente desea ver el examen?</p>
        <div className="text-center">
          <Link to={`/consultorio/${id_exam}`} className="btn btn-primary">
            Confirmar
          </Link>
        </div>
      </div>
    );
  };
  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  handleSelectExam = ({ id }) => {
    this.setState({
      showModal: true,
      idExamSelect: id,
    });
    //window.location.href = `/consultorio/${id}`;
  };
  handleChangeData = (key, value) => {
    //PRUEBAA//
    console.log("Input Seleccionado:" + key + "--- Valor:" + value);

    const { verification } = this.state,
      dataObject = helper.handleGetDataObject(key, value, verification);

    //PRUEBAAA//
    console.log("DATAOBJECT------", dataObject);

    this.setState(dataObject);
  };
  handleSave = (e) => {
    e.preventDefault();
    const {
        id,
        name,
        rfc,
        email,
        type,
        gender,
        birthday,
        domicilios,
        telnumbers,
        business,
      } = this.state,
      { _saveContact } = this.props;

    //Data verification
    if (!helper.handleVerificationData(this.state)) return false;
    //make data location
    const dataDom = {
      calle: domicilios.calle.trim(),
      colonia: domicilios.colonia.trim(),
      municipio: domicilios.municipio.trim(),
      estado: domicilios.estado.trim(),
      cp: domicilios.cp.trim(),
    };
    //Make all data to save
    const data = {
      name: name.trim().toLocaleLowerCase(),
      rfc: rfc.trim().toLocaleLowerCase(),
      email: email.trim().toLocaleLowerCase(),
      type,
      gender,
      birthday: new Date(birthday),
      domicilio: JSON.stringify(dataDom),
      telnumbers: JSON.stringify(telnumbers),
      business: business ? 1 : 0,
    };

    //PRUBEA//
    console.log("DATA TO SAVE", data);

    //Save
    helper.saveContact("contacto", data, _saveContact, id);
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
        telnumbers: telefonos
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
      //Contacts
      loading: contact.loading,
      contact: contact.contact,
      msg_contact: contact.messages,
      //Exams
      msg_exams: exam.messages,
    };
  },
  mapActionsToProps = {
    //contact
    _getContact: contactActions.getContact,
    _saveContact: contactActions.saveContact,
    _setList: contactActions.setListContact,
    //Exams
    _saveExam: examActions.saveExam,
    _setMsgExam: examActions.setMessagesExam,
  };

export default connect(mapStateToProps, mapActionsToProps)(AddContactComponent);
