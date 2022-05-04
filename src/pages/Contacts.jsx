import { useEffect, useState } from "react";

import { ContactContext } from "../context/ContactContext";
import ToolsBar from "../components/Contacts/ToolsBar";
import Inbox from "../components/Contacts/Inbox";
import Add from "../components/Contacts/Add";

const optionsDefault = {
  page: 1,
  orderby: "created_at",
  order: "desc",
  itemsPage: 25,
};

export default function ContactsComponent(props) {
  const [state, setState] = useState({
    options: optionsDefault,
    newOrEdit: null,
  });
  const { id } = props.match.params;

  useEffect(() => {
    setState({
      ...state,
      newOrEdit: id ? true : false,
    });
  }, [id]);

  return (
    <ContactContext.Provider value={{ ...state, set: setState }}>
      <div className="row">
        <ToolsBar
          newOrEdit={state.newOrEdit}
          handleNewOrEdit={() => setState({
            ...state,
            newOrEdit: !state.newOrEdit
          })
          }
        />
        {typeof state.newOrEdit === "boolean" ? (
          <div className="col-sm-12 col-md-8 col-lg-10">
            {state.newOrEdit ? (
              <Add
                {...props}
                handleNewOrEdit={() =>
                  setState({ ...state, newOrEdit: !state.newOrEdit })
                }
              />
            ) : (
              <Inbox />
            )}
          </div>
        ) : (
          <p>Loading component</p>
        )}
      </div>
    </ContactContext.Provider>
  );
}
