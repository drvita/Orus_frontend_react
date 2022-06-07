import Exam from '../Exam/views/examShort';

export default function ExamModal({ handleClose: _close, exam }) {
  return (
      <div className="modal d-block">
      <div className="modal-dialog modal-lg" role="document">

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Examen</h5>
            <button type="button" className="close" onClick={() => _close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>


          <div className="modal-body p-2">

            <div className="row mt-4 d-print-none">
            {exam && exam.id ? (
              <div className="col pt-6">                
                <div className="card">
                  <div className="card-body">
                    <div className="p-0 mailbox-read-message">
                      <Exam id={exam.id} examEdit={false} exam={exam} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* <div className={`col-${exam && exam.id ? 3 : 12} pt-6`}>
              <h6 className="w-100 d-block">Meta data</h6>
              <Dashboard
                created_at={created_at ?? ""}
                created={created ? created.name : ""}
                updated={updated ? updated.name : ""}
                updated_at={updated_at ?? ""}
              />
            </div> */}

            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => _close()}
            >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>

          </div>
        </div>
      </div>
    </div> 
  );
};
