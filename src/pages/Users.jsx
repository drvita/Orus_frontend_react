/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

//Context
import { UserContext } from "../context/UserContext";

//Components
import FiltersToolbar from "../components/Users/views/FiltersToolbar";
import Inbox from "../components/Users/views/Inbox";
import Add from "../components/Users/add";

const optionsDefault = {
  page: 1,
  orderby: "created_at",
  order: "desc",
  itemsPage: 25,
  search: "",
};

export default function UsersComponent(props) {
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
    <UserContext.Provider value={{ ...state, set: setState }}>
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-lg-2">
          <FiltersToolbar
            newOrEdit={state.newOrEdit}
            handleNewOrEdit={() =>
              setState({
                ...state,
                newOrEdit: !state.newOrEdit,
              })
            }
          />
        </div>

        <div className="col-lg-10">
          {typeof state.newOrEdit === "boolean" ? (
            <div className="col-sm-10 col-md-12 col-lg-12">
              {state.newOrEdit === true ? (
                <Add
                  {...props}
                  handleNewOrEdit={() =>
                    setState({
                      ...state,
                      newOrEdit: !state.newOrEdit,
                    })
                  }
                />
              ) : state.newOrEdit === false ? (
                <Inbox />
              ) : null}
            </div>
          ) : (
            <p>Loading component</p>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
}
