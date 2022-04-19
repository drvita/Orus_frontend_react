import { createContext, useState } from "react";
import{ api, setUrl } from '../utils/url';
import saleHelper from '../components/Sales/helpers';


export const SaleContext = createContext(null);

const initialSale =   {
    id: 0,
    customer: {
      id: 0,
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
    const getSaleList = () => {
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

    const getSaleById = (name) => {
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

    const setCustomer = (customerSet) => {
        setState({
            ...state,
            sale: {
                ...state.sale,
                customer:{
                    id: customerSet.id,
                    nombre: customerSet.nombre ? customerSet.nombre : "Venta de mostrador",
                    email: customerSet.email,
                    telefonos: customerSet.telefonos,
                    f_nacimiento: customerSet.f_nacimiento,
                    edad: customerSet.edad,
                },
                contact_id: customerSet.id,
            }
        })
    }

    const addItems = (newItems)=> {
        setState({
            ...state,
            sale: {
                ...state.sale,
                items: newItems,
                total: saleHelper.getTotal(newItems),
                subtotal:saleHelper.getTotal(newItems),
            }
        })
    }

    const setTotal = (total)=> {
        console.log("TOTAL DE LA VENTA",total);
        setState({
            ...state,
            sale:{
                ...state.sale,
                total:total,
                subtotal:total,
            }
        })
    }

    const addDiscount = ()=>{

    }

    const resetSale = () => {
        setState({
            ...state,
            saleList:[],
            sale:{
                ...state.sale,
                session: saleHelper.getSession(),
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
        resetSale,
        addItems,
        setTotal,
    });


    return (
        <SaleContext.Provider value={state}>
            {children}
        </SaleContext.Provider>
    );

}
