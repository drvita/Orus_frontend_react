export default function Autocomplete(props) {
  return (
    <div
      className="position-absolute overflow-auto"
      style={{
        left: props.left ?? "0rem",
        height: !props.showNew ? "12rem" : "0rem",
        zIndex: "10",
        width: "100%",
        maxWidth: props.maxWidth ?? "30rem",
      }}
    >
      <ul className="list-group">
        {props.contacts.length ? (
          <>
            {props.contacts.map((contact) => {
              if (contact.id === 2) {
                return (
                  <li
                    key={contact.id}
                    className="list-group-item text-capitalize"
                  >
                    <i className="fas fa-user mr-1 text-secondary"></i>
                    {contact.name.toLowerCase()}
                  </li>
                );
              } else {
                return (
                  <li
                    key={contact.id}
                    className="list-group-item text-capitalize"
                  >
                    <a
                      href="#selecte"
                      className="text-indigo"
                      onClick={(e) => {
                        e.preventDefault();
                        props.handleSelected(contact);
                      }}
                    >
                      <i className="fas fa-user mr-1"></i>
                      {contact.name.toLowerCase()}
                    </a>
                  </li>
                );
              }
            })}
            {props.meta?.total > props.meta?.per_page ? (
              <li className="list-group-item text-muted">
                <i className="fas fa-info-circle mr-1"></i>
                Existen mas registros, sea mas espesifico
              </li>
            ) : null}
          </>
        ) : props.meta?.total === 0 && props.handleNew ? (
          <li className="list-group-item">
            <a
              href="·create"
              onClick={(e) => {
                e.preventDefault();
                props.handleNew();
              }}
            >
              <i className="fas fa-info-circle mr-1 text-dark"></i>
              <label>El {props.title}:</label>
              <span className="text-uppercase text-dark font-weight-bold ml-1">
                {props.text}
              </span>
              , no existe.
              <span className="badge badge-dark ml-2">Registrar</span>
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
