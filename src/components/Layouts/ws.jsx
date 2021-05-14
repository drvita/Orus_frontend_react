export default class Ws {
  constructor(props) {
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.canal = props.canal;
    this.idUser = ls.idUser;
    this.username = ls.username;

    this.ws = new WebSocket(
      ls
        ? "ws://" + ls.host + ":8000"
        : "ws://" + window.location.hostname + ":8000"
    );

    if (this.ws) {
      this.ws.onopen = (e) => {
        console.log("[Orus WS] Coneccion al servidor WS con exito");
        this.ws.send(
          JSON.stringify({
            canal: this.canal,
            msg: { action: "Online" },
            idUser: this.idUser,
            username: this.username,
            date: new Date(),
          })
        );
      };
      this.ws.onmessage = (e) => {
        const msgServer = JSON.parse(e.data);
        if (msgServer.idUser !== this.idUser) {
          console.log(
            "[Orus WS] Accion de usuario:",
            msgServer.msg.action,
            msgServer.username
          );
          if (props.actions && props.actions.length) {
            props.actions.forEach((a) => {
              if (msgServer.msg.action === a.si) {
                a.so(msgServer.msg);
                return false;
              }
            });
          }
        }
      };
    } else {
      console.error("[Orus WS] sin conexion al servidor WS");
    }
  }

  onMessage(send) {
    if (this.ws) {
      this.ws.send(
        JSON.stringify({
          canal: this.canal,
          idUser: this.idUser,
          username: this.username,
          date: new Date(),
          msg: send,
        })
      );
    }
  }
}
