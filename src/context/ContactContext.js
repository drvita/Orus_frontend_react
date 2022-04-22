/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext } from "react";
import { api, setUrl } from "../utils/url";

export const ContactContext = createContext(null);
export const Contacts = () => useContext(ContactContext);
export const optionsDefault = {
  page: 1,
  orderby: "created_at",
  order: "desc",
  itemsPage: 25,
};

export default function useContact({ children }) {
  // Functions
  const getContacts = (options) => {
      if (!options) options = optionsDefault;

      const url = setUrl("contacts", null, options);

      api(url, "GET").then((response) => {
        setstate({
          ...state,
          list: {
            data: response.data,
            meta: response.meta,
          },
        });
      });
    },
    setOptions = (state, newOptions) => {
      setstate({
        ...state,
        options: newOptions,
      });
    },
    getContact = async (id) => {
      if (!id) return false;

      const url = setUrl("contacts", id);

      return await api(url, "GET").then((response) => {
        setstate({
          ...state,
          contact: response.data,
        });

        return true;
      });
    };

  const [state, setstate] = useState({
    list: {
      data: [],
      meta: {},
    },
    contact: {},
    options: optionsDefault,
    setOptions,
    getContact,
  });

  useEffect(() => {
    console.log("[DEBUG] :: EFFCT ::", state.options);
    getContacts(state.options);
  }, [state.options]);

  return (
    <ContactContext.Provider value={state}>{children}</ContactContext.Provider>
  );
}
