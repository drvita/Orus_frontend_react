module.exports = {
  getLastParam: function () {
    const url = window.location.pathname.split("/");

    return parseInt(url.pop());
  },
  api: function (url, method = "GET", body, controller = null) {
    return new Promise((done, reject) => {
      const LS = localStorage.getItem("OrusSystem"),
        SS = sessionStorage.getItem("OrusSystem"),
        {
          protocol: PROTOCOL = "http",
          host: HOST = window.location.hostname.toString(),
          port: PORT = "80",
        } = JSON.parse(LS ? LS : "{}"),
        { token: TOKEN = "" } = JSON.parse(SS ? SS : "{}");
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

      fetch(`${PROTOCOL}://${HOST}:${PORT}/api/${url}`, param)
        .then(async (res) => {
          if (res.status >= 200 && res.status < 300) {
            for (var pair of res.headers.entries()) {
              if (pair[0] === "content-type") {
                switch (pair[1]) {
                  case "application/json":
                    return done(res.json());
                  case "text/csv; charset=UTF-8":
                    return done(res.blob());
                  default:
                    return reject();
                }
              }
            }
          }
          return done(res.json());
        })
        .catch((err) => {
          console.error("[Orus System] Query API failer:", url);
          console.error("[Orus System] Query API message:", err.message);
          return reject();
        });
    });
  },
  setUrl: function (endpoint, id, param = {}) {
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
  },
};
