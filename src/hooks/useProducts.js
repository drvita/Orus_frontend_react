import {useState} from 'react';
import {api, setUrl} from '../utils/url';



export default function useProducts(){

    //Funciones
    const getProducts = (searchBy)=> {
        const url = setUrl('store', null, {search: searchBy})

        api(url)
        .then((data)=>{
            if(data){
                console.log(data.data);
                setState({
                    ...state,
                    productList:data.data,
                })
            }else{
                console.error('Error al obtener los productos');
            }
        })
    }


    const [state, setState] = useState({
        productList:[],
        getProducts,
    })

    return state;
}