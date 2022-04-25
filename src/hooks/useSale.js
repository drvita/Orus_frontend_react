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

    const setSale = async (sale) => {
       /*  setState({
          ...state,
          sale: sale,
        }); */
      };


    const saveSale = async (sale) => {
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
            /*   setState({
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


      const setCustomer = async (customer) => {
        /* setState({
          ...state,
          sale: {
            ...initialSale,
            customer: {
              id: customer.id,
              nombre: customer.name ? customer.name : "Venta de mostrador",
              email: customer.email,
              telefonos: customer.telefonos,
              f_nacimiento: customer.f_nacimiento,
              edad: customer.edad,
            },
            contact_id: customer.id,
            session: saleHelper.getSession(),
          },
        }); */
      };

      
  const addItems = (sale, newItems) => {
   /*  setState({
      ...state,
      sale: {
        ...sale,
        items: newItems,
        total: saleHelper.getTotal(newItems),
        subtotal: saleHelper.getTotal(newItems),
      },
    }); */
  };

  const addPayment = async (sale, payment) => {
    /* setState({
      ...state,
      sale: {
        ...sale,
        payments: payment,
      },
    }); */
  };


 /*  const addDiscount = async (sale, discount) => {
    setState({
      ...state,
      sale: {
        ...sale,
        descuento: discount,
      },
    });
  }; */


  const setTotal = async (total) => {
    console.log("TOTAL DE LA VENTA", total);
    /* setState({
      ...state,
      sale: {
        ...state.sale,
        total: total,

        //TODO: revisar cual debe ser el valor de subtotal
        subtotal: total,
      },
    }); */
  };

  
  const resetSale = async () => {
    /* setState({
      ...state,
      sale: {
        ...state.sale,
        session: saleHelper.getSession(),
      },
    }); */
  };

  



    return{
        getSaleList,
        getSaleById,
        setSale,
        saveSale,
        setCustomer,
        addItems,
        addPayment,
        //addDiscount,
        setTotal,
        resetSale,
    };

}

