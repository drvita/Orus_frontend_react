import { useState, useContext } from "react";

function SetPriceModal({ handleClose: _close }) {
    
  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Asignar Precio</h5>
            <button onClick={_close} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>


          <div className="modal-body p-2">
              <div className="d-flex flex-column justify-content-start align-items-start">
                  <label className="text-center">Selecciona la rama</label>
                  <select className="form-control" id="">
                      <option value="">Option 1</option>
                      <option value="">Option 2</option>
                      <option value="">Option 3</option>
                  </select>

                  <br />

                  <label>Precio</label>
                  <input type="text" className="form-control" placeholder="Precio"/>

              </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={_close} >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>

            <button type="button" className="btn btn-success" >
              Asignar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SetPriceModal;
