import { useState } from'react';
import{ api, setUrl } from '../utils/url';

export default function useSales(ctx){

    //Functions
    const getSaleList = async () => {
        const salesFilters = {
            orderBy:'created_at',
            order:'desc',
            itemsPage: 25
        }
        const url = setUrl('sales', null, salesFilters);

        return await api(url)
    };

    const getSaleById = async (name)=> {
        const saleFilter = {
            orderBy:'created_at',
            order:'desc',
            itemsPage: 25, 
            search: name,
        }
        const url = setUrl('sales', null, saleFilter)
        return await api(url)
    }


    const saveSale = async (sale) => {
        sale.payments.forEach(payment => {
          if(typeof payment.id === "string"){
            payment.id = 0
          }
        });
        const data = {
          ...sale,
        }
        delete data.customer

        try {
          const { id } = data,
            url = setUrl("sales", id),
            method = id ? "PUT" : "POST"
            return await api(url, method, data)
        } catch (e) {
          console.error(
            "[Orus System] Error in saga/sales handledSaveSale", e.message
          );
        }
      };
  



    return{
        getSaleList,
        getSaleById,
        saveSale,
    };

}

