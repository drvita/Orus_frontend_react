import ListExam from "../views/List";

export default function List({ showBottons = false, exams = [] }) {
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
      {showBottons && (
        <div className="card-footer text-right">
          <div className="btn-group">
            <button className="btn btn-secondary">Nuevo</button>
          </div>
        </div>
      )}
    </div>
  );
}
