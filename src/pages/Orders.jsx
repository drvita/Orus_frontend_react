/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { OrderContext } from "../context/OderContext";

//Components
import Inbox from "../components/Order/views/inbox";
import Asistent from "../components/Order/asistent";
import AddOrder from "../components/Order/editOrder";
import Toolbar from "../components//Order/Toolbar.jsx";

const initialOptions = {
  page: 1,
  orderby: "created_at",
  order: "desc",
  itemsPage: 25,
  status: 0,
  search: "",
};

export default function IndexOrderComponent(props) {
  const [state, setState] = useState({
    panel: null,
    options: initialOptions,
    order: {},
  });

  const { id } = props.match.params;

  useEffect(() => {
    setState({
      ...state,
      panel: id ? "edit" : "inbox",
    });
  }, [id]);

  return (
    <OrderContext.Provider value={{ ...state, set: setState }}>
      <div className="row">
        <div className="col-sm-12 col-md-2">
          <Toolbar />
        </div>
        <div className="col-sm-12 col-md-10">
          {state.panel === "inbox" && <Inbox />}
          {state.panel === "newOrder" && <Asistent {...props} />}
          {state.panel === "edit" && <AddOrder {...props}></AddOrder>}
        </div>
      </div>
    </OrderContext.Provider>
  );
}
