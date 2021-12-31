import React from "react";

const ListContactComponent = (props) => {
  const {
    contacts = [],
    title,
    text,
    left = "5.9rem",
    showNew = false,
    meta,
    perPage = 10,
    handleSelected: _handleSelected,
    handleNew: _handleNew,
  } = props;
  //Actions
  const handleSelect = (e, contact) => {
    e.preventDefault();
    _handleSelected(contact);
  };
  const handleNew = (e) => {
    e.preventDefault();
    _handleNew();
  };

  return (
    <div
      className="position-absolute overflow-auto"
      style={{
        left: left,
        height: !showNew ? "12rem" : "0rem",
        zIndex: "10",
        width: "100%",
        maxWidth: "30rem",
      }}
    >
      <ul className="list-group">
        {contacts.length ? (
          <>
            {contacts.map((contact) => {
              if (contact.id === 2) {
                return (
                  <li
                    key={contact.id}
                    className="list-group-item text-capitalize"
                  >
                    <i className="fas fa-user mr-1 text-secondary"></i>
                    {contact.nombre}
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
                      onClick={(e) => handleSelect(e, contact)}
                    >
                      <i className="fas fa-user mr-1"></i>
                      {contact.nombre}
                    </a>
                  </li>
                );
              }
            })}
            {meta.total > perPage ? (
              <li className="list-group-item text-muted">
                <i className="fas fa-info-circle mr-1"></i>
                Existen mas registros, sea mas espesifico
              </li>
            ) : null}
          </>
        ) : !showNew && _handleNew ? (
          <li className="list-group-item">
            <a href="·create" onClick={(e) => handleNew(e)}>
              <i className="fas fa-info-circle mr-1 text-dark"></i>
              <label>El {title}:</label>
              <span className="text-uppercase text-dark font-weight-bold ml-1">
                {text}
              </span>
              , no existe.
              <span className="badge badge-dark ml-2">Registrar</span>
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default ListContactComponent;
