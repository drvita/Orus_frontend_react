import{ api, setUrl } from '../utils/url';

export default function useSales(ctx){

    //Functions
    const getSaleList = async (search) => {
        const salesFilters = {
            orderBy:'created_at',
            order:'desc',
            itemsPage: 100,            
        }
        if(search){
          salesFilters.search = search;
        }

        const url = setUrl('sales', null, salesFilters);
        return await api(url);
    };

    const getSaleById = async (id)=> {
        const url = setUrl('sales', id);        
        return await api(url)
    }


    const saveSale = async (sale) => {

        sale.payments.forEach(payment => {
          if(typeof payment.id === "string"){
            payment.id = 0;
          }
        });

        const data = {
          ...sale,
        }

        delete data.id
        delete data.created_at
        delete data.customer

        if(!data.payments.length){
          delete data.payments
        }
        
        if(data.payments.length){
          data.payments.forEach((payment)=>{
            delete payment.details;
            delete payment.id;
            delete payment.forPaid;        
            if(payment.metodopago === 1){              
              delete payment.auth;
              delete payment.bank_id;            
            }
            if(payment.metodopago === 4){
              delete payment.bank_id;    
            }
          })
        }

        if(data.items.length){
          data.items.forEach((item)=>{
            delete item.descripcion;
            delete item.inStorage;
            delete item.producto;
            delete item.subtotal;
            delete item.cantInStore;
            delete item.out;
          })
        }

        try {
          const { id } = sale,
            url = setUrl("sales", id),
            method = id ? "PUT" : "POST";
            return await api(url, method, data);
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

