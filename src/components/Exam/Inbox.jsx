/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

//Context
import { Exams } from "../../context/ExamContext";

//Components
import Inbox from "../../layouts/list_inbox";
import useExam from "../../hooks/useExam";

export default function InboxExams() {
  const context = Exams();
  const _exam = useExam();
  const history = useHistory();
  const [state, setState] = useState({
    list: [],
    meta: {},
    loading: false,
    examSelected: {},
  });

  // Functions
  const handleLoadExams = () => {
    setState({
      ...state,
      loading: true,
    });

    _exam.getExams(context.options).then((res) => {
      if (res.data) {
        setState({
          ...state,
          list: res.data,
          meta: res.meta,
          loading: false,
          examSelected: {},
        });
      }
    });
  };
  const handleStatus = (exam) => {
    if (exam?.id) {
      _exam
        .saveExam({
          id: exam.id,
          status: !exam.status,
          contact_id: exam.customer?.id,
        })
        .then((res) => {
          if (res.id) handleLoadExams();
          else if (res.hasOwnProperty("errors")) {
            const messages = Object.values(res.errors);

            console.log("[Orus System] Message of server:", res.errors);
            window.Swal.fire({
              title: "Consultorio",
              text: messages[0],
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    } else if (state.examSelected?.id) {
      _exam
        .saveExam({
          id: state.examSelected.id,
          status: !state.examSelected.status,
          contact_id: state.examSelected.customer?.id,
        })
        .then((res) => {
          if (res.id) handleLoadExams();
          else if (res.hasOwnProperty("errors")) {
            const messages = Object.values(res.errors);

            console.log("[Orus System] Message of server:", res.errors);
            window.Swal.fire({
              title: "Consultorio",
              text: messages[0],
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    } else {
      console.error(
        "[Orus System] When get id of exam:",
        exam,
        state.examSelected
      );
      window.Swal.fire({
        title: "Consultorio",
        text: "Lo sentimos no existe un examen seleccionado",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    handleLoadExams();
  }, [context.options]);

  return (
    <Inbox
      title="Lista de examenes"
      icon="notes-medical"
      color="info"
      loading={state.loading}
      meta={state.meta}
      itemSelected={state.examSelected?.id}
      handlePagination={(page) => {
        if (page) {
          context.set({
            ...context,
            options: {
              ...context.options,
              page,
            },
          });
        }
      }}
      handleSearch={(search) => {
        if (search) {
          context.set({
            ...context,
            options: {
              ...context.options,
              search,
              page: 1,
            },
          });
        } else if (context.options.search) {
          context.set({
            ...context,
            options: {
              ...context.options,
              search: "",
              page: 1,
            },
          });
        }
      }}
      handleDeleteItem={() => {
        if (state.examSelected?.id) {
          window.Swal.fire({
            title: "Consultorio",
            text: "¿Desea eliminar el examen?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              _exam.deleteExam(state.examSelected.id).then(() => {
                handleLoadExams();
              });
            } else {
              setState({
                ...state,
                examSelected: {},
              });
            }
          });
        } else {
          window.Swal.fire({
            title: "Error",
            text: "Lo sentimos no existe un examen seleccionado",
            icon: "error",
          });
        }
      }}
      handleEditItem={() => {
        if (state.examSelected?.id) {
          history.push(`consultorio/${state.examSelected.id}`);
        } else {
          window.Swal.fire({
            title: "Error",
            text: "Lo sentimos no existe un examen seleccionado",
            icon: "error",
          });
        }
      }}
      handleSync={handleLoadExams}
      handleStatus={handleStatus}
    >
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>ESF</th>
            <th>CIL</th>
            <th>EJE</th>
            <th>ADC</th>
            <th>MED</th>
            <th>DP</th>
            <th>ALT</th>
            <th>
              {context.options?.orderby === "created_at"
                ? "Registrado"
                : "Actualizado"}
            </th>
          </tr>
        </thead>
        <tbody>
          {state.list?.length ? (
            <>
              {state.list?.map((exam) => {
                return (
                  <tr key={exam.id}>
                    <td className="icheck-primary pl-2">
                      <input
                        type="checkbox"
                        className="form-check-input mt-4"
                        id={"exam_" + exam.id}
                        checked={
                          state.examSelected?.id === exam.id ? true : false
                        }
                        disabled={exam.estado || exam.orders?.length}
                        onChange={({ target }) => {
                          setState({
                            ...state,
                            examSelected: target.checked ? exam : "",
                          });
                        }}
                      />
                      <label
                        htmlFor={"exam_" + exam.id}
                        className="sr-only"
                      ></label>
                    </td>
                    <td className="mailbox-name text-capitalize text-truncate">
                      <a
                        href="#edit"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`consultorio/${exam.id}`);
                        }}
                      >
                        <span
                          className={
                            exam.status || exam.orders?.length
                              ? "text-muted"
                              : "text-dark text-bold"
                          }
                        >
                          <i className="fas fa-user text-sm mr-2"></i>
                          {exam.customer?.name.toLowerCase()}
                        </span>
                      </a>
                    </td>
                    <td
                      className="text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleStatus(exam)}
                    >
                      {exam.status ? (
                        <i
                          className="fas fa-clipboard-check text-muted"
                          title="Terminado"
                        ></i>
                      ) : (
                        <i
                          className="fas fa-clipboard text-info"
                          title="En proceso"
                        ></i>
                      )}
                    </td>
                    <td>
                      {exam.esferaod}/{exam.esferaoi}
                    </td>
                    <td>
                      {exam.cilindrod}/{exam.cilindroi}
                    </td>
                    <td>
                      {exam.ejeod}/{exam.ejeoi}
                    </td>
                    <td>
                      {exam.adiciond}/{exam.adicioni}
                    </td>
                    <td>
                      {exam.adicion_media_od}/{exam.adicion_media_oi}
                    </td>
                    <td>
                      {exam.dpod}/{exam.dpoi}
                    </td>
                    <td>
                      {exam.alturaod}/{exam.alturaoi}
                    </td>
                    <td>
                      {moment(
                        context.options?.orderby === "created_at"
                          ? exam.created_at
                          : exam.updated_at
                      ).fromNow()}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <th className="text-center text-muted" colSpan="12">
                No hay examenes registrados
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </Inbox>
  );
}
