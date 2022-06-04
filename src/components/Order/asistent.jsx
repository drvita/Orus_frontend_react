import React, { Component, useState, useEffect, useContext} from "react";
import { connect } from "react-redux";
import moment from "moment";
import generalHelper from '../../utils/helpers';
import saleHelper from '../../components/Sales/helpers';

//Context
import { OrderContext } from "../../context/OderContext";

//Hooks
import useCategory from "../../hooks/useCategory";
import useContact from "../../hooks/useContact";
import useOrder from "../../hooks/useOrder";
import useExam from "../../hooks/useExam";

//Components
import SearchContact from "../Contacts/views/ShowCard";
import ListExam from "../Exam/views/List";
import Exam from "../Exam/views/examShort";
import Items from "./views/listItemsOrder";

//Actions
import { contactActions } from "../../redux/contact";
import { examActions } from "../../redux/exam";
import { categoryActions } from "../../redux/category";
import { orderActions } from "../../redux/order";
import helper_exam from "../Exam/helpers";
import helper from "./helpers";
import PaymentModal from "./views/PaymentModal";


export default function AsistentComponent(props){

  const [state, setState] = useState({
    contact_id: 0,
    items: [],
    codes: {},
    exam_id: null,
    exam: {},
    examsList: [],
    examEdit: false,
    load: true,
    LOADING: false,
    data:{},
    session: generalHelper.getSession(),
    listReady: false,
    showModal: false,
    sale:{
      total:0,
      discount:0, 
      payments:[],
    }
  });


  console.log(state.sale.payments);


  const orderContext = useContext(OrderContext);
  const orderHook = useOrder();
  const examHook = useExam();

  const productCodes = [];
  
  state.items.forEach((item) => productCodes.push(item.category.code.codeCategory[0]));

  const load_order = false;
  const { exam } = state;

  const changeTotal = (total, status)=>{
    console.log("[DEBUG] TOTAL", total);
    setState({
      ...state,
      listReady: status,
      sale: {
        ...state.sale,
        total:total,
      },
    });
  }

  const setPayments = (payments)=>{
    setState({
      ...state,
      showModal: false,
      sale:{
        ...state.sale,
        payments: payments,
      }
    })
    console.log("Payments recibidos de regreso", payments)
  };


  const handleContactSelect = (contact) => {
    console.log("Contacto recibido", contact);
    if(contact.id === 0){
      setState({
        contact_id: 0,
        items: [],
        codes: {},
        exam_id: null,
        exam: {},
        examEdit: false,
        examsList: [],
        load: true,
        LOADING: false,
        data:{},
        session: generalHelper.getSession(),
      })
    }else{
      const data = helper.getDataOneItem(contact.id);
      setState({
        ...state,
        contact_id: contact.id ?? 0,
        examsList: contact.exams.length ? contact.exams : [],
        items: data.items ?? [],
        data: contact ? contact : {},
      })
    }
  };

  const handleCancel = () => {
    setState({ 
      session: generalHelper.getSession(),
      contact_id: 0,
      items: [],
      codes: {},
      exam_id: null,
      exam: {},
      examEdit: false,
      load: true,
      LOADING: false,
      data:{},
    });

    if(!state.contact_id){
      orderContext.set({
        ...orderContext,
        panel:'inbox',
      });
    }
  };

  const handleNewExam = ()=>{
    let dataNewExam = {
      contact_id: state.data.id,
      name: state.data.name
    };

    examHook.saveExam(dataNewExam).then((data)=>{
      if(data){

        let exam = {
          id:data.id,
          status: data.status,
          created_at: data.created_at,
        }

        let updatedList = state.examsList;
        updatedList.push(exam);

        
        setState({
          ...state,
          exam_id: data.id,
          exam: exam,
          examsList: updatedList
        })

        window.Swal.fire({
          icon: "success",
          title: "Examen Creado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        
      }else{
        
        window.Swal.fire({
          icon: "error",
          title: "Error al crear el examen",
          showConfirmButton: false,
          timer: 1500,
        });

      }
    })
  };


  const handleSave = (e) => {
    let categories_wrong = 0;
    const { items: items_state, exam_id, session, contact_id } = state;

    const items = items_state.map((item) => {
        if (item.category === 4) categories_wrong++;

        return {
          cant: item.cant,
          price: item.precio,
          subtotal: item.subtotal,
          inStorage: item.inStorage,
          session: session,
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
      items: items,
      status: 0,
    };

    console.log("[DEBUG ORDER data]", data);
    if (exam_id) data.exam_id = parseInt(exam_id);

    //TODO:Guardar la orden con el hook y setear el contacto al estado inicial
    orderHook.saveOrder(data).then((data)=>{
      if(data){
        window.Swal.fire({
          icon: "success",
          title: "Pedido guardado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("State despuès de guardar:",state);
        orderContext.set({
          ...orderContext,
          panel: 'inbox',
        })
      }
    })
  };


  const handleChangeInput = (key, value) => {

    if (key === "exam") {
      console.log("Entrando al primer condicional");

      if (value.category_id) {
        console.log("Primer IF");
        handleGetCategories(value.category_id);
      }

      if (!value.id) {
        console.log("Segundo IF");
        setState({
          ...state,
          exam_id: 0,
          exam: {},
          codes: {},
        });
      } else {
        console.log("ELSE")
        setState({
          ...state,
          exam_id: value.id,
          exam: value,
          codes: {},
        });
      }
    }


    if (key === "codes") {
      setState({
        ...state,
        codes: value,
      });
    } else {
      setState({
        ...state,
        [key]: value,
      });
    }
  };


  const handleGetCategories = (cat_id) => {
    console.log("Get Categories", cat_id);
    const { _getCategory } = this.props;
    _getCategory({ id: cat_id});
  };


  const showModal = ()=>{
    setState({
      ...state,
    })
  }

  return(
    <div className="mainAssitentComponent"> 

      <div className="card card-warning card-outline col-lg-12">

        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-clipboard-list mr-1"></i>
            Nuevo Pedido
          </h3>
        </div>

        <div className="card-body d-flex justify-content-center col-lg-12">

          {/* Validacion 1 --- Seleccion de cliente */}
          {!state.contact_id ? (
            <div className="form-group d-print-none col-lg-12">
              <SearchContact
                title="cliente"
                legend={ !state.data.id ? "Busque el paciente por nombre para crearun nuevo pedido" : null }
                readOnly={state.exam_id !== null}
                handleContactSelect = {handleContactSelect}
                data = {state.data}
              />      
            </div>
          ):(
            <div class="card col-lg-5 mr-5 border border-success">
              <div class="card-header">
                <h3 className="card-title">
                  <i className="fas fa-user-alt mr-1"></i>
                  Cliente seleccionado
                  <i className="ml-5 fas fa-check mr-1"></i>
                </h3>
              </div>
              <div class="card-body">
                <p class="badge badge-success">{`# ID ${state.contact_id}`}</p>
                <p className="card-text">
                  <i className="fas fa-user-circle mr-1"></i>
                  {state.data.name.toUpperCase()}
                </p>
                <p className="card-text">
                  <i className="fas fa-at mr-1"></i>
                  {state.data.email ?? 'Email no registrado'} 
                </p>
                <p className="card-text">
                  <i className="fas fa-phone-alt mr-1"></i>
                  {state.data.phones.cell === "" ? `Telefono no registrado` : state.data.phones.cell}
                </p> 
                <button className="btn btn-primary" disabled = {state.exam_id ? true: false} onClick={()=>{
                  setState({ 
                    session: generalHelper.getSession(),
                    contact_id: 0,
                    items: [],
                    codes: {},
                    exam_id: null,
                    exam: {},
                    examEdit: false,
                    load: true,
                    LOADING: false,
                    data:{},
                  });
                }} >Cambiar</button>
              </div>
            </div>
          )}


          {/* Validacion 2 --- Seleccion de examen o creacion de uno nuevo */}
          {
            !state.contact_id ? null : 
                    state.examsList.length ? 
                          state.exam_id ? 
                          (
                            <div class="card col-lg-5 border border-success">
                              <div class="card-header">
                                <h3 className="card-title">
                                  <i className="fas fa-notes-medical mr-1"></i>
                                  Examen Seleccionado
                                  <i className="ml-5 fas fa-check mr-1"></i>
                                </h3>
                              </div>
                              <div class="card-body">
                                <p className = "card-text">
                                      <span className="badge badge-success mr-3 mb-2">{`# ${exam.id}`}</span>
                                </p>
                                <p className="font-weight-bold">Creado: <span className="font-weight-normal">{moment(exam.created_at).fromNow()}</span></p>
                                <p className="font-weight-bold">Fecha: <span className="font-weight-normal">{exam.created_at}</span></p>
                                <p className="font-weight-bold">Estatus: <span className="font-weight-normal">{exam.status}</span></p>
                                <button className="btn btn-primary" disabled = {state.items.length ? true : false} onClick={()=>{
                                  setState({
                                    ...state,
                                    exam_id: null,
                                    exam: {},
                                  })
                                }}>Cambiar</button>
                              </div>
                            </div>
                          ) :
                          (
                            <div class="card col-lg-5 border border-warning">
                              <div class="card-header">
                                <h3 className="card-title">
                                  <i className="fas fa-user-alt mr-1"></i>
                                  Lista de Examenes
                                  <i className="fas fa-exclamation-circle ml-5"></i>
                                </h3>
                              </div>
                              <div class="card-body">
                                <p className="text-secondary">*Seleciona un examen o crea uno nuevo para continuar</p>
                                {state.examsList.map((exam, index) => (
                                  <div className="border-bottom mb-1 cursor-pointer" key={index} onClick={()=>{
                                    setState({
                                      ...state,
                                      exam: exam,
                                      exam_id: exam.id
                                    })
                                  }}>
                                    <p className = "card-text">
                                      <span className="badge badge-warning mr-3 mb-2">{`# ${exam.id}`}</span>
                                      {moment(exam.created_at).fromNow()}
                                    </p>
                                  </div>
                                ))}
                                <button className="btn btn-primary mt-2" onClick={handleNewExam}>Nuevo examen</button>                
                              </div>
                            </div> 
                          ) : 
                          (
                            <div class="card col-lg-5 border border-warning">
                              <div class="card-header">
                                <h3 className="card-title">
                                  <i className="fas fa-user-alt mr-1"></i>
                                  Lista de Examenes
                                  <i className="fas fa-exclamation-circle ml-5"></i>
                                </h3>
                              </div>
                              <div class="card-body">
                                <p>*No tiene ningun examen asignado</p>
                                <button className="btn btn-primary" onClick={handleNewExam}>Nuevo examen</button>
                              </div>
                            </div>
                          ) 
          }
        </div>

        {/* Validacion 3 --- Seleccion de productos una vez seleccionado el examen */}
        {!state.contact_id ? null : state.exam_id ? (
          <Items
            items={state.items}
            session={state.session}
            codes={state.codes}
            productCodes = {productCodes}
            showHideBtns = {state.listReady}
            ChangeInput={handleChangeInput}
            changeTotal = {changeTotal}
        />
        ): (
          <div class="col-lg-10 text-center mt-3 mb-3">
            <h5>
              <i className="fas fa-exclamation-circle mr-1"></i>
              Crea o selecciona un examen antes de agregar productos!
            </h5>
          </div>
        )}

        {/* Validación 5 --- lista de abonos al pago */}
        {state.sale.payments.length || state.sale.discount > 0 ? (
          <div className="card col-lg-10 d-flex align-self-center">
            <div class="card-header border-success">
              <h3 className="card-title">
                <i className="fas fa-money-bill-alt mr-1"></i>  
                  Lista de abonos
              </h3>
            </div>

            <div className="card-body d-flex justify-content-space-around">

              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <h5 className="font-weight-bold">Descuento: <span className="font-weight-normal">$0</span></h5>
              </div>

              <div className="col-lg-8">              
                {state.sale.payments.map((payment, index) => (
                  <div className="d-flex justify-content-around align-items-center font-weight-bold mb-2" id = {payment.id} key={index}>
                    <p className="m-0"><span className="text-success">Abono </span>{payment.metodoname}</p>
                    <p className="m-0">30 Junio 2022</p>
                    <p className="m-0 text-primary">${payment.total}</p> 
                    <button className="btn btn-sm btn-muted"><i className="fas fa-trash"></i></button>              
                  </div>
                ))}
              </div>
            </div>

            <div className="card-footer text-right mr-5 d-flex justify-content-end">
              <h6 className="mr-4 text-success"><span className="font-weight-bold text-dark">Abono total:</span> ${saleHelper.getPagado(state.sale.payments)}</h6>
              <h6 className="text-danger"><span className="font-weight-bold text-dark">Por pagar:</span>${state.sale.total - saleHelper.getPagado(state.sale.payments)}</h6>
            </div>

          </div>

        ): null}



        {/* Validacion 4 --- Opciones de pago del pedido*/}
        {state.listReady ? (
          <div class="card col-lg-10 d-flex align-self-center border border-bottom-primary">
            <div class="card-header border-primary">
              <h3 className="card-title">
                <i className="fas fa-money-bill mr-1"></i>
                  Opciones de pago
              </h3>
            </div>
            <div class="card-body">
              <div className="">
                <button className="btn btn-success mr-4" onClick={()=>{
                  setState({
                    ...state,
                    showModal: true,
                  })
                }}>
                <i className="fas fa-money-bill-alt mr-1"></i>
                  Abonar
                </button>
                <button className="btn btn-secondary mr-4" disabled = {state.sale.payments.length ? true : false}>
                  <i className="fas fa-ban mr-1"></i>
                  Sin abono inicial
                </button>

                <button className="btn btn btn-outline-info" disabled = {state.sale.payments.length ? true : false}  onClick={()=>{
                  setState({
                    ...state,
                    listReady: false,
                  })
                }}>
                  <i className="fas fa-backspace mr-1"></i>
                  Agregar otro producto
                </button>
              </div>
            </div>
          </div> 
        ): null}

        {/* Modal validation */}
        {state.showModal ? (
          <PaymentModal
          handleClose = {() => {
            setState({
              ...state,
              showModal: false,
            })
          }}
          sale = {state.sale}
          forPaid = {state.sale.total - saleHelper.getPagado(state.sale.payments)}
          handleSetPayments = {setPayments}
          />
        ) : null}

      </div>
    </div>
  );

}

