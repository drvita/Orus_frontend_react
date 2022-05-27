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
    }

    const saveOrder = async (data)=>{
        console.log("Data recibida en la funcion:", data);
        const method = data.id ? 'PUT' : 'POST';
        const url = setUrl('orders');
        console.log(url, " -- ", method);
        //return await api(url, method, data);
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
