import React, { Component } from "react";

export default class easyContact extends Component {
  constructor(props) {
    super(props);
    //Variables en localStorage
    let storage = JSON.parse(localStorage.getItem("OrusSystem"));
    this.state = {
      name: "",
      t_movil: "",
      birthday: "",
      email: "",
      host: storage.host,
      token: storage.token,
    };
  }
  componentDidMount() {
    const { name } = this.props;
    if (name) {
      this.setState({
        name,
      });
    }
  }
  componentDidUpdate(props, state) {
    if (props.name !== this.props.name && this.props.name !== this.state.name) {
      this.setState({
        name: this.props.name,
      });
    }
  }

  render() {
    const { name, t_movil, birthday, email } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label>Nuevo paciente</label>
          <input
            type="text"
            className="form-control text-uppercase"
            placeholder="Nombre del paciente"
            name="name"
            autoComplete="off"
            required="required"
            pattern="^[a-zA-Z.]{2,20}[\s]{1}[a-zA-Z.]{2,20}.*"
            minLength="8"
            value={name}
            onChange={this.changeValue}
          />
        </div>
        <div className="form-group">
          <label>Telefono celular</label>
          <input
            type="tel"
            placeholder="Telefono celular"
            className="form-control"
            name="t_movil"
            pattern="^[\d]{10}$"
            maxLength="10"
            value={t_movil}
            onChange={this.changeValue}
          />
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={this.changeValue}
          />
        </div>
        <div className="form-group">
          <label>Fecha de naciemiento</label>
          <input
            type="date"
            className="form-control"
            name="birthday"
            value={birthday}
            onChange={this.changeValue}
          />
        </div>
        <div className="form-group text-right">
          <button className="btn btn-danger" onClick={this.handleSave}>
            Registrar
          </button>
        </div>
      </React.Fragment>
    );
  }

  changeValue = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    console.log(name, value);
    if (type === "text" || type === "email") val = value.toLowerCase();
    this.setState({
      [name]: val,
    });
  };
  handleSave = (e) => {
    e.preventDefault();
    let { name, t_movil } = this.state;
    console.log("Verificacion", name.length, t_movil.length);
    //Verificamos campos validos
    if (name.length < 5) {
      window.Swal.fire(
        "Verificacion",
        "El nombre del paciente no es correcto",
        "warning"
      );
      return false;
    }
    if (t_movil.length !== 10) {
      window.Swal.fire(
        "Verificacion",
        "El numero telefonico no es correcto",
        "warning"
      );
      return false;
    }

    //Confirmación de almacenamiento
    window.Swal.fire({
      title: "Almacenamiento",
      text: "¿Esta seguro de crear un nuevo contacto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (confirm) => {
        if (confirm) {
          let { name, birthday, t_movil, email, host, token } = this.state,
            //Creamos el body
            body = {
              name,
              email: email
                ? email
                : name.replace(/\s/g, "") +
                  birthday.replace(/-/g, "").replace(/\//g, "") +
                  "@domain",
              type: 0,
              birthday,
              business: 0,
              domicilio: JSON.stringify({
                calle: "",
                colonia: "",
                municipio: "Colima",
                estado: "Colima",
                cp: "28000",
              }),
              telnumbers: JSON.stringify({
                t_casa: "",
                t_oficina: "",
                t_movil,
              }),
            },
            //Identificamos la URL y el metodo segun sea el caso (Actualizar o agregar)
            url = "http://" + host + "/api/contacts",
            //Actualiza el contacto o creamos el contacto
            method = "POST";

          //Enviamos datos al API
          console.log("Enviando datos del contacto a la API");
          return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            signal: this.signal,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((e) => {
              console.error("Orus fetch: ", e);
              window.Swal.fire(
                "Fallo de conexion",
                "Verifique la conexion al servidor",
                "error"
              );
            });
        }
      },
    }).then((result) => {
      if (result && !result.dismiss && result.value) {
        let data = result.value;
        if (data.data) {
          console.log("Contacto almacenado");
          localStorage.setItem("OrusContactNew", JSON.stringify({}));
          localStorage.setItem(
            "OrusContactInUse",
            JSON.stringify({ id: data.data.id })
          );
          window.Swal.fire({
            icon: "success",
            title: "Contacto almacenado con exito",
            showConfirmButton: false,
            timer: 1500,
          }).then((res) => {
            this.props.setContac(data.data.id, data.data.birthday);
          });
        } else {
          window.Swal.fire("Error", "al almacenar el contacto", "error");
          console.error("Orus res: ", data.message);
        }
      }
    });
  };
}
