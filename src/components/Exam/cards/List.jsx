import ListExam from "../views/List";
import helper from "../helpers";
import { Contacts } from "../../../context/ContactContext";

export default function List(props) {
  const _contacts = Contacts();
  const { contact = {}, showBottons = true, showNew = true } = props,
    { exams = [] } = _contacts.contact;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-indigo text-bold">
          <i className="fas fa-notes-medical mr-1"></i>
          Examenes
        </h5>
        {exams.length ? (
          <ListExam
            allSelect={true}
            exams={exams}
            handleSelectedExam={(examSelect) => {
              console.log("[DEBUG] examSelect", examSelect);
            }}
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
      {!contact.deleted_at && showBottons ? (
        <div className="card-footer text-right">
          <div className="btn-group">
            {showNew ? (
              <button
                className="btn btn-secondary"
                onClick={(e) =>
                  helper.handleSaveExam(props.contact, 0, props._saveExam)
                }
              >
                Nuevo
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
