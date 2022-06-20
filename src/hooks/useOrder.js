import { api, setUrl } from "../utils/url";

export default function useOrder(){

    const getListOrders = async (options)=> {
        const url = setUrl('orders', null, options);
        return await api(url);
    }

    const getOrder = async (orderID)=>{
        const url = setUrl('orders', orderID.id);
        return await api(url);
    }

    const saveOrder = async (data)=>{
        const method = data.id ? 'PUT' : 'POST';
        if(data.status === 2 && !data.bi_details.length){
            delete data.bi_details;
        }    
        const url = setUrl('orders', data.id);
        delete data.id;
        return await api(url, method, data);
    }
    
    const deleteOrder = async (id)=>{
        const method = "DELETE";
        const url = setUrl('orders', id);
        return await api(url, method);
    }
    
    return{
        getListOrders,
        getOrder,
        deleteOrder,
        saveOrder,
    }

}
