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

const toExportActions = {
  handleTypeInput,
  handleCodeName,
  getCodeGrad,
};

export default toExportActions;
