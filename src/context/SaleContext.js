import { createContext, useContext, useState } from "react";
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

  const setSale = (sale) => {
    setState({
      ...state,
      sale: sale,
    });
  };

  const saveSale = (sale) => {
    sale.payments.forEach(payment => {
      payment.id = 0
    });

    try {
      const { id } = sale,
        url = setUrl("sales", id),
        method = id ? "PUT" : "POST"

        api(url, method, sale)
        .then((data)=>{
          if(data.data){
           /*  setState({
              ...state,
              sale: sale,
              saleSavedCorrectly: true,
            }) */
            console.log("[Orus System] Venta almacenada con exito", data.data.id);
          }else{
            console.error("Error al guardar la venta");
          }
        })
    } catch (e) {
      console.error(
        "[Orus System] Error in saga/sales handledSaveSale", e.message
      );
    }
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

  const deletePayment = () => {};

  const addDiscount = (sale, discount) => {
    setState({
      ...state,
      sale: {
        ...sale,
        descuento: discount,
      },
    });
  };

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
    //saleSavedCorrectly: false,
    saleList: [],
    sale: initialSale,
    getSaleList,
    getSaleById,
    setCustomer,
    setSale,
    saveSale,
    resetSale,
    addItems,
    setTotal,
    addPayment,
    deletePayment,
    addDiscount,
  });

  return <SaleContext.Provider value={state}>{children}</SaleContext.Provider>;
}
