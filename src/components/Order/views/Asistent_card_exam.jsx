/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CardShowExam from "../../Exam/views/CardExam";
import CardExamByUser from "../../Exam/views/CardExamsByUser";
import FormExamSmall from "../../Exam/views/FormExamSmall";

export default function CardExam({
  data,
  customer,
  editCustomer,
  disabled,
  handleSelect: _handleSelect,
  hanldeRemove: _hanldeRemove,
}) {
  const [state, setState] = useState({
    exams: [],
    edit: false,
  });

  useEffect(() => {
    setState({
      ...state,
      exams: customer.exams,
    });
  }, []);

  return (
    <div className="card col-lg-5 border border-success">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-notes-medical mr-1"></i>
          Examen
          {Boolean(Object.keys(data).length) && (
            <>
              Seleccionado <i className="ml-5 fas fa-check mr-1"></i>
            </>
          )}
        </h3>
      </div>
      <div className="card-body text-lg">
        {editCustomer ? (
          <p className="alert alert-warning">
            <i className="fas fa-info mr-2"></i>
            Es necesario completar los datos del paciente para continuar.
          </p>
        ) : state.edit ? (
          <FormExamSmall
            data={data}
            handleEdit={() => setState({ ...state, edit: !state.edit })}
          />
        ) : (
          <>
            {Object.keys(data).length ? (
              <CardShowExam
                data={data}
                disabled={disabled}
                handleRemove={_hanldeRemove}
                handleEdit={() => setState({ ...state, edit: !state.edit })}
              />
            ) : (
              <>
                <CardExamByUser
                  exams={state.exams}
                  customer_id={customer.id}
                  handleClick={_handleSelect}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
