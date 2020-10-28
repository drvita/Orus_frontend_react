import React, { Component } from "react";
import Navtop from "./navtop";
import Menu from "./menu";
import Breadcrumb from "./breadcrumb";
import Control from "./control";
import Footer from "./footer";

export default class Main extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navtop />
        <Menu />
        <div class="content-wrapper">
          <Breadcrumb />

          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">Main principal</div>
              </div>
            </div>
          </div>
        </div>
        <Control />
        <Footer />
      </div>
    );
  }
}
