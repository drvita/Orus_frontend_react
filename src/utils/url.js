import axios from "axios";

export function getLastParam() {
  const url = window.location.pathname.split("/");

  return parseInt(url.pop());
}

export function api(url, method = "GET", body, controller = null) {
  return new Promise((done, reject) => {
    const LS = localStorage.getItem("OrusSystem"),
      SS = sessionStorage.getItem("OrusSystem"),
      {
        protocol: PROTOCOL = window.location.protocol,
        host: HOST = window.location.hostname,
        port: PORT = window.location.port,
      } = JSON.parse(LS ? LS : "{}"),
      { token: TOKEN = "" } = JSON.parse(SS ? SS : "{}");
    const param = {
      method,
      url: `${PROTOCOL}://${HOST}:${PORT}/api/${url}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
    };

    if (["POST", "PUT"].includes(method.toUpperCase()) && body) {
      param.data = JSON.stringify(body);
    }
    if (controller) param.signal = controller.signal;

    axios(param)
      .then((res) => {
        return done(res.data);
      })
      .catch((err) => {
        console.error("[Orus System] Query API failer:", url);
        console.error("[Orus System] Query API code:", err?.code);
        console.error("[Orus System] Query API message:", err?.message);
        return reject(err.response?.data);
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