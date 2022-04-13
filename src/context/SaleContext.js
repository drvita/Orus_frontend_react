import { createContext, useState } from "react";
import{ api, setUrl } from '../utils/url';
import saleHelper from '../components/Sales/helpers';


export const SaleContext = createContext(null);

const initialSale =   {
    id: 0,
    customer: {
      id: 2,
      nombre: "venta de mostrador",
      email: "",
      telefonos: {},
      f_nacimiento: null,
      edad: 0,
    },
    contact_id: 2,
    items: [],
    session: saleHelper.getSession(),
    descuento: 0,
    subtotal: 0,
    total: 0,
    payments: [],
    created_at: new Date(),
  }


export default function useSales({children}){
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
    }

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
        sale: initialSale, 
        getSaleList,
        getSaleById,
        setCustomer,
    });


    return (
        <SaleContext.Provider value={state}>
            {children}
        </SaleContext.Provider>
    );

}

