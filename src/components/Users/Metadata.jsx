import moment from "moment";

export default function MetadataComponent({ data }) {
  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h3 className="card-title text-primary">
          <i className="fas fa-database mr-2"></i>
          Metadata
        </h3>
      </div>
      <div className="card-body">
        {data?.session ? (
          <ul className="list-group">
            <li className="list-group-item">
              <h6>Datos del usuario</h6>
              <div className="row">
                <div className="col">
                  <span className="text-primary">Registrado</span>
                  <p>{moment(data.created_at).fromNow()}</p>
                </div>
                <div className="col">
                  <span className="text-primary">Ultima actualizacion</span>
                  <p>{moment(data.updated_at).fromNow()}</p>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <h6>Actividad</h6>
              <div className="row">
                <div className="col">
                  <span className="text-primary">IP</span>
                  <p>
                    {data.session?.ip_address
                      ? data.session.last_activity
                      : "--"}
                  </p>
                </div>
                <div className="col">
                  <span className="text-primary">Ultima actividad</span>
                  <p>
                    {data.session?.last_activity
                      ? moment(data.session.last_activity).fromNow()
                      : "--"}
                  </p>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <span className="text-primary">Navegador y OS</span>
              <p>
                {data.session?.user_agent
                  ? data.session.user_agent
                  : "--"}
              </p>
            </li>
            <li className="list-group-item">
              <span className="text-primary">Token</span>
              <p>
                {data.session?.user_data
                  ? data.session.user_data
                  : "--"}
              </p>
            </li>
          </ul>
        ) : (
          <p>Usuario no ha registrado actividad.</p>
        )}
      </div>
      {data.session && (
        <div className="card-footer text-right">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => {
              // close session when session is active
            }}
          >
            <i className="fas fa-sign-out-alt mr-1"></i>
            Cerrar session
          </button>
        </div>
      )}
    </div>
  );
}
