import { api, setUrl } from "../utils/url";

export default function useSales(ctx) {
  //Functions
  const getSaleList = async (search) => {
    const salesFilters = {
      orderBy: "created_at",
      order: "desc",
      itemsPage: 100,
    };
    if (search) {
      salesFilters.search = search;
    }

    const url = setUrl("sales", null, salesFilters);
    return await api(url);
  }; 

  const getSaleById = async (id) => {
    const url = setUrl("sales", id);
    return await api(url);
  };

  const saveSale = async (sale) => {
    try {
      const { id } = sale,
        url = setUrl("sales", id),
        method = id ? "PUT" : "POST";
        
      return await api(url, method, sale);
    } catch (e) {
      console.error(
        "[Orus System] Error in saga/sales handledSaveSale",
        e.message
      );
    }
  };

  return {
    getSaleList,
    getSaleById,
    saveSale,
  };
}
