import moment from "moment";

const handleTypeInput = (key) => {
  if (
    key === "pc" ||
    key === "tablet" ||
    key === "movil" ||
    key === "lap" ||
    key === "pc_time" ||
    key === "tablet_time" ||
    key === "movil_time" ||
    key === "lap_time" ||
    key === "frontal" ||
    key === "occipital" ||
    key === "generality" ||
    key === "cefalea" ||
    key === "temporaod" ||
    key === "temporaoi" ||
    key === "c_frecuencia" ||
    key === "c_intensidad"
  ) {
    return "generales";
  }
  if (
    key === "interrogatorio" ||
    key === "coa" ||
    key === "aopp" ||
    key === "aopf"
  ) {
    return "interrogatorios";
  }
  if (
    key === "keratometriaod" ||
    key === "keratometriaoi" ||
    key === "rsod" ||
    key === "rsoi"
  ) {
    return "keraRet";
  }
  if (
    key === "d_time" ||
    key === "d_media" ||
    key === "d_test" ||
    key === "d_fclod" ||
    key === "d_fclod_time" ||
    key === "d_fcloi" ||
    key === "d_fcloi_time"
  ) {
    return "diabetes";
  }
  if (
    key === "cvod" ||
    key === "cvoi" ||
    key === "avslod" ||
    key === "avsloi" ||
    key === "avcgaod" ||
    key === "avcgaoi" ||
    key === "avfod" ||
    key === "avfoi" ||
    key === "avf2o"
  ) {
    return "agudeza";
  }
  if (
    key === "diagnostico" ||
    key === "presbicie" ||
    key === "piod" ||
    key === "pioi" ||
    key === "txoftalmico"
  ) {
    return "diagnostico";
  }
  if (
    key === "esferaod" ||
    key === "esferaoi" ||
    key === "cilindrod" ||
    key === "cilindroi" ||
    key === "ejeod" ||
    key === "ejeoi" ||
    key === "adiciond" ||
    key === "adicioni" ||
    key === "adicion_media_od" ||
    key === "adicion_media_oi" ||
    key === "dpod" ||
    key === "dpoi" ||
    key === "alturaod" ||
    key === "alturaoi" ||
    key === "lcmarca" ||
    key === "lcgod" ||
    key === "lcgoi"
  ) {
    return "graduacion";
  }
  if (key === "observaciones") {
    return "observaciones";
  }

  return null;
};
const handleCodeName = (category) => {
  let code = "";
  if (category.parent) {
    if (category.parent.parent) {
      code = category.parent.parent.meta.code;
      code += category.parent.meta.code;
      code += category.meta.code;
    } else {
      code = category.parent.meta.code;
      code += category.meta.code;
    }
  } else {
    code = category.meta.code;
  }

  return code;
};
const getCodeGrad = (category, esferaod, esferaoi, cilindrod, cilindroi) => {
  const code = Object.keys(category).length ? handleCodeName(category) : null;

  if (!code) return {};

  let gradod = "+000000",
    gradoi = "+000000";

  if (cilindrod || esferaod) {
    gradod = esferaod > 0 ? "+" : "";
    gradod +=
      esferaod.toFixed(2).toString().replace(".", "") +
      cilindrod.toFixed(2).toString().replace("-", "").replace(".", "");
  }
  if (cilindroi || esferaoi) {
    gradoi = esferaoi > 0 ? "+" : "";
    gradoi +=
      esferaoi.toFixed(2).toString().replace(".", "") +
      cilindroi.toFixed(2).toString().replace("-", "").replace(".", "");
  }

  return {
    code,
    od: gradod,
    oi: gradoi,
  };
};
//Quickly save exam with a button
const handleSaveExam = ({ _saveExam, contact }) => {
  const examToday = contact.examenes.filter(
    (exam) =>
      moment(exam.created_at).diff(moment(), "days") === 0 || !exam.estado
  );

  if (examToday.length) {
    window.Swal.fire({
      title: "Examenes",
      text: "Existe un examen activo o del dia",
      icon: "error",
    });
    console.error("[OrusSystem] Examenes activos:", examToday.length);
    return false;
  }

  //Confirmación de almacenamiento
  window.Swal.fire({
    title: "Almacenamiento",
    text: "¿Esta seguro de crear un nuevo examen?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Crear",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
  }).then(({ dismiss }) => {
    if (!dismiss) {
      _saveExam({
        id: 0,
        data: {
          edad: contact.edad,
          contact_id: contact.id,
        },
      });
    }
  });
};

const toExportActions = {
  handleTypeInput,
  handleCodeName,
  getCodeGrad,
  handleSaveExam,
};

export default toExportActions;
