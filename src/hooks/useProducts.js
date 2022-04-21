import {useState} from 'react';
import {api, setUrl} from '../utils/url';



export default function useProducts(){

    //Funciones
    const getProducts = (searchBy)=> {
        const url = setUrl('store', null, {search: searchBy})

        api(url)
        .then((data)=>{
            if(data.data.length !== 0){
                setState({
                    ...state,
                    productList:data.data,
                })
            }else{
                window.Swal.fire(
                    "Producto no encontrado",
                    "Verifica el nombre del producto",
                    "warning"
                  );
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