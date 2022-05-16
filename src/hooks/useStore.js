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
    console.log("ID A ELIMINAR", id);
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

  const saveItem = async (data) => {
    console.log("Data de item a guardar:", data);

    if (!data) return;
    const { id } = data;
    delete data.id;

    if (id) {
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
      const url = setUrl("store");

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



  const saveQantityandPrice = async (data)=>{
    const { ID } = data;
    const url = setUrl("branches", ID);
    const method = ID ? "PUT" : "POST";
    
    return await api(url, method, data);

  }


  // Brands functions
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
    const url = setUrl('brands');
    return await api(url, 'POST', data)
  }

  const deleteBrand = async (id)=>{
    const url = setUrl('brands', id);
    return await api(url, 'DELETE', null)
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
  }


  return {
    getItems,
    getItem,
    deleteItem,
    saveItem,
    saveQantityandPrice,
    getBrands,
    getBrand,
    saveBrand,
    deleteBrand,
  };
}
