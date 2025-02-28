/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export default function Phones({ data, handleChange }) {
  useEffect(() => {
    const check = Boolean(
      [data.phone_notices, data.phone_cell, data.phone_office].filter(
        (phone) => phone.length === 10
      ).length
    );

    if (check !== data.validates?.phones) {
      handleChange("validates", {
        ...data.validates,
        phones: check,
      });
    }
  }, [data.phone_notices, data.phone_cell, data.phone_office]);

  return (
    <>
      <div className="col">
        <div className="form-group">
          <label>Telefono para recados</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="(999) 999 9999"
              maxLength="10"
              value={data.phone_notices}
              onChange={({ target }) => {
                if (!isNaN(target.value)) {
                  handleChange("phone_notices", target.value);
                }
              }}
            />
          </div>
          {data.phone_notices && data.phone_notices.length !== 10 && (
            <small>
              <span className="text-orange">Telefono a 10 numeros</span>
            </small>
          )}
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Telefono personal / whatsApp</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="(999) 999 9999"
              maxLength="10"
              value={data.phone_cell}
              onChange={({ target }) => {
                if (!isNaN(target.value)) {
                  handleChange("phone_cell", target.value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label>Telefono del trabajo</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-phone"></i>
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="(999) 999 9999"
              maxLength="10"
              value={data.phone_office}
              onChange={({ target }) => {
                if (!isNaN(target.value)) {
                  handleChange("phone_office", target.value);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
