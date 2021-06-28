import React, { useState, useEffect } from "react";
import Pagination from "../layouts/pagination";

const ListInbox = (props) => {
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState("");

  const handleSearchErase = () => {
    setSearch("");
  };

  useEffect(() => {
    let toTimer = null;
    if (search.length > 2) {
      if (timer) clearTimeout(timer);
      toTimer = setTimeout(() => {
        props.handleSearch(search);
      }, 1000);
      setTimer(toTimer);
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className={"card card-" + props.color + " card-outline"}>
      <div className="card-header">
        <h3 className={"card-title text-" + props.color}>
          <i
            className={
              props.icon ? "mr-1 fas fa-" + props.icon : "mr-1 fas fa-user"
            }
          ></i>
          {props.title}
        </h3>
        <div className="card-tools">
          <div className="input-group input-group-sm position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar"
              value={search}
              onChange={(e) => {
                const { value } = e.target;
                setSearch(value);
              }}
              onKeyPress={(e) => {
                const { key } = e;
                if (key === "Enter") {
                  console.log("[DEBUG] press enter");
                }
              }}
            />
            <div
              className="position-absolute"
              style={{ top: 5, left: -20, color: "#ced4da" }}
            >
              <i className="fas fa-search"></i>
            </div>
            {search.length > 2 ? (
              <div className="input-group-append">
                <div className="btn btn-secondary" onClick={handleSearchErase}>
                  <i className="fas fa-window-close"></i>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-0 card-body">
        <div className="mailbox-controls">
          <div className="btn-group">
            {props.handleDeleteItem ? (
              <button
                type="button"
                className="btn btn-default btn-sm"
                title="Eliminar"
                disabled={props.itemSelected ? false : true}
                onClick={(e) => props.handleDeleteItem()}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            ) : null}

            {props.handleEditItem ? (
              <button
                type="button"
                className="btn btn-default btn-sm"
                title="Editar"
                disabled={props.itemSelected ? false : true}
                onClick={(e) => props.handleEditItem()}
              >
                <i className="fas fa-edit"></i>
              </button>
            ) : null}

            {props.handleSync ? (
              <button
                type="button"
                className="btn btn-default btn-sm"
                title="Recargar"
                onClick={(e) => props.handleSync()}
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            ) : null}
          </div>
          <div className="float-right">
            {props.meta ? (
              <Pagination
                meta={props.meta}
                color={props.color}
                handlePagination={props.handlePagination}
              />
            ) : null}
          </div>
        </div>
        <div className="table-responsive mailbox-messages">
          {props.children}
        </div>
      </div>
      {props.loading ? (
        <div className="overlay dark">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>
      ) : null}
    </div>
  );
};

export default ListInbox;
