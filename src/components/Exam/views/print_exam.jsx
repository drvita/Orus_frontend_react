import moment from "moment";
import Graduacion from "./graduacionExam";
import { useSelector } from "react-redux";

export default function PrintExamComponent(props) {
  const {
    esferaod,
    esferaoi,
    cilindrod,
    cilindroi,
    ejeod,
    ejeoi,
    adiciond,
    adicioni,
    adicion_media_od,
    adicion_media_oi,
    dpod,
    dpoi,
    alturaod,
    alturaoi,
    diagnostico,
    presbicie,
    paciente,
  } = props;
  const { list } = useSelector((state) => state.config);
  // bg-white mt-5 p-5
  // d-none d-print-block fixed-top

  console.log("[DEBUG] ", list);

  return (
    <div className="d-none d-print-block fixed-top">
      <div className="row">
        <div className="col-2">
          <img
            src="/img/logo_430.jpg"
            className="img-thumbnail rounded"
            width="120px"
            alt="logo"
          />
        </div>
        <div className="col">
          <h1 className="text-center display-3">Óptica Madero</h1>
          <div className="row">
            {list.map((sucursal) => (
              <div className="col" key={sucursal.id}>
                <h5 className="text-capitalize">{sucursal.values.name}</h5>
                <label className="text-capitalize mx-2">
                  {sucursal.values.address}
                </label>
                <span>TEL: {sucursal.values.phone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col text-left">
          <label className="mr-2">Paciente</label>
          <span className="text-uppercase">{paciente.nombre}</span>
        </div>
        <div className="col">
          <div className="text-right">{moment().format("LLL")}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Graduacion
            esferaod={esferaod ?? ""}
            esferaoi={esferaoi ?? ""}
            cilindrod={cilindrod ?? ""}
            cilindroi={cilindroi ?? ""}
            ejeod={ejeod ?? ""}
            ejeoi={ejeoi ?? ""}
            adiciond={adiciond ?? ""}
            adicioni={adicioni ?? ""}
            adicion_media_od={adicion_media_od ?? ""}
            adicion_media_oi={adicion_media_oi ?? ""}
            dpod={dpod ?? ""}
            dpoi={dpoi ?? ""}
            alturaod={alturaod ?? ""}
            alturaoi={alturaoi ?? ""}
            showContactGlasses={false}
          />
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-6 left">
          <label className="mr-2">Diagnostico:</label>
          {diagnostico}
        </div>
        <div className="col-3 text-right">
          <label className="mr-2">Presbicie:</label>
          {presbicie ? "SI" : "NO"}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card-text text-center mt-4 pt-4">
            <h4>Julio Cárdenas Martinez</h4>
            Optometrista contactologo
            <br />
            UAG
            <br />
            CED PROF. 2413419
          </div>
        </div>
      </div>
    </div>
  );
}
