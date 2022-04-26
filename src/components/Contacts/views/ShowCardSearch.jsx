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

  useEffect(() => {
    let toTimer = null;
    if (state.search.length > 5) {
      if (state.timer) clearTimeout(state.timer);
      toTimer = setTimeout(() => {
        // Buscaar
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
            setState({
              ...state,
              contacts: res.data,
              meta: res.meta,
              loading: false,
            });
          });
      }, 1000);
      setState({
        ...state,
        timer: toTimer,
      });
    } else if (!state.search.length) {
      if (state.timer) clearTimeout(state.timer);
      setState({
        ...state,
        timer: toTimer,
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
        className="form-control text-capitalize"
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
        />
      )}

      {state.search.length > 2 && !state.loading && (
        <div className="w-100 d-block position-static">
          <Autocomplete
            contacts={state.contacts}
            text={state.search}
            meta={state.meta}
            title={props.title}
            left="6.6rem"
            maxWidth="24rem"
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
