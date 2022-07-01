/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import Easycontact from "./CardNewContact";
import Autocomplete from "./Autocomplete";

import useContact from "../../../hooks/useContact";

export default function ShowCardSearch(props) {
  const [state, setState] = useState({
    search: "",
    contacts: [],
    meta: {},
    new: false,
    newName: "",
    loading: false,
    timer: "",
  });
  const _contacts = useContact();
  const input = useRef();
  // Functions
  const handleSearch = () => {
    setState({
      ...state,
      timer: "",
      loading: true,
    });
    _contacts
      .getContacts({
        search: state.search,
        itemsPage: 10,
      })
      .then((res) => {
        if (res.data) {
          setState({
            ...state,
            contacts: res.data,
            meta: res.meta,
            loading: false,
          });
        } else {
          const messages = Object.values(res.errors);

          console.error("[Orus System] Message of server:", res.errors);
          window.Swal.fire({
            title: "Contactos",
            text: messages[0],
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });

          setState({
            ...state,
            contacts: [],
            meta: {},
            loading: false,
          });
        }
      });
  };

  useEffect(() => {
    let toTimer = null;
    if (state.search.length >= 3) {
      if (state.timer) clearTimeout(state.timer);
      toTimer = setTimeout(() => handleSearch(), 2000);
      setState({
        ...state,
        timer: toTimer,
        contacts: [],
        meta: {},
      });
    } else if (!state.search.length) {
      if (state.timer) clearTimeout(state.timer);
      setState({
        ...state,
        timer: null,
        contacts: [],
        meta: {},
        loading: false,
      });
    }
  }, [state.search]);

  return (
    <>
      <input
        type="text"
        className="form-control text-uppercase"
        defaultValue={state.search}
        onChange={({ target }) => {
          setState({
            ...state,
            search: target.value?.toLowerCase(),
          });
        }}
        disabled={state.loading}
        onKeyDown={({ key }) => {
          if (key === "Escape") {
            setState({
              ...state,
              contacts: [],
              search: "",
            });
            input.current.value = "";
          } else if (key === "Enter") {
            if (state.timer) clearTimeout(state.timer);
            handleSearch();
            setState({
              ...state,
              timer: null,
            });
          }
        }}
        ref={input}
      />

      {state.loading && (
        <div className="float-right px-4">
          <div className="spinner-border text-indigo"></div>
        </div>
      )}

      {state.new && (
        <Easycontact
          title={props.title}
          nameDefault={state.newName}
          handleCancel={(e) => {
            setState({
              ...state,
              new: false,
              newName: "",
            });
          }}
          handleResult={(contact) => {
            setState({
              ...state,
              new: false,
              newName: "",
            });
            props.handleSelectContact(contact);
          }}
        />
      )}

      {state.search.length > 2 && !state.loading && (
        <div className="w-100 d-block position-static">
          <Autocomplete
            contacts={state.contacts}
            text={state.search}
            meta={state.meta}
            title={props.title}
            left="6rem"
            maxWidth="28rem"
            handleNew={(e) => {
              setState({
                ...state,
                contacts: [],
                search: "",
                new: true,
                newName: state.search,
              });
              input.current.value = "";
            }}
            handleSelected={(contact) => {
              props.handleSelectContact(contact);

              setState({
                ...state,
                contacts: [],
                search: "",
              });
              input.current.value = "";
            }}
          />
        </div>
      )}
    </>
  );
}
