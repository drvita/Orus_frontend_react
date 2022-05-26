import { api, setUrl } from "../utils/url";

export default function useOrder(){

    const getListOrders = async (options)=> {
        const url = setUrl('orders', null, options);
        return await api(url);
    }

    const getOrder = async (orderID)=>{
        const url = setUrl('orders', orderID.id);
        console.log(url);
        return await api(url);
        //console.log("Id de la orden a obtener", orderID.id);
    }

    const saveOrder = ()=>{
        console.log("Hook save order excuted");
    }

    const deleteOrder = ()=>{

    }


    const setOrder = async ()=>{

    }


    const setOptions = ()=>{

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