import { createContext, useContext, useEffect, useState } from "react";
import { api, setUrl } from "../utils/url";
import saleHelper from "../components/Sales/helpers";

export const SaleContext = createContext(null);
export const Sale = () => useContext(SaleContext);

const initialSale = {
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
};

export default function useSales({ children }) {
  //Functions
  const getSaleList = () => {
    const salesFilters = {
      orderBy: "created_at",
      order: "desc",
      itemsPage: 25,
    };

    const url = setUrl("sales", null, salesFilters);

    api(url).then((data) => {
      if (data) {
        setState({
          ...state,
          saleList: data.data,
        });
      }
    });
  };

  const getSaleById = (name) => {
    const saleFilter = {
      orderBy: "created_at",
      order: "desc",
      itemsPage: 25,
      search: name,
    };

    const url = setUrl("sales", null, saleFilter);

    api(url).then((data) => {
      if (data) {
        setState({
          ...state,
          sale: data.data,
        });
      }
    });
  };


  const setSale = (sale)=> {
      setState({
          ...state,
          sale: sale,
      })
  };

  const setCustomer = (customer) => {
    setState({
      ...state,
      sale: {
        ...initialSale,
        customer: {
          id: customer.id,
          nombre: customer.nombre ? customer.nombre : "Venta de mostrador",
          email: customer.email,
          telefonos: customer.telefonos,
          f_nacimiento: customer.f_nacimiento,
          edad: customer.edad,
        },
        contact_id: customer.id,
        session: saleHelper.getSession(),
      },
    });
  };

  const addItems = (sale, newItems) => {
    setState({
      ...state,
      sale: {
        ...sale,
        items: newItems,
        total: saleHelper.getTotal(newItems),
        subtotal: saleHelper.getTotal(newItems),
      },
    });
  };

  const addPayment = (sale, payment) => {
    setState({
      ...state,
      sale: {
        ...sale,
        payments: payment,
      },
    });
  };

  const deletePayment = ()=> {

  }


  const addDiscount = (sale, discount)=>{
    setState({
        ...state,
        sale:{
            ...sale,
            descuento: discount,
        }
    })
  }

  const setTotal = (total) => {
    console.log("TOTAL DE LA VENTA", total);
    setState({
      ...state,
      sale: {
        ...state.sale,
        total: total,

        //TODO: revisar cual debe ser el valor de subtotal
        subtotal: total,
      },
    });
  };

  const resetSale = () => {
    setState({
      ...state,
      sale: {
        ...state.sale,
        session: saleHelper.getSession(),
      },
    });
  };




  // State
  const [state, setState] = useState({
    saleList: [],
    sale: initialSale,
    getSaleList,
    getSaleById,
    setCustomer,
    setSale,
    resetSale,
    addItems,
    setTotal,
    addPayment,
    deletePayment,
    addDiscount
  });

  /* useEffect(() => {
  }, [state.sale]); */

  return <SaleContext.Provider value={state}>{children}</SaleContext.Provider>;
}
