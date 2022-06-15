/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import ToolBar from "../components/Exam/ToolBar";
import Inbox from "../components/Exam/Inbox";
import Add from "../components/Exam/Add";

import { ExamContext } from "../context/ExamContext";

const optionsDefault = {
  page: 1,
  orderby: "created_at",
  order: "desc",
  search: "",
  status: "",
  itemsPage: 25,
  date: "",
  branch: "all",
};

export default function Exams(props) {
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
    <ExamContext.Provider value={{ ...state, set: setState }}>
      <div className="row mb-5">
        <ToolBar
          newOrEdit={state.newOrEdit}
          handleNewOrEdit={() =>
            setState({ ...state, newOrEdit: !state?.newOrEdit })
          }
        />
        {typeof state.newOrEdit === "boolean" ? (
          <div className="col-sm-12 col-md-10">
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
    </ExamContext.Provider>
  );
}
