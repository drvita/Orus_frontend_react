export function api(url, method = "GET", body) {
  const LS = localStorage.getItem("OrusSystem"),
    {
      port: PORT = window.location.protocol.toString().replace(":", ""),
      host: HOST = window.location.hostname.toString(),
      token: TOKEN = "",
    } = JSON.parse(LS ? LS : "{}");

  console.log("[Orus System] Consultando API:", url);

  return fetch(`${PORT}://${HOST}/api/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    },
  }).then(async (res) => {
    let back = null;
    if (res.status !== 204) back = await res.json();
    return back;
  });
}

export function getUrl(node, id, param = {}) {
  let url = node,
    paramString = null;
  const paramKeys = Object.keys(param);

  if (id) {
    url += `/${id}`;
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
