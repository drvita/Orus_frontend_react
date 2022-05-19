import {api, setUrl} from '../utils/url';



export default function useProducts(){
    
    //Funciones
    const getProducts = async (searchBy)=> {
        const url = setUrl('store', null, {search: searchBy});
        return await api(url);
    }


    const getProductById = async (id)=>{
        const url = setUrl('store', id);
        console.log(url);
        return await api(url);
    }


    const getProductByCode = async(code, id) =>{
        const url = setUrl('store', null, {code, id})
        console.log(url);
        return await api(url);
    }


    const saveProduct = async(data)=>{
        console.log("Data a guardar", data);
        const {id} = data;
        const url = setUrl('store');

        if(id){
            //PUT
            return await api(url, 'PUT', data);
        }else{
            return await api(url, 'POST', data);
        }
    }

    return {
        getProducts, 
        getProductById,
        getProductByCode,
        saveProduct,
    };
}
