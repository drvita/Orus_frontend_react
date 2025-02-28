import { api, setUrl } from "../utils/url";

export default function useContact() {

  const getContacts = async (options) => {
    if (!options) return null;

    const url = setUrl("contacts", null, options);
    //type, bussiness

    return await api(url, "GET")
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get contacts list in hook:",
          err.message
        );

        return null;
      });
  };

  const getContact = async (id) => {
    if (!id) return false;

    const url = setUrl("contacts", id);

    return await api(url, "GET")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get contact in hook:",
          err.message
        );

        return {};
      });
  };


  const deleteContact = async (id) => {
    if (!id) return false;

    const url = setUrl("contacts", id);

    return await api(url, "DELETE")
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.error(
          "[Orus System] Catch when delete contact in hook:",
          err.message
        );

        return false;
      });
  };

  
  const saveContact = async (data) => {
    if (!data) return;
    const { id } = data;
    delete data.id;

    if (id) {
      const url = setUrl("contacts", id);

      return await api(url, "PUT", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save contact in hook:",
            err.message
          );

          return null;
        });
    } else {
      const url = setUrl("contacts");

      return await api(url, "POST", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(
            "[Orus System] Catch when save contact in hook:",
            err.message
          );

          return null;
        });
    }
  };

  return {
    getContacts,
    getContact,
    deleteContact,
    saveContact,
  };
}
