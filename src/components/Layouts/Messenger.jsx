/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import useMessenger from "../../hooks/useMessenger";

export default function Messenger({ table, idRow }) {
  const hookMessenger = useMessenger();
  const authContext = useContext(AuthContext);
  const { idUser } = authContext;

  const [state, setState] = useState({
    messages: [],
    user: "",
    load: true,
    message: "",
  });

  const getMessenger = () => {
    const options = {
      table,
      idRow,
    };

    console.log("[DEBUG] options:", options);
    hookMessenger.getMessages(options).then((data) => {
      if (data.data) {
        setState({
          ...state,
          messages: data.data,
          user: idUser,
          load: false,
        });
      }
    });
  };

  const handleMessege = (e) => {
    setState({
      ...state,
      message: e.target.value,
    });
  };

  const sendMessenger = () => {
    const bodyRequest = {
      table: table,
      idRow: idRow,
      message: state.message,
    };

    hookMessenger.sendMessenger(bodyRequest).then((data) => {
      if (data) {
        setState({
          ...state,
          messages: [data.data, ...state.messages],
          message: "",
        });
      }
    });
  };

  useEffect(() => {
    getMessenger();
  }, []);

  return (
    <div className="card direct-chat direct-chat-primary d-print-none">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-comments mr-1"></i>
          Chat
          <span className="badge badge-pill badge-secondary ml-1">{idRow}</span>
        </h3>
      </div>

      {state.load ? (
        <div className="card-body">
          <div className="card-text text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : state.messages.length ? (
        <>
          <div className="card-body">
            <div className="direct-chat-messages" id="boxchat">
              {state.messages.map((message) => {
                let avatar = "/img/avatars/avatar5.png";
                // eslint-disable-next-line
                if (message.created_user.rol === 1)
                  avatar = "/img/avatars/avatar2.png";
                if (!message.created_user.rol)
                  avatar = "/img/avatars/avatar3.png";
                if (message.created_user.id === 2)
                  avatar = "/img/avatars/avatar4.png";
                return (
                  <div
                    className={
                      message.created_user.id === state.user
                        ? "direct-chat-msg right"
                        : "direct-chat-msg"
                    }
                    key={message.id}
                  >
                    <div className="direct-chat-infos clearfix">
                      <span
                        className={
                          message.created_user.id === state.user
                            ? "direct-chat-name float-right"
                            : "direct-chat-name float-left"
                        }
                      >
                        {message.created_user.name}
                      </span>
                      <span
                        className={
                          message.created_user.id === state.user
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
        </>
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
            value={state.message}
            onChange={handleMessege}
          />
          <span className="input-group-append">
            <button
              type="button"
              className="btn btn-primary"
              onClick={sendMessenger}
              disabled={state.message.length > 5 ? false : true}
            >
              Enviar
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
