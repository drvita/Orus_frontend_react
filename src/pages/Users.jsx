import { useEffect, useState } from "react";

//Context
import { UserConext, UserContext } from '../context/UserContext';

//Components
import FiltersToolbar from "../components/Users/views/FiltersToolbar";
import Inbox from '../components/Users/views/Inbox';
import EditAndNewUser from '../components/Users/add';

export default function UsersComponent(){

    const optionsDefault = {
        page: 1,
        orderby: "created_at",
        order: "desc",
        itemsPage: 10,
      };

      const [state, setState] = useState({
          options: optionsDefault,
          panel: 'inbox',
          newOrEdit: null,
      });

    return(
        <UserContext.Provider value={{...state, set: setState}}>
            <div className="row">

                <div className="col-lg-2">
                    <FiltersToolbar/>
                </div>
                
                <div className="col-lg-10">
                    {state.panel === "inbox" && <Inbox />}
                    {state.panel === "editAndNewUser" && <EditAndNewUser />}
                </div>

            </div>
        </UserContext.Provider>
    )
}





