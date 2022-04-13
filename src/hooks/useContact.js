import { useState } from "react";
import {api, setUrl} from '../utils/url';


export default function useContact(){

    // Funciones
    const getContact = () => {
        //TODO: Funcion para obtener un solo cliente//
        console.log("Funcion GetContact");
    }

    const getListContact = (contactFilters)=>{
        const url = setUrl('contacts', null, contactFilters);
        api(url)
        .then(({data, meta} = data)=>{
            if(data){
                setState({
                    ...state,
                    listContact: data,
                    metaList:meta,
                })                               
            }else{
                console.error("Error al obtener la lista de contactos");
            }
        })
    }

    const [state, setState] = useState({
        listContact:[],
        metaList:{},
        getContact,
        getListContact,
    });

    return state;
}
