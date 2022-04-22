import { useState } from'react';
import{ api, setUrl } from '../utils/url';

export default function useSales(){

    //Functions
    const getSaleList = ()=> {
        const salesFilters = {
            orderBy:'created_at',
            order:'desc',
            itemsPage: 25
        }

        const url = setUrl('sales', null, salesFilters);
        
        api(url)
        .then((data)=>{
            if(data){
                setState({
                    ...state,
                    saleList:data.data,
                })
            }
        })
    };

    const getSaleById = (name)=> {
        const saleFilter = {
            orderBy:'created_at',
            order:'desc',
            itemsPage: 25, 
            search: name,
        }

        const url = setUrl('sales', null, saleFilter)
       
        api(url)
        .then((data)=>{
            if(data){
                setState({
                    ...state,
                    sale:data.data
                })
            }
        })
    }

    //Funcion para guardar una venta//

    //State
    const [state, setState] = useState({
        saleList:[],
        sale: {},
        getSaleList,
        getSaleById,
    });


    return state;

}

