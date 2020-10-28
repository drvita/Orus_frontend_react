import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";

export default class messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      load: true,
      host: props.data.host,
      token: props.data.token,
    };
  }
  componentDidMount() {
    this.getMessengers();
  }

  render() {
    const { data } = this.props,
      { messages, load } = this.state,
      user = data.idUser;

    return (
      <div className="card direct-chat direct-chat-primary">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-comments mr-1"></i>
            Chat
          </h3>
        </div>

        {load ? (
          <div className="card-body">
            <div className="card-text text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : messages.length ? (
          <React.Fragment>
            <div className="card-body">
              <div className="direct-chat-messages">
                {messages.map((message) => {
                  return (
                    <div
                      className={
                        message.created_user.id === user
                          ? "direct-chat-msg right"
                          : "direct-chat-msg"
                      }
                      key={message.id}
                    >
                      <div className="direct-chat-infos clearfix">
                        <span
                          className={
                            message.created_user.id === user
                              ? "direct-chat-name float-right"
                              : "direct-chat-name float-left"
                          }
                        >
                          {message.created_user.name}
                        </span>
                        <span
                          className={
                            message.created_user.id === user
                              ? "direct-chat-timestamp float-left"
                              : "direct-chat-timestamp float-right"
                          }
                        >
                          {moment(message.updated_at).format("lll")}
                        </span>
                      </div>
                      <img
                        className="direct-chat-img"
                        src={
                          message.created_user.id === 1
                            ? "/img/OrusBot.png"
                            : "/img/avatar.png"
                        }
                        alt="message user image1"
                      />
                      <div className="direct-chat-text">{message.mensaje}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card-footer">
              <form action="#" method="post">
                <div className="input-group">
                  <input
                    type="text"
                    name="message"
                    placeholder="Escriba un mensaje ..."
                    className="form-control"
                  />
                  <span className="input-group-append">
                    <button type="button" className="btn btn-primary">
                      Enviar
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </React.Fragment>
        ) : (
          <div className="card-body">
            <div className="card-text text-center p-4">
              <h5>
                <i className="fas fa-comment-slash mr-1"></i>
                No hay mensajes aun
              </h5>
            </div>
          </div>
        )}
      </div>
    );
  }

  getMessengers = () => {
    //Variables en localStorage
    const { load, host, token } = this.state,
      { table, idRow } = this.props,
      url = "http://" + host + "/api/messengers",
      type = "&table=" + table + "&idRow=" + idRow,
      page = "?page=1";

    //Mandamos señal de procesamiento
    if (!load) {
      this.setState({
        load: true,
      });
    }
    console.log("Solicitando mensajes de la API");
    //Realiza la peticion de los contactos
    fetch(url + page + type, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.data) {
          console.log("Almacenado mensajes");
          this.setState({
            messages: data.data,
            load: false,
          });
        } else {
          console.error(data.message);
          this.setState({
            load: false,
          });
        }
      })
      .catch((e) => {
        console.error(e);
        window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        this.setState({
          load: false,
        });
      });
  };
}
