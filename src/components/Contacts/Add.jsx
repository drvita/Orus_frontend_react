/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
//Components
import Personal from "./views/add_personal";
import Domicilio from "./views/add_domicilio";
import Telefono from "./views/add_telefonos";
import ListSales from "../Sales/views/listOfSales_delete";
import Dashboard from "../dashboard/dashboard_customer";
import ListBrands from "../Store/views/listOfBrands";
import ListOrders from "../Order/views/listOfOrders";
import CardExams from "../Exam/views/card_list_add";
import Confirm from "../../layouts/modal";

import { Contacts } from "../../context/ContactContext";
// import helper from "./helper";

export default function AddContact(props) {
  const {
    handleNewOrEdit: _handleNewOrEdit,
    verification = {},
    load = false,
    showModal = false,
  } = props;
  const { id } = props.match.params;
  const _contacts = Contacts();
  const contact = _contacts.contact;
  const {
    domicilio,
    telefonos: telnumbers = {},
    type = 0,
    hasTel = [],
    compras = [],
    marcas = [],
    proveedor_de = [],
    orders = [],
  } = contact;
  const history = useHistory();

  const dataBodyConfirm = (id_exam) => {
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

  useEffect(() => {
    console.log("[DEBUG] Add contact:", id);

    if (id) {
      _contacts.getContact(parseInt(id)).then((status) => {
        console.log("[DEBUG] Finish get contact:", status);
      });
    } else {
      console.log("[DEBUG] Not id to add");
    }
  }, [id]);

  return (
    <>
      {contact.id && (
        <Dashboard
          purchases={contact.purchases_count}
          exams={contact.exams_count}
          brands={contact.brands_count}
          suppliers={contact.suppliers_count}
          orders={contact.orders_count}
          register={contact.created_at ?? ""}
          created={contact.created ? contact.created.name : ""}
          updated={contact.updated ? contact.updated.name : ""}
          updated_at={contact.updated_at ?? ""}
        />
      )}

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
                {contact.id ? (
                  <label>
                    Editar contacto
                    <span className="badge bg-indigo ml-2">{contact.id}</span>
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
                  id={contact.id}
                  name={contact.nombre}
                  rfc={contact.rfc}
                  email={contact.email}
                  type={contact.tipo}
                  gender={contact.metadata?.gender}
                  birthday={contact.metadata?.birthday}
                  business={contact.empresa}
                  verification={verification}
                  handleChangeData={() => {}}
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
                <Telefono telefonos={telnumbers} handleChangeData={() => {}} />
              </div>
              {!type ? (
                <div className="row mt-5 border-top pt-5">
                  <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                    Domicilios del contacto
                  </h6>
                  <Domicilio
                    domicilios={
                      domicilio ?? {
                        calle: "",
                        colonia: "",
                        municipio: "",
                        estado: "",
                        cp: "",
                      }
                    }
                    handleChangeData={() => {}}
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
                      onClick={() => {
                        history.push("/contactos");
                        _contacts.setOptions(_contacts, {
                          ..._contacts.options,
                          page: 1,
                        });
                        _handleNewOrEdit();
                      }}
                    >
                      <i
                        className={
                          contact.id
                            ? "fas fa-arrow-left mr-2"
                            : "fas fa-ban mr-2"
                        }
                      ></i>
                      <strong>{contact.id ? "Cerrar" : "Cancelar"}</strong>
                    </button>
                    <button
                      type="button"
                      className="btn bg-indigo"
                      onClick={() => {}}
                      disabled={
                        contact.deleted_at ||
                        !contact.name?.length ||
                        !contact.email?.length ||
                        (!contact.birthday?.length && !type) ||
                        !hasTel.length
                      }
                    >
                      <i className="fas fa-save mr-1"></i>
                      {contact.id ? "Actualizar" : "Guardar"}
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
      {contact.id ? (
        <div className="content" id="details">
          <div className="row">
            {!type ? (
              <div className="col">
                <CardExams handeleChangePage={() => {}} />
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
        <Confirm body={dataBodyConfirm(10)} handleCancel={() => {}} />
      )}
    </>
  );
}

// class AddContactComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       id: 0,
//       name: "",
//       rfc: "",
//       email: "",
//       type: 0,
//       gender: "female",
//       birthday: "",
//       domicilios: {
//         calle: "",
//         colonia: "",
//         municipio: "",
//         estado: "",
//         cp: "",
//       },
//       telnumbers: { t_casa: "", t_oficina: "", t_movil: "" },
//       business: false,
//       verification: {
//         name: true,
//         email: true,
//         birthday: true,
//         telefonos: true,
//       },
//       load: false,
//       showModal: false,
//       idExamSelect: 0,
//     };
//     this.timeSave = null;
//   }
//   componentDidMount() {
//     this.setState({
//       load: true,
//     });
//   }
//   componentDidUpdate(props) {
//     const { msg_exams, msg_contact, contact, _setMsgExam, _getContact } =
//         this.props,
//       { load } = this.state;

//     if (props.msg_exams.length !== msg_exams.length && msg_exams.length) {
//       msg_exams.forEach((msg) => {
//         const { type, text } = msg;
//         window.Swal.fire({
//           icon: type,
//           title: text,
//           showConfirmButton: type !== "error" ? false : true,
//           timer: type !== "error" ? 1500 : 9000,
//         });
//       });
//       _setMsgExam();
//       _getContact(contact.id);
//       this.setState({
//         load: true,
//       });
//     }

//     if (props.msg_contact.length !== msg_contact.length && msg_contact.length) {
//       msg_exams.forEach((msg) => {
//         const { type, text } = msg;
//         window.Swal.fire({
//           icon: type,
//           title: text,
//           showConfirmButton: type !== "error" ? false : true,
//           timer: type !== "error" ? 1500 : 9000,
//         });
//       });
//     }

//     //Reload user
//     if (props.contact.id !== contact.id && contact.id) {
//       this.setState({
//         load: true,
//       });
//     }

//     if (props.load !== load && load) {
//       this.getUser();
//     }
//   }
//   componentWillUnmount() {
//     const { _setList } = this.props;

//     _setList({
//       result: {
//         list: [],
//         metaList: {},
//         contact: {},
//       },
//     });
//   }

//   render() {
//     const {
//         id,
//         name,
//         rfc,
//         email,
//         type,
//         gender,
//         birthday,
//         domicilios,
//         telnumbers,
//         business,
//         load,
//         verification,
//         showModal,
//         idExamSelect,
//       } = this.state,
//       { handleClose: _handleClose, contact } = this.props,
//       {
//         compras = [],
//         purchases_count,
//         exams_count,
//         marcas = [],
//         brands_count,
//         proveedor_de = [],
//         suppliers_count,
//         orders = [],
//         orders_count,
//         created_at,
//         created,
//         updated_at,
//         updated,
//       } = contact,
//       hasTel = Object.values(telnumbers).filter((tel) => tel.length === 10);

//   }

//   handleCloseModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };
//   handleSelectExam = ({ id }) => {
//     this.setState({
//       showModal: true,
//       idExamSelect: id,
//     });
//     //window.location.href = `/consultorio/${id}`;
//   };
//   handleChangeData = (key, value) => {
//     const { verification } = this.state,
//       dataObject = helper.handleGetDataObject(key, value, verification);

//     this.setState(dataObject);
//   };
//   handleSave = (e) => {
//     e.preventDefault();
//     const {
//         id,
//         name,
//         rfc,
//         email,
//         type,
//         gender,
//         birthday,
//         domicilios,
//         telnumbers,
//         business,
//       } = this.state,
//       { _saveContact } = this.props;

//     //Data verification
//     if (!helper.handleVerificationData(this.state)) return false;
//     //make data location
//     const dataDom = {
//       calle: domicilios.calle.trim(),
//       colonia: domicilios.colonia.trim(),
//       municipio: domicilios.municipio.trim(),
//       estado: domicilios.estado.trim(),
//       cp: domicilios.cp.trim(),
//     };
//     //Make all data to save
//     const data = {
//       name: name.trim().toLocaleLowerCase(),
//       rfc: rfc.trim().toLocaleLowerCase(),
//       email: email.trim().toLocaleLowerCase(),
//       type,
//       gender,
//       birthday: new Date(birthday),
//       domicilio: JSON.stringify(dataDom),
//       telnumbers: JSON.stringify(telnumbers),
//       business: business ? 1 : 0,
//     };

//     //Save
//     helper.saveContact("contacto", data, _saveContact, id);
//   };
//   getUser = () => {
//     const { contact } = this.props,
//       { id, domicilio, telefonos } = contact;

//     if (id) {
//       this.setState({
//         id,
//         name: contact.nombre,
//         rfc: contact.rfc ?? "",
//         email: contact.email ?? "",
//         type: contact.tipo,
//         gender: contact.metadata.gender,
//         business: contact.empresa,
//         birthday: contact.metadata.birthday ?? "",
//         domicilios: domicilio
//           ? domicilio
//           : {
//               calle: "",
//               colonia: "",
//               municipio: "",
//               estado: "",
//               cp: "",
//             },
//         telnumbers: telefonos
//           ? telefonos
//           : { t_casa: "", t_oficina: "", t_movil: "" },
//         load: false,
//       });
//     } else {
//       this.setState({
//         load: false,
//       });
//     }
//   };
// }

// const mapStateToProps = ({ contact, exam }) => {
//     return {
//       //Contacts
//       loading: contact.loading,
//       contact: contact.contact,
//       msg_contact: contact.messages,
//       //Exams
//       msg_exams: exam.messages,
//     };
//   },
//   mapActionsToProps = {
//     //contact
//     _getContact: contactActions.getContact,
//     _saveContact: contactActions.saveContact,
//     _setList: contactActions.setListContact,
//     //Exams
//     _saveExam: examActions.saveExam,
//     _setMsgExam: examActions.setMessagesExam,
//   };

// export default connect(mapStateToProps, mapActionsToProps)(AddContactComponent);
