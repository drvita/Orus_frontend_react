import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

//Context
import { AuthContext } from "../../context/AuthContext";
import { OrderContext } from "../../context/OderContext";

//Hooks
import useOrder from "../../hooks/useOrder";

//Components  
import LabOrder from "./views/labOrder";
import Bicelacion from "./views/bicelacionOrder";
import Items from "./views/listItemsOrder";
import ExamModal from "./ExamModal";
import ModalNota from "./ModalNota";
import Activitys from "../Activitys";

//Helper
import helper from "./helpers";

export default function EditOrderComponent(props){

  const [state, setState] = useState({
      id: 0,
      paciente: {},
      session: null,
      lab_id: 0,
      npedidolab: "",
      observaciones: "",
      ncaja: 0,
      items: [],
      exam: {},
      codes: {},
      status: 0,
      created: {},
      created_at: null,
      updated: {},
      updated_at: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalNota, setShowModalNota] =  useState(false);

  const {
    id,
    paciente,
    lab_id,
    npedidolab,
    ncaja,
    observaciones,
    items,
    exam = {},
    status,
    created_at,
  } = state;


  

  const idurl = props.match.params;
  const hookOrder = useOrder();
  const authContext = useContext(AuthContext);
  const role = authContext.auth.roles;
  const currentUser = authContext.auth;
  const history = useHistory();
  const orderContext = useContext(OrderContext);


  const { loading: LOADING } = props;

  const fNacimiento = new Date(paciente.f_nacimiento ?? "") < new Date() ? moment(paciente.f_nacimiento) : null;

  const telefonos = Object.values(paciente.phones ?? {}).filter((tel) => tel !== "");
  
  
  const handleClose = (e) => {
    setState({
      id: 0,
      paciente: {},
      contact_id:0,
      session: null,
      lab_id: 0,
      npedidolab: "",
      observaciones: "",
      ncaja: 0,
      nota:{},
      items: [],
      exam: {},
      codes: {},
      status: 0,
      created: {},
      created_at: null,
      updated: {},
      updated_at: null,
      sale:{},
      activitys: [],
    });

    orderContext.set({
      ...orderContext,
      panel:'inbox',
    });

    history.push("/pedidos");
  };

  const handleSave = () => {
    const { npedidolab, ncaja, status, lab_id, observaciones, items, contact_id } = state;
    const itemsToJson = items.map((item) => {
        return {
          ...item,
          cant: item.cantidad,
          price: item.precio,
        };
      });


    let data = {
      npedidolab,
      ncaja,
      status,
      observaciones,
      items: itemsToJson,
      branch_id: currentUser.branch.id,
      contact_id
    };


    if (lab_id) data.lab_id = lab_id;
    //Validity    
    if (status === 1 && !lab_id && toString(npedidolab).length) {
      window.Swal.fire(
        "Verificación",
        "Los campos de laboratorio estan vacios",
        "error"
      );
      return false;
    }
    if (status === 2 && !ncaja) {
      window.Swal.fire("Verificación", "El numero de caja esta vacio", "error");
      return false;
    }
    //Save
    hookOrder.saveOrder(data).then((data)=>{
      if(data){
      }else{
        console.error("Error al guardar la orden editada");
      }
    })
  };

  const handleDeleteOrder = () => {
    window.Swal.fire({
      title: '¿Estás seguro de eliminar la orden?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then(({dismiss})=>{
      if(!dismiss){
        hookOrder.deleteOrder(id);
        window.Swal.fire({
          icon: "success",
          title: "Orden eliminada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        orderContext.set({
          ...orderContext,
          panel: 'inbox',
        })

      }
    })
  };


  const handleChangeInput = (key, value) => {
    setState({
      ...state,
      [key]: value
    })
  };

  useEffect(()=>{
    hookOrder.getOrder(idurl).then((data)=>{
      if(data){
        let dataReceibed = data.data;
        setState({
          id: dataReceibed.id ?? 0,
          paciente: dataReceibed.paciente ?? {},
          session: dataReceibed.session ?? null,
          lab_id: dataReceibed.lab_id ?? 0,
          npedidolab: dataReceibed.npedidolab ?? "",
          observaciones: dataReceibed.observaciones ?? "",
          ncaja: dataReceibed.ncaja ?? 0,
          nota: dataReceibed.nota ?? {},
          items: dataReceibed.items ?? [],
          exam: dataReceibed.exam ?? {},
          codes: dataReceibed.codes ?? {},
          status: dataReceibed.status ?? 0,
          created: dataReceibed.created ?? {},
          created_at: dataReceibed.created_at ?? null,
          updated: dataReceibed.updated ?? {},
          updated_at: dataReceibed.updated_at ?? null,
          sale: dataReceibed.sale ?? {},
          contact_id: dataReceibed.paciente.id,
          activitys : dataReceibed.activity ?? [],
        })
      }else{
        console.error("Error al obtener los datos");
      }
    });
  },[id])// eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <>
      { state ? (
        <>
          <div className="card card-warning card-outline d-print-none">

            <div className="card-header">
              <h3 className="card-title w-100">
                <i className="mr-1 fas fa-clipboard-list"></i>
                Pedido
                <span className="ml-1 badge badge-pill badge-warning">
                  #{id}
                </span>
                <span className="float-right mailbox-read-time mt-1 text-dark">
                    Pedido registrado {moment(created_at).fromNow()}
                </span>
              </h3>
            </div>

            <div className="p-0 card-body d-flex p-3">

              <div className="pl-3 col-lg-6">
                {/* Nombre del paciente */}
                <h6 className="d-flex mb-2">
                  <i className="mr-2 fas fa-user"></i>
                  <span className="text-capitalize m-0 text-secondary">{paciente.name}</span>                
                </h6>
                {/* Email del paciente */}
                {paciente.email ? (
                  <h6 className="mb-2">
                    <i className="mr-2 fas fa-envelope"></i>
                    <span className="text-muted">{paciente.email}</span>
                  </h6>                  
                ):(
                  <h6 className="mb-2">
                    <i className="mr-2 fas fa-envelope"></i>
                    <span className="text-muted">Email no registrado</span>
                  </h6>                  
                )}
                {/* Teléfono del paciente */}
                  {telefonos.length ? (
                    <h6 className="mb-2">
                      <i className="mr-1 fas fa-phone"></i>
                      <span className="mx-1 text-muted">
                      {telefonos.map((tel, index) =>
                        index ? `, ${tel}` : `${tel}`
                      )}
                    </span>
                    </h6>                  
                  ):(
                    <h6 className="mb-2">
                       <i className="mr-1 fas fa-phone"></i>
                      <span className="text-muted">Telefonos no registrado</span>
                    </h6>                
                  )}

                  
                {/*Fecha de nacimiento del paciente*/}
                {role === "admin" ? (                    
                    <span className="mailbox-read-time">
                      Fecha de nacimiento:{" "}
                      {fNacimiento ? (
                        <>
                          {fNacimiento.format("LL")}
                          <label className="ml-1">
                            ({moment().diff(fNacimiento, "years")} años)
                          </label>
                        </>
                      ) : (
                        "NO REGISTRADO"
                      )}
                    </span>
                  ) : null}
              </div>

              <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">

                <div className="w-75 d-flex flex-column justify-content-center align-items-center">
                  <h6 className="w-100 d-block font-weight-bold text-center">Acciones</h6>            
                  <div className="btn-group">  
                  {state.nota && !state.nota.id ? (
                        <button
                          type="button"
                          className="btn btn-default btn-sm"
                          title="Eliminar"
                          onClick={handleDeleteOrder}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      ) : null}

                      {paciente.telefonos && paciente.telefonos.t_movil ? (
                        <a
                          href={
                            "https://wa.me/52" +
                            paciente.telefonos.t_movil.replace(" ", "")
                          }
                          className="btn btn-default btn-sm"
                          title="Abrir WhatsApp"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-mobile-alt"></i>
                        </a>
                      ) : null}


                      {paciente.email && (
                        <a
                          href={"mailto:" + paciente.email}
                          className="btn btn-default btn-sm"
                          title="Enviar e-mail"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-at"></i>
                        </a>
                      )}
                  </div>
                </div>


                <div className="w-75 d-flex flex-column justify-content-center align-items-center">                      
                  <div className="mt-3 ">
                    <button className="btn btn-info mr-2" onClick={() => setShowModal(true)} disabled = {Object.keys(exam).length ? false : true}>
                      {Object.keys(exam).length ? "Ver examen" : "Sin examen asignado"}                      
                      <i className="fas fa-eye ml-2"></i>
                    </button>  
                    <button className="btn btn-primary" onClick={() => setShowModalNota(true)}>
                      Ver Nota
                      <i className="fas fa-money-bill ml-2"></i>
                    </button>  
                  </div>                  
                </div>                
              </div>
            </div>   
          </div>



          <div className="row mt-4 mb-2">
            <div className="col-lg-4 col-md-6 col-sm-12 d-print-none">              
              {/* ------------------SELECCION DE ESTATUS ------------------ */}
              <h6 className="w-100 d-block font-weight-bold">Estado</h6>
              <div className="card mt-2">
                <div className="btn-group-vertical">
                  {helper.getStatusType.map((type, index) => (
                    <button
                      key={index}
                      type="button"
                      className={ status === index ? "btn btn-primary btn-sm text-capitalize text-bold" : "btn btn-default btn-sm text-capitalize"}
                      onClick={(e) => {
                        setState({
                          ...state,
                          status: index,
                        });
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {LOADING ? (
                  <div className="overlay dark">
                    <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                  </div>
                ) : null}
              </div>
            </div>


            {/*------------------ COMPONENTE DE PEDIDO ------------------*/}
            <div className="col">

             { <div className="card h-100 m-0">

                <div className="card-header d-print-none">
                  <h5 className="card-title w-100 d-block mb-2 text-capitalize text-bold">
                    <i className="fas fa-shield-alt mr-1"></i>
                    {helper.handleStatusString(status)}
                  </h5>
                </div>

                <div className="card-body p-0">
                  <div className="p-0 mailbox-read-message m-0">


                    {status === 0 ? (
                      <Items
                      items={items}                                                                                   
                    />                 
                    ) : null}


                    {status === 1 ? (
                      <LabOrder
                        lab_id={lab_id}
                        npedidolab={npedidolab}
                        status={status}
                        handleChange={handleChangeInput}
                      />
                    ) : null}


                    {status === 2 ? (
                      <Bicelacion
                        ncaja={ncaja}
                        observaciones={observaciones}
                        status={status}
                        handleChange={handleChangeInput}
                      />
                    ) : null}


                    {status >= 3 ? (
                      <div className="px-2">
                        <div className="my-2 border rounded card border-warning d-print-none">
                          <div className="card-body">
                            <h5 className="card-title">
                              Estado de la entrega
                            </h5>
                            <div className="ml-1 icheck-success d-inline">
                              <input
                                type="checkbox"
                                checked={status === 3 ? false : true}
                                id="checkboxSuccess1"
                                onChange={(e) =>
                                  handleChangeInput(
                                    "status",
                                    status === 3 ? 4 : 3
                                  )
                                }
                              />
                              <label htmlFor="checkboxSuccess1"></label>
                            </div>
                          </div>
                        </div>                  
                      </div>
                    ) : null}


                  </div>
                </div>

                {LOADING ? (
                  <div className="overlay dark d-print-none">
                    <i className="fas fa-2x fa-sync-alt fa-spin"></i>
                  </div>
                ) : null}
              </div>}              
            </div>
          </div>

          {/* ------------------ BOTONES INFERIORES ------------------ */}

          <div className="btn-group col-lg-12 d-flex justify-content-end p-0">             

            <div className="mt-3">
              <button className="btn btn-secondary mr-2"  onClick={(e) => handleClose(e)}>
                Cerrar
                <i className="mr-1 fas fa-ban ml-2"></i>
              </button>

              <button className="btn btn-warning"  onClick={handleSave}>
                Guardar
                <i className="mr-1 fas fa-save ml-2"></i>
              </button>
            </div>

          </div>

          {/* MODAL VALIDATION EXAM */}
          {showModal ? (
            <ExamModal
              handleClose = {()=> setShowModal(false)}          
              exam = {state.exam}              
            />
          ): null}


           {/* MODAL VALIDATION NOTA*/}
          {showModalNota ? (
            <ModalNota
              handleClose={()=>setShowModalNota(false)}
              sale = {state.sale}
            />          
          ):null}

        </>
      ) : null}

      <Activitys
        data = {state.activitys ?? []}
      />

    </>
  );
}






















































