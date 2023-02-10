import { api, setUrl } from "../utils/url";

export default function useConfig() {
  const get = async (options) => {
    if (!options) return null;

    const url = setUrl("config", null, options);

    return await api(url, "GET")
      .then((res) => res)
      .catch((err) => {
        console.error(
          "[Orus System] Catch when get Configs list in hook:",
          err.message
        );

        return null;
      });
  };

  return {
    get,
  };
}
