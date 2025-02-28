import moment from "moment";

import useExam from "../../../hooks/useExam";

export default function CardExamByUser({
  exams,
  customer_id,
  handleClick: _handleClick,
}) {
  const examHook = useExam();
  const handleCreateNewExam = () => {
    let dataNewExam = {
      contact_id: customer_id,
    };

    examHook.saveExam(dataNewExam).then((exam) => {
      if (exam) {
        _handleClick(exam);
        window.Swal.fire({
          icon: "success",
          title: "Examen Creado correctamente",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        window.Swal.fire({
          icon: "error",
          title: "Error al crear el examen",
          showConfirmButton: true,
        });
      }
    });
  };

  return (
    <>
      <p className="text-secondary text-md">
        *Seleciona un examen o crea uno nuevo para continuar
      </p>
      {exams.map((exam) => (
        <div
          className="border-bottom mb-1 cursor-pointer text-lg"
          key={exam.id}
          onClick={() => _handleClick(exam)}
        >
          <p className="card-text">
            <span className="badge badge-warning mr-3 mb-2">{`# ${exam.id}`}</span>
            {moment(exam.created_at).fromNow()}
            <span className="badge badge-dark ml-3">
              {exam.status ? "Completo" : "En proceso"}
            </span>
          </p>
        </div>
      ))}
      <button
        className="btn btn-primary mt-2 float-right"
        onClick={handleCreateNewExam}
      >
        <i className="fas fa-plus mr-2"></i>
        Nuevo
      </button>
    </>
  );
}
