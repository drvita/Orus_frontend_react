import React, { Component, Fragment, useState, useEffect, useContext } from "react";

//Context
import { OrderContext } from "../context/OderContext";

//Components
import Inbox from '../components/Order/views/inbox';
import Pending from '../components/Order/views/inbox';
import Asistent from '../components/Order/asistent';
import AddOrder from '../components/Order/asistent';
import Chat from '../components/Order/asistent';
import Toolbar from '../components//Order/Toolbar.jsx';

const initialOptions = {
    page: 1,
    orderby: "created_at",
    order: "desc",
    itemsPage: 10,
    status: 0,
    search: "",
};


export default function IndexOrderComponent(props){

    const [state, setState] = useState({
        panel: "inbox",
        options: initialOptions,
        order:{}
    });

    const {id} = props.match.params;

    useEffect(()=>{
        setState({
            ...state,
            panel: id ? 'edit' : 'inbox',
        })
    },[id])

    return(
        <OrderContext.Provider value={{...state, set: setState}}>
            <div className="row">
                <div className="col-sm-12 col-md-2">
                    <Toolbar />
                </div>

                <div className="col-sm-12 col-md-10">
                    {state.panel === "inbox" && <Inbox />}
                    {state.panel === "newOrder" && <AddOrder {...props} />}                   
                    {state.panel === "reports" && <p>Reportes</p>}
                    {/* {state.panel === "pending" && <p>Pendientes</p>} */}
                    {/* {state.panel === "pending" && <Pending></Pending>} */}
                    {/* {state.panel === "pending" && <Pending></Pending>} */}
                    {/* {state.panel === "reports" && <Inventory></Inventory>} */}
                </div>
      </div>
        </OrderContext.Provider>
    );
}
