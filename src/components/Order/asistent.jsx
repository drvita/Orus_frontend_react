import React, { Component } from "react";
import { connect } from "react-redux";
//Components
import SearchContact from "../Contacts/views/showContactInLine";
import ListExam from "../Exam/data/listExamsCustomer";
import Exam from "../Exam/views/examShort";
import Items from "./views/listItemsOrder";
//Actions
import { contactActions } from "../../redux/contact";
import { examActions } from "../../redux/exam";
import { categoryActions } from "../../redux/category";
import { orderActions } from "../../redux/order";
import helper_exam from "../Exam/helpers";
import helper from "./helpers";

class AsistentComponent extends Component {
  constructor(props) {
    super(props);
    const session =
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(36).substring(2, 16) +
      Math.random().toString(10);

    this.state = {
      session,
      contact_id: 0,
      items: [],
      codes: {},
      exam_id: null,
      exam: {},
      examEdit: false,
      load: true,
    };
  }
  componentDidMount() {
    const { contact, exam } = this.props;

    if (contact.id) {
      const data = helper.getDataOneItem(contact.id);
      if (data) {
        this.setState({
          contact,
          contact_id: contact.id,
          items: data.items ?? [],
          session: data.session ?? this.state.session,
          exam: exam ?? this.state.exam,
          exam_id: exam.id ?? this.state.exam_id,
        });
      }
    }
  }
  componentDidUpdate(props) {
    const { category, contact, exam, msg_exams, _setMsgExam, _getContact } =
        this.props,
      data = helper.getDataOneItem(contact.id);

    if (props.category.id !== category.id) {
      this.getCategories(category, this.state.exam);
    }

    //Process messages of exams ok
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

    //When change contact
    if (props.contact.id !== contact.id && contact.id) {
      this.setState({
        contact,
        contact_id: contact.id,
        items: data.items ?? [],
        session: data.session ?? this.state.session,
      });
    }
    //When change exam
    if (props.exam.id !== exam.id && exam.id) {
      this.setState({
        exam,
        exam_id: exam.id,
      });
    }
  }

