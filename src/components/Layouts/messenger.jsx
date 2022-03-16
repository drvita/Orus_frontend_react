import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";
import {api, getUrl} from '../../redux/sagas/api';

export default class messenger extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    const ls = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      messages: [],
      message: "",
      load: true,
      host: ls.host,
      token: ls.token,
      user: ls.idUser,
    };

  }

  componentDidMount() {
    this.getMessengers();
  }
  componentDidUpdate(props, state) {
    if (props.pagado !== this.props.pagado) {
      this.getMessengers();
    }
  }

  render() {
    const { messages, load, message, user } = this.state,
      { idRow } = this.props;

    return (
      <div className="card direct-chat direct-chat-primary d-print-none">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-comments mr-1"></i>
            Chat
            <span className="badge badge-pill badge-secondary ml-1">
              {idRow}
            </span>
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
              <div className="direct-chat-messages" id="boxchat">
                {messages.map((message) => {
                  let avatar = "/img/avatars/avatar5.png";
                  // eslint-disable-next-line
                  {
                    /** TODO: chage to role */
                  }
                  if (message.created_user.rol === 1)
                    console.log("PRUEBA ROL", message.created_user.rol);
                    avatar = "/img/avatars/avatar2.png";
                  if (!message.created_user.rol)
                    console.log("PRUEBA ROL", message.created_user.rol);
                    avatar = "/img/avatars/avatar3.png";
                  if (message.created_user.id === 2)
                    console.log("PRUEBA ROL", message.created_user.rol);
                    avatar = "/img/avatars/avatar4.png";
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
                            ? "/img/avatars/OrusBot.png"
                            : avatar
                        }
                        alt="message user image1"
                      />
                      <div className="direct-chat-text">{message.mensaje}</div>
                    </div>
                  );
                })}
              </div>
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

        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              name="message"
              placeholder="Escriba un mensaje ..."
              className="form-control"
              value={message}
              onChange={this.handleMessege}
            />
            <span className="input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.sendMessenger}
                disabled={message.length > 5 ? false : true}
              >
                Enviar
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }

  handleMessege = (e) => {
    let { value, name } = e.target;
    this.setState({
      [name]: value.toLowerCase(),
    });
    console.log(value);
  };

  sendMessenger = async () => {

    const { table, idRow } = this.props;

    const { message, load } = this.state;

    //Mandamos señal de procesamiento
    if (!load) {
      this.setState({
        load: true,
      });
    }


    const sendMessengerUrl = getUrl("messengers", null);

    const bodyRequest = {
      table:table,
      idRow:idRow,
      message:message,  
    };

    const data = await api(sendMessengerUrl, 'POST', bodyRequest, null)

    if(data){
      console.log(data);
      this.getMessengers();
    }
    else{
      console.log("ERROR al enviar");
      window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
      this.setState({
        load: false,
      });
    }
  };


  getMessengers = async () => {
    const { load } = this.state;

    const { table, idRow } = this.props;

    const filters = {
      table: table,
      idRow: idRow,
      page: 1,
    };

    const getMessengerUrl = getUrl("messengers", null, filters);

    if (!load) {
      this.setState({
        load: true,
      });
    }

    const { data, message } = await api(getMessengerUrl);

      

      if(data){
        console.log("DATA send messenger",data);
        this.setState({
          messages: data,
          message: "",
          load: false,
        });
      }
      else if(message){
        window.alert("Ups!\n Algo salio mal, intentelo mas tarde.");
        this.setState({
          load: false,
        });
        console.log(message);
      }
  };
}
