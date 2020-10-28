import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer d-print-none">
        <div className="float-right d-none d-sm-inline">V2.0</div>
        <strong>
          Copyright &copy; 2015-2020 <a href="#end">Orus</a>.
        </strong>{" "}
        Todos los derechos reservados.
      </footer>
    );
  }
}

export default Footer;
