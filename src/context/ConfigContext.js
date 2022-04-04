import { createContext, useState, useEffect } from "react";
import {api} from "../utils/url";

export const ConfigContext = createContext(null);
const initialState = {
    data: [],
    meta: {},
};

export default function useConfig({children}){
    const [state, setstate] = useState(initialState);

    useEffect(() => {
        api("config?itemsPage=100", "GET").then((response) => {
            console.log("[DEBUG] configs", response);

            setstate({
                ...state,
                data: response.data,
                meta: response.meta
            });
        });
    }, []);

    
    return (
        <ConfigContext.Provider value={state}>
            {children}
        </ConfigContext.Provider>
    );
}
