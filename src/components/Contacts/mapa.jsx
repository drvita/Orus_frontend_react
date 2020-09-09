import React, { Component } from "react";

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.markers = [];
    this.map = "";
  }

  componentDidMount() {
    const googlePlaceAPILoad1 = setInterval(() => {
      if (window.google) {
        this.google = window.google;
        clearInterval(googlePlaceAPILoad1);
        console.log("Cargando mapa");
        const mapCenter = new this.google.maps.LatLng(19.2487072, -103.747381);
        this.map = new this.google.maps.Map(
          document.getElementById("gmapContainer"),
          {
            center: mapCenter,
            zoom: 16,
          }
        );
        if (this.props.calle.length > 6) {
          console.log("Cargando Marker");
          this.eventLoadMap();
        }
      }
    }, 100);
  }
  componentDidUpdate() {
    if (this.props.calle.length > 6) {
      console.log("Cargando Marker");
      this.eventLoadMap();
    }
  }

  render() {
    return (
      <div className="card card-danger card-outline">
        <div className="card-header">
          <i className="fas fa-map-marked mr-1"></i>
          Mapa
        </div>
        <div
          className="card-body"
          id="gmapContainer"
          style={{ height: 400 }}
        ></div>
      </div>
    );
  }

  eventLoadMap = () => {
    let input =
      this.props.calle +
      "," +
      this.props.colonia +
      "," +
      this.props.municipio +
      "," +
      this.props.estado +
      "," +
      this.props.cp;
    const request = {
      query: input,
      fields: ["formatted_address", "geometry"],
    };
    this.service = new this.google.maps.places.PlacesService(this.map);
    this.service.findPlaceFromQuery(request, (results, status) => {
      if (status === "OK") {
        if (this.markers.length) {
          this.markers[0].setMap(null);
          this.markers = [];
        }
        results.map((place) => {
          this.marker = new this.google.maps.Marker({
            position: place.geometry.location,
            title: place.formatted_address,
            map: this.map,
          });
          this.marker.addListener("click", () => {
            let address = this.marker.title.split(","),
              add = address[2].split(/(\d{5})/g);

            if (!add.length) {
              add = address[3].split(/(\d{5})/g);
            }
            this.props.changeAddress({
              calle: address[0].trim(),
              colonia: address[1].trim(),
              municipio: add[2] ? add[2].trim() : this.props.municipio,
              estado: address[3].trim(),
              cp: add[1] ? add[1].trim() : this.props.cp,
            });
          });
          this.markers.push(this.marker);
          this.markers[0].setMap(this.map);
          this.map.setCenter(this.markers[0].position);
          return null;
        });
      }
    });
  };
}
