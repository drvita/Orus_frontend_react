import { api, setUrl } from "../utils/url";

export default function useMessenger() {
  const getMessages = async (options) => {
    const url = setUrl("messengers", null, options);

    return await api(url);
  };

  const sendMessenger = async (bodyRequest) => {
    if (bodyRequest) {
      const url = setUrl("messengers");

      return await api(url, "POST", bodyRequest);
    }
  };

  return {
    getMessages,
    sendMessenger,
  };
}
