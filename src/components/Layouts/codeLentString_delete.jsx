export default function codeLentString(string) {
  switch (string) {
    case "monofocales":
      return "MF";
    case "bifocales":
      return "BF";
    case "progresivo basico":
    case "progresivo-basico":
      return "PB";
    case "progresivo digital":
    case "progresivo-digital":
      return "PD";
    case "plastico":
      return "CR";
    case "policarbonato":
      return "PL";
    case "hi-index":
    case "hi index":
      return "HI";
    case "antirreflejantes":
      return "AR";
    case "photo":
      return "PH";
    case "ar & photo":
    case "antirreflejante-photo":
      return "ARPH";
    case "blanco":
      return "BL";
    case "polarizado":
      return "PO";
    case "bifocal invisible":
    case "bifocal-invisible":
      return "BI";
    case "monofocal drivesafe":
    case "monofocal-drivesafe":
    case "monofocal digital drivesafe":
    case "monofocal digital DriveSafe":
      return "MDSF";
    case "monofocal superb":
    case "monofocal-superb":
    case "monofocal digital superb":
      return "MDSU";
    case "monofocal individual":
    case "monofocal-individual":
    case "monofocal digital individual":
      return "MDIN";
    default:
      return "XX";
  }
}
