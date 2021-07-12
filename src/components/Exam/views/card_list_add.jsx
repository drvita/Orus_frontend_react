import React from "react";
import { connect } from "react-redux";
//Components
import ListExam from "./listExamsCustomer";
import helper from "../helpers";
//Actions
import { examActions } from "../../../redux/exam/.";

const CardListExamsComponent = (props) => {
  const { contact = {}, handeleChangePage: _handeleChangePage } = props,
    { examenes = [] } = contact;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-indigo text-bold">
          <i className="fas fa-notes-medical mr-1"></i>
          Examenes
        </h5>
        {examenes.length ? (
          <ListExam
            allSelect={true}
            exams={examenes}
            handleSelectedExam={_handeleChangePage}
          />
        ) : (
          <div className="alert alert-info mt-5">
            <h5>
              <i className="fas fa-info-circle mr-1"></i>
              Aun no hay examenes para este contacto
            </h5>
          </div>
        )}
      </div>
      {!contact.deleted_at ? (
        <div className="card-footer text-right">
          <button
            className="btn btn-secondary"
            onClick={(e) => helper.handleSaveExam(props)}
          >
            Nuevo
          </button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ contact, exam }) => {
    return {
      msg_exams: exam.messages,
      contact: contact.contact,
    };
  },
  mapActionsToProps = {
    _saveExam: examActions.saveExam,
    _setMsgExam: examActions.setMessagesExam,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CardListExamsComponent);
