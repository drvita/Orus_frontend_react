export default function getApi(url, method, body) {
  const LS = localStorage.getItem("OrusSystem"),
    {
      port: PORT = window.location.protocol.toString().replace(":", ""),
      host: HOST = window.location.hostname.toString(),
      token: TOKEN = "",
    } = JSON.parse(LS ? LS : "{}");

  console.log("[Orus System] Consultando la API", url);
  return fetch(`${PORT}://${HOST}/api/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    },
  }).then((response) => response.json());
}
