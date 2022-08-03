import { api, setUrl } from "../utils/url";

export default function useStore() {
  const getItems = async (options) => {
    if (!options) return null;

    const url = setUrl("store", null, options);

    return await api(url, "GET")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get items list in hook:",
          err.message
        );

        throw err;
      });
  };

  const getItem = async (id) => {
    if (!id) return false;

    const url = setUrl("store", id);

    return await api(url, "GET")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get item in hook:",
          err.message
        );

        throw err;
      });
  };

  const deleteItem = async (id) => {
    if (!id) return false;

    const url = setUrl("store", id);

    return await api(url, "DELETE")
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when delete item in hook:",
          err.message
        );

        throw err;
      });
  };

  const saveItemByList = async (items) => {
    if (!items) return;
    const url = setUrl("store/bylist");

    return await api(url, "POST", { items })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when save items by list in hook:",
          err.message
        );

        throw err;
      });
  };

  const saveItem = async (data) => {
    if (!data) return;
    const { id } = data;

    //delete data.id;
    delete data.data;
    delete data.loading;

    if (id) {
      console.log("Data a enviar", data);
      const url = setUrl("store", id);

      return await api(url, "PUT", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save item in hook:",
            err.message
          );

          throw err;
        });
    } else {
      console.log("Data a enviar", data);
      const url = setUrl("store");
      
      delete data.supplier_id
      delete data.brand_id

      return await api(url, "POST", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save item in hook:",
            err.message
          );
          throw err;
        });
    }
  };

  const saveQantityandPrice = async (data) => {
    delete data.readyToSave;
    const { id } = data;

    if (id === 0) {
      const url = setUrl("branches");
      const method = "POST";
      return await api(url, method, data);
    } else {
      const url = setUrl("branches", id);
      const method = "PUT";
      return await api(url, method, data);
    }
  };

  const saveGlobalPrice = async (data) => {
    const idCategory = data.productCategoryId;
    const URL = setUrl(`categories/setprice/${idCategory}`);
    const method = "POST";

    delete data.productCategoryId;
    delete data.branchSelected;

    return await api(URL, method, data);
  };

  const saveQantity = async (data)=>{   
    const product_id = data.product_id;
    const url = setUrl(`store/setcant/${product_id}`);
    const method = 'POST';
    return await api(url, method, data);
  }

  // Brands functions -------------------------
  const getBrands = async (options) => {
    if (!options) return null;

    const url = setUrl("brands", null, options);

    return await api(url, "GET")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get brands list in hook:",
          err.message
        );
        throw err;
      });
  };

  const getBrand = async (id) => {
    if (!id) return false;

    const url = setUrl("brands", id);

    return await api(url, "GET")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get brands in hook:",
          err.message
        );

        throw err;
      });
  };

  const saveBrand = async (data) => {
    const url = setUrl("brands");
    return await api(url, "POST", data);
  };

  const deleteBrand = async (id) => {
    const url = setUrl("brands", id);
    return await api(url, "DELETE", null)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when delete item in hook:",
          err.message
        );

        throw err;
      });
  };

  return {
    getItems,
    getItem,
    deleteItem,
    saveItem,
    saveItemByList,
    saveQantityandPrice,
    saveGlobalPrice,
    getBrands,
    getBrand,
    saveBrand,
    deleteBrand,
    saveQantity,
  };
}
