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

const changeStatus = (e) => {
  const { checked } = e.target;
  this.handleChangeInput("estado", checked);
};

const toExportActions = {
  handleTypeInput,
  changeStatus,
};

export default toExportActions;
