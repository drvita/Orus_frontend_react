export async function api(url, method = "GET", body, controller = null) {
  const LS = localStorage.getItem("OrusSystem"),
    {
      port: PORT = window.location.protocol.toString().replace(":", ""),
      host: HOST = window.location.hostname.toString(),
      token: TOKEN = "",
    } = JSON.parse(LS ? LS : "{}");
    

  const param = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    },
  };

  if (["POST", "PUT"].includes(method.toUpperCase()) && body) {
    param.body = JSON.stringify(body);
  }
  if (controller) param.signal = controller.signal;

  //console.log("PRUEBAAAAA",`${PORT}://${HOST}/api/${url}`)

  return await fetch(`${PORT}://${HOST}/api/${url}`, param)
    .then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        for (var pair of res.headers.entries()) {
          if (pair[0] === "content-type") {
            switch (pair[1]) {
              case "application/json":
                return await res.json();          
              case "text/csv; charset=UTF-8":
                return await res.blob();
              default:
                return null;
            }
          }
        }
      }
      return res.json();
    })
    .catch((err) => {
      console.error("[Orus System] Query API failer:", url);
      console.error("[Orus System] Query API message:", err.message);
      return null;
    });
}

export function getUrl(endpoint, id, param = {}) {
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

    if (Object.keys(param).length) {
      paramString = new URLSearchParams(param);
      url += `?${paramString}`;
    }
  }

  return url;
}
