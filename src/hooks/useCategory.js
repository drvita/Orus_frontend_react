import { api, setUrl } from "../utils/url";

export default function useCategory() {
  const getCategories = async (options) => {
    if (!options) return null;

    const url = setUrl("categories", null, options);

    return await api(url, "GET")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get categories list in hook:",
          err.message
        );

        return null;
      });
  };
  const getCategory = async (id) => {
    if (!id) return false;

    const url = setUrl("categories", id);

    return await api(url, "GET")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get category in hook:",
          err.message
        );

        return {};
      });
  };
  const deleteCategory = async (id) => {
    if (!id) return false;

    const url = setUrl("categories", id);

    return await api(url, "DELETE")
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when delete category in hook:",
          err.message
        );

        return false;
      });
  };
  const saveCategory = async (data) => {
    if (!data) return;
    const { id } = data;
    delete data.id;

    if (id) {
      const url = setUrl("categories", id);

      return await api(url, "PUT", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save category in hook:",
            err.message
          );

          return null;
        });
    } else {
      const url = setUrl("categories");

      return await api(url, "POST", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save category in hook:",
            err.message
          );

          return null;
        });
    }
  };

  return {
    getCategories,
    getCategory,
    deleteCategory,
    saveCategory,
  };
}
