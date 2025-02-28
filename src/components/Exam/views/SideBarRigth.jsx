export default function SideBarRigth({ state, handle: _handle }) {
  return (
    <div className="nav flex-column nav-tabs">
      <a
        className={!state.panel ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(0);
        }}
      >
        <i
          className={
            state.generales
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Generales
      </a>

      <a
        className={state.panel === 1 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(1);
        }}
      >
        <i
          className={
            state.interrogatorios
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Interrogatorio
      </a>

      <a
        className={state.panel === 2 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(2);
        }}
      >
        <i
          className={
            state.keraRet
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Keratometria
      </a>

      <a
        className={state.panel === 3 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(3);
        }}
      >
        <i
          className={
            state.diabetes
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Diabetes
      </a>

      <a
        className={state.panel === 4 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(4);
        }}
      >
        <i
          className={
            state.agudeza
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Agudeza
      </a>

      <a
        className={state.panel === 5 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(5);
        }}
      >
        <i
          className={
            state.diagnostico
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Diagnostico
      </a>

      <a
        className={state.panel === 6 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(6);
        }}
      >
        <i
          className={
            state.graduacion
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Graduación
      </a>

      <a
        className={state.panel === 7 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(7);
        }}
      >
        <i
          className={
            state.observaciones
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Observaciones
      </a>

      <a
        className={state.panel === 8 ? "nav-link text-bold active" : "nav-link"}
        href="#general"
        onClick={(e) => {
          e.preventDefault();
          _handle(8);
        }}
      >
        <i
          className={
            state.recomendaciones
              ? "fas fa-check-circle mr-1 text-success"
              : "fas fa-circle mr-1"
          }
        ></i>
        Recomendaciones
      </a>
    </div>
  );
}