  render() {
    const { contact_id, items, exam, exam_id, examEdit, codes, session } =
        this.state,
      { contact, load_order: LOADING, _saveExam } = this.props;

    //console.log("[DEBUG] codes", codes, exam);

    return (
      <div className="card card-warning card-outline">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-clipboard-list mr-1"></i>Nuevo pedido
          </h3>
        </div>
        <div className="card-body">
          <div className="form-group d-print-none">
            <SearchContact
              title="cliente"
              legend={
                !contact.id
                  ? "Busque el paciente por nombre para crearun nuevo pedido"
                  : null
              }
              readOnly={exam_id !== null}
            />
          </div>
          {contact.id ? (
            <React.Fragment>
              {exam_id !== null ? (
                <React.Fragment>
                  {examEdit ? (
                    <div className="form-group">
                      <Exam
                        id={exam_id}
                        examEdit={true}
                        exam={exam}
                        ChangeInput={this.handleChangeInput}
                      />
                    </div>
                  ) : (
                    <React.Fragment>
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-notes-medical mr-1"></i>{" "}
                              Examen:
                            </span>
                          </div>
                          <input
                            type="text"
                            className={
                              exam_id
                                ? exam.observaciones
                                  ? "form-control text-right pr-2 bg-info text-bold"
                                  : "form-control text-right pr-2"
                                : "form-control text-center"
                            }
                            value={
                              exam_id
                                ? exam.observaciones
                                  ? exam_id + " [Revise las observaciones]"
                                  : exam_id
                                : "Sin examen"
                            }
                            readOnly={true}
                          />
                          <div className="float-right">
                            <div className="btn-group btn-sm">
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={(e) =>
                                  this.handleChangeInput("exam_id", null)
                                }
                              >
                                <i className="fas fa-exchange-alt"></i>
                              </button>
                              {exam.id ? (
                                <button
                                  type="button"
                                  className="btn btn-info btn-sm"
                                  onClick={(e) =>
                                    this.handleChangeInput("examEdit", true)
                                  }
                                  disabled={examEdit}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {(exam.id > 0 && exam.status) || !exam.id ? (
                        <Items
                          items={items}
                          session={session}
                          codes={codes}
                          ChangeInput={this.handleChangeInput}
                        />
                      ) : (
                        <span className="alert">
                          <h5 className="w-100 text-center">
                            <i className="fas fa-info-circle mr-1"></i>
                            <span className="text-muted">
                              Es necesario que el examen este terminado para
                              continuar con el pedido
                            </span>
                          </h5>
                        </span>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <div className="form-group">
                  <ListExam
                    exams={contact.examenes}
                    allSelect
                    handleSelectedExam={(exam) =>
                      this.handleChangeInput("exam", exam)
                    }
                  />
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e) => this.handleChangeInput("exam", { id: 0 })}
                    >
                      <i className="fas fa-ban mr-1"></i>
                      Sin examen
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e) =>
                        helper_exam.handleSaveExam(contact, null, _saveExam)
                      }
                    >
                      <i className="fas fa-notes-medical mr-1"></i>
                      Nuevo examen
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ) : null}
        </div>
        {!examEdit ? (
          <div className="card-footer">
            <div className="mailbox-controls text-right">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.handleCancel}
                >
                  <i className="fas fa-ban mr-1"></i>
                  {contact_id ? "Cancelar" : "Cerrar"}
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.handleSaveStorage}
                  disabled={!contact_id}
                >
                  <i className="fas fa-clock mr-1"></i>
                  Temporal
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm text-bold"
                  onClick={this.handleSave}
                  disabled={
                    contact_id && exam_id !== null && items.length
                      ? false
                      : true
                  }
                >
                  <i className="fas fa-save mr-1"></i> Guardar
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {LOADING ? (
          <div className="overlay dark">
            <i className="fas fa-2x fa-sync-alt fa-spin"></i>
          </div>
        ) : null}
      </div>
    );
  }

  handleSaveStorage = () => {
    const { contact_id, exam_id, items, session } = this.state,
      { contact } = this.props,
      data = {
        id: contact_id,
        contact: {
          id: contact.id,
          name: contact.nombre,
        },
        exam_id,
        items,
        session,
        created_at: new Date(),
      };

    helper.addDataTemporary(data);
    this.handleCancel();
  };
  handleCancel = () => {
    const { handleClose: _handleClose, _setContact } = this.props;

    this.setState({
      contact_id: 0,
      items: [],
      codes: {},
      exam_id: null,
      exam: {},
      examEdit: false,
    });
    _handleClose();
    _setContact();
  };
  handleGetCategories = (cat_id) => {
    const { _getCategory } = this.props;

    _getCategory({
      id: cat_id,
    });
  };
  handleChangeInput = (key, value) => {
    if (key === "exam") {
      if (value.category_id) {
        //this.getCategories(value);
        this.handleGetCategories(value.category_id);
      }
      if (!value.id) {
        this.setState({
          exam_id: 0,
          exam: {},
          codes: {},
        });
      } else {
        this.setState({
          exam_id: value.id,
          exam: value,
          codes: {},
        });
      }
    }
    if (key === "codes") {
      this.setState({
        codes: value,
      });
    } else {
      this.setState({
        [key]: value,
      });
    }
  };
  handleCodeName = (category) => {
    let code = "";
    if (category.depende_de) {
      if (category.depende_de.depende_de) {
        code = category.depende_de.depende_de.meta.code;
        code += category.depende_de.meta.code;
        code += category.meta.code;
      } else {
        code = category.depende_de.meta.code;
        code += category.meta.code;
      }
    } else {
      code = category.meta.code;
    }
    return code;
  };
  getCategories = (category, exam) => {
    const { category_id, esferaod, esferaoi, cilindrod, cilindroi, id } = exam;

    console.log("[Asistent order] Recomendacion descargada");
    let code =
        category_id && category.id ? this.handleCodeName(category) : "XX",
      gradod = "+000000",
      gradoi = "+000000";

    if (cilindrod || esferaod) {
      gradod = esferaod > 0 ? "+" : "";
      gradod +=
        esferaod.toFixed(2).toString().replace(".", "") +
        cilindrod.toFixed(2).toString().replace("-", "").replace(".", "");
    }
    if (cilindroi || esferaoi) {
      gradoi = esferaoi > 0 ? "+" : "";
      gradoi +=
        esferaoi.toFixed(2).toString().replace(".", "") +
        cilindroi.toFixed(2).toString().replace("-", "").replace(".", "");
    }

    this.setState({
      exam_id: id,
      exam,
      codes: {
        code,
        od: gradod,
        oi: gradoi,
      },
    });
  };
  handleSave = (e) => {
    //Valid data
    let categories_wrong = 0;
    const { options, _saveOrder, _setContact } = this.props,
      { items: items_state, exam_id, session, contact_id } = this.state,
      items = items_state.map((item) => {
        if (item.category === 4) categories_wrong++;

        return {
          cant: item.cantidad,
          price: item.precio,
          subtotal: item.subtotal,
          inStorage: item.inStorage,
          session: item.session,
          out: item.out,
          descripcion: item.descripcion,
          store_items_id: item.store_items_id,
        };
      });

    if (items.length === categories_wrong) {
      window.Swal.fire({
        title: "Verificacion",
        text: "No hay productos para procesar en un pedido",
        icon: "warning",
      });
      return false;
    }

    let data = {
      session: session,
      contact_id: contact_id,
      items: JSON.stringify(items),
      status: 0,
    };
    if (exam_id) data.exam_id = parseInt(exam_id);
    //Save
    helper.handleSaveOrder(null, data, options, _saveOrder, () =>
      _setContact({})
    );
  };
}

const mapStateToProps = ({ contact, exam, order, category }) => {
    return {
      load_contact: contact.loading,
      contact: contact.contact,
      exam: exam.exam,
      msg_exams: exam.messages,
      options: order.options,
      load_order: order.loading,
      category: category.category,
    };
  },
  mapActionsToProps = {
    _setContact: contactActions.setContact,
    _getContact: contactActions.getContact,
    _saveExam: examActions.saveExam,
    _setMsgExam: examActions.setMessagesExam,
    _saveOrder: orderActions.saveOrder,
    _getCategory: categoryActions.getCategory,
  };

export default connect(mapStateToProps, mapActionsToProps)(AsistentComponent);
