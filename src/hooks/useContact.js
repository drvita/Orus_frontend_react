import { useState, useEffect } from "react";
import {api, setUrl} from '../utils/url';


export default function useContact(){
    console.log("NAME TO SEARCH", nameSearch);

    // Funciones
    const getContact = () => {
        console
    }

    const getListContact = (contactFilters)=>{
        //contactFilter es un obj que se recibe desde la vista con los filtros
        const url = setUrl('contacts', null, contactFilters);
        console.log("Get Contacts custom hook----------", url);

        api(url)
        .then(({data, meta} = data)=>{
            if(data){
                console.log(data);
                console.log(meta);
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


    useEffect(()=>{
        const contactFilters ={
            search: '',
            itemsPage: 25,
            orderBy: 'id',
            order:'desc'
        };
        getListContac(contactFilters);
    },[])

    return state;
}
