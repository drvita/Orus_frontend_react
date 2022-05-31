import React, { Component, useState, useEffect, useContext} from "react";
import { connect } from "react-redux";
import generalHelper from '../../utils/helpers';

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
import saleHelper from "../Sales/helpers";

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
  });


  const orderContext = useContext(OrderContext);
  const orderHook = useOrder();
  const examHook = useExam();

  const load_order = false;
  const { exam } = state;
  

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
        //exam: contact.exams[0] ? contact.exams[0]: {},
        //exam_id: contact.exams.length ? contact.exams[0].id :  null,
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

        setState({
          ...state,
          exam_id: data.id,
          exam:{
            id:data.id,
            status: data.status,
            created_at: data.created_at,
          }
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
    console.log(key, value);

    console.log(state);

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

    /* if(key === 'exam_id'){
      console.log("Entrando al final");
      setState({
        ...state,
        exam_id: 0,
        exam: {},
      })
    } */
  };


  const handleGetCategories = (cat_id) => {
    console.log("Get Categories", cat_id);
    const { _getCategory } = this.props;
    _getCategory({ id: cat_id});
  };




  return(
    <div className="mainAssitentComponent"> 
      <div className="card card-warning card-outline col-lg-12">

        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-clipboard-list mr-1"></i>
            Nuevo Pedido
          </h3>
        </div>

        <div className="card-body d-flex justify-content-around col-lg-12 col-md-12 col-sm-12">

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
            <div class="card col-lg-4 border border-success">
              <div class="card-header">
                <h3 className="card-title">
                  <i className="fas fa-user-alt mr-1"></i>
                  Cliente seleccionado
                  <i className="ml-5 fas fa-check mr-1 bg-success"></i>
                </h3>
              </div>
              <div class="card-body">
                <p class="badge badge-success">{`# ID ${state.contact_id}`}</p>
                <p className="card-text">{state.data.name.toUpperCase()}</p>
                <p className="card-text">{state.data.email ?? 'Email no registrado'}</p>
                <p className="card-text">{state.data.phones.cell ?? 'Telefono no registrado'}</p> 
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
                            <div class="card col-lg-4 border border-success">
                              <div class="card-header">
                                <h3 className="card-title">
                                  <i className="fas fa-user-alt mr-1"></i>
                                  Examen Seleccionado
                                  <i className="ml-5 fas fa-check mr-1 bg-success"></i>
                                </h3>
                              </div>
                              <div class="card-body">
                                <p className = "card-text">
                                      <span className="badge badge-success mr-3 mb-2">{`# ${exam.id}`}</span>
                                </p>
                                <p className="font-weight-bold">Fecha de creacion: <span className="font-weight-normal">{exam.created_at}</span></p>
                                <p className="font-weight-bold">Estatus: <span className="font-weight-normal">{exam.status}</span></p>
                                <button className="btn btn-primary" onClick={()=>{
                                  setState({
                                    ...state,
                                    exam_id: null
                                  })
                                }}>Cambiar</button>
                              </div>
                            </div>
                          ) :
                          (
                            <div class="card col-lg-4 border border-warning">
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
                                      {exam.created_at}
                                    </p>
                                  </div>
                                ))}
                                <button className="btn btn-primary mt-2" onClick={handleNewExam}>Nuevo examen</button>                
                              </div>
                            </div> 
                          ) : 
                          (
                            <div class="card col-lg-4 border border-warning">
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

        
      </div>
    </div>
  );

}

