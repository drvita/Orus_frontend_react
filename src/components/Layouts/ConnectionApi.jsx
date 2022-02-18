export async function ApiGet(action) {
  try {
    let ls = JSON.parse(localStorage.getItem("OrusSystem")),
      url = "http://" + ls.host + "/api/" + action;
    console.log("Ajax: ", action, url, ls.token);
    return await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + ls.token,
      },
    });
  } catch (e) {
    if (e.code === 20) {
      console.error("[Orus system] Salida por error:", e.code, e.message);
      return false;
    }

    window.Swal.fire(
      "Fallo de conexion",
      "Verifique la conexion al servidor",
      "error"
    );
    return {};
  }
}

export function ApiPost(action, body, TextConfirm) {
  return window.Swal.fire({
    text: TextConfirm,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
    preConfirm: (confirm) => {
      if (confirm) {
        let ls = JSON.parse(localStorage.getItem("OrusSystem")),
          url = "http://" + ls.host + "/api/" + action;

        return fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + ls.token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((e) => {
            if (e.code === 20) {
              console.error(
                "[Orus system] Salida por error:",
                e.code,
                e.message
              );
              return false;
            }

            window.Swal.fire(
              "Fallo de conexion",
              "Verifique la conexion al servidor",
              "error"
            );
          });
      }
    },
  });
}
