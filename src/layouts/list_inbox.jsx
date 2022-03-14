import React, { useState, useEffect } from "react";
import Pagination from "../layouts/pagination";

const ListInbox = (props) => {
  //Const
  const { defaultSearch = "" } = props;
  //States
  const [search, setSearch] = useState(defaultSearch);
  const [timer, setTimer] = useState("");

  useEffect(() => {
    let toTimer = null;
    if (props.handleSearch) {
      if (search.length) {
        if (timer) clearTimeout(timer);
        toTimer = setTimeout(() => {
          props.handleSearch(search);
        }, 1000);
        setTimer(toTimer);
      } else {
        props.handleSearch("");
      }
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
          {props.handleSearch && (
            <div className="input-group input-group-sm position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar"
                defaultValue={search}
                onChange={({ target }) => {
                  const { value } = target;
                  setSearch(value);
                }}
                onKeyPress={(e) => {
                  const { key } = e;
                  if (key === "Enter") {
                    if (timer) clearTimeout(timer);
                    props.handleSearch(search);
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
                  <div
                    className="btn btn-secondary"
                    onClick={(e) => setSearch("")}
                  >
                    <i className="fas fa-window-close"></i>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div className="p-0 card-body">
        {props.handleDeleteItem ||
        props.handleEditItem ||
        props.handleStatus ||
        props.handleSync ||
        props.meta ||
        props.handleDownload ? (
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

              {props.handleStatus ? (
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  title="Estado"
                  disabled={props.itemSelected ? false : true}
                  onClick={(e) => props.handleStatus()}
                >
                  <i className="fas fa-check-circle"></i>
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

              {props.handlePrint ? (
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  title="Imprimir"
                  onClick={(e) => props.handlePrint()}
                >
                  <i className="fas fa-print"></i>
                </button>
              ) : null}

              {props.handleDownload ? (
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  title="Exportar"
                  onClick={(e) => props.handleDownload()}
                >
                  <i className="fas fa-file-csv"></i>
                </button>
              ) : null}
            </div>

            <div className="float-right">
              {props.meta && (
                <Pagination
                  meta={props.meta}
                  color={props.color}
                  handlePagination={props.handlePagination}
                />
              )}
            </div>
          </div>
        ) : null}

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
