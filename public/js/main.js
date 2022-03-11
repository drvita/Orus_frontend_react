const subscription = async () => {
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function (response) {
          if (response) {
            console.log("[SW] Services Worker registrado con exito");
            Notification.requestPermission()
              .then((response) => {
                if (response === "granted") {
                  console.log("[SW] Servicio de notificaciones activadas");
                  //window.sendPushMessage("Contactos", "Notificaciones activadas");
                } else {
                  console.error("[SW] Servicio de notificaciones rechazadas");
                }
              })
              .catch((error) => console.error(error.message));
          }
        })
        .catch(function (error) {
          console.error("[Main] SW error \n", error);
        });
    } else {
      console.log("[Main] Este navegador no soporta SW - Server no seguro");
    }
  } catch (err) {
    console.error("[Main] Error en el montado de SW");
  }
};

window.onload = function (e) {
  subscription();
};

window.sendPushMessage = (title, message) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((sw) => {
      sw.showNotification(title, {
        body: message,
      }).catch((error) => {
        console.error("[SW] Notificaciones no disponibles", error.message);
        window.Swal.fire({
          title: message,
          showConfirmButton: title !== "error" ? false : true,
          timer: title !== "error" ? 1500 : 9000,
          position: "top",
        });
      });
    });
  } else {
    window.Swal.fire({
      title: message,
      showConfirmButton: true,
      timer: 6000,
      position: "top",
    });
  }
};
