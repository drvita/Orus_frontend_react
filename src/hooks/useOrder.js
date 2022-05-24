import { api, setUrl } from "../utils/url";

export default function useOrder(){

    const getListOrders = async (options)=> {
        const url = setUrl('orders', null, options);
        return await api(url);
    }

    const getOrder = async ()=>{

    }


    //Set Id on Context
    const setOrder = async ()=>{

    }

    //Set options to get list on context
    const setOptions = ()=>{

    }

    const deleteOrder = ()=>{

    }

    const saveOrder = ()=>{

    }


    return{
        getListOrders,
        getOrder,
        setOrder,
        setOptions,
        deleteOrder,
        saveOrder,
    }

}