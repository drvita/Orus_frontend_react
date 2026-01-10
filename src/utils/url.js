import axios from "axios";

export function getLastParam() {
  const url = window.location.pathname.split("/");

  return parseInt(url.pop());
}

export function api(url, method = "GET", body, controller = null) {
  return new Promise((done, reject) => {
    let protocol = window.location.protocol.replace(":", "");
    let host = window.location.hostname;
    let port = window.location.port;
    let token = "";

    // Load server config from localStorage
    try {
      const LS = localStorage.getItem("OrusSystem");
      if (LS) {
        const config = JSON.parse(LS);
        protocol = config.protocol || protocol;
        host = config.host || host;
        port = config.port || "";
      }
    } catch (e) {
      console.error("[Orus System] Error parsing localStorage config:", e);
    }

    // Load session (token) from sessionStorage
    try {
      const SS = sessionStorage.getItem("OrusSystemLogin");
      if (SS) {
        const sessionData = JSON.parse(SS);
        token = sessionData.token || "";
      }
    } catch (e) {
      console.error("[Orus System] Error parsing sessionStorage session:", e);
    }

    const baseUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    const param = {
      method,
      url: `${baseUrl}/api/${url}`,
      headers,
    };

    if (["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && body) {
      // Axios handles objects automatically, no need to stringify if using default config
      param.data = body;
    }
    if (controller) param.signal = controller.signal;

    axios(param)
      .then((res) => done(res.data))
      .catch((err) => {
        console.error("[Orus System] Query API failure:", url, err.message);
        return reject(err.response?.data || err);
      });
  });
}

export function setUrl(endpoint, id, param = {}) {
  let url = endpoint,
    paramString = null;
  const paramKeys = Object.keys(param);

  if (id) {
    url += `/${id}`;
  }

  if (typeof param !== "object" || Array.isArray(param)) {
    return url;
  }

  if (paramKeys) {
    paramKeys.map((k) => {
      if (param[k] === null || param[k] === "") {
        delete param[k];
      }
      return null;
    });

    if (paramKeys.length) {
      paramString = new URLSearchParams(param);
      url += `?${paramString}`;
    }
  }

  return url;
}