import { useState, useState } from'react';
import{ api, url } from '../utils/url';

export default function useSales(){

    const [state, setState] = useState({
        //Aqui guarda la lista de ventas o la venta individual//
        saleList:[],
        sale: {},
        
    });

    const getSaleList = ()=>{
        const saleFilters = {
            orderBy=created_at&
            order="desc",
            itemsPage=25
        }
        const url = setUrl('sales', null, contactFilters);
        return state;
    };

    const getaSaleById = ()=>{
        return state;
    }

}

