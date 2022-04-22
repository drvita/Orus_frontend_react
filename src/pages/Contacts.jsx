/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import ContactContext from "../context/ContactContext";
import ToolsBar from "../components/Contacts/ToolsBar";
import Inbox from "../components/Contacts/Inbox";
import Add from "../components/Contacts/Add";

export default function ContactsComponent(props) {
  const [state, setState] = useState({
    newOrEdit: false,
  });

  useEffect(() => {
    const { id } = props.match.params;
    console.log("[DEBUG] Page contacts:", id);

    if (id) {
      setState({
        newOrEdit: true,
      });
    }
  }, []);

  return (
    <ContactContext>
      <div className="row">
        <ToolsBar
          newOrEdit={state.newOrEdit}
          handleNewOrEdit={() => setState({ newOrEdit: !state.newOrEdit })}
        />
        <div className="col-sm-12 col-md-10">
          {state.newOrEdit ? (
            <Add
              {...props}
              handleNewOrEdit={() => setState({ newOrEdit: !state.newOrEdit })}
            />
          ) : (
            <Inbox
              handleNewOrEdit={() => setState({ newOrEdit: !state.newOrEdit })}
            />
          )}
        </div>
      </div>
    </ContactContext>
  );
}
