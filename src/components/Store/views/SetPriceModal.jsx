function SetPriceModal({currentBranch, handleSave: _handleSave ,handleClose: _close, branches, handleChange: _handleChange, disabled }) {
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
                  <label className="text-center">Sucrusales</label>
                  <select 
                    className="form-control" 
                    id=""
                    name="branchSelected"
                    defaultValue={currentBranch.name}
                    onChange={({target})=>{
                      const {name, value} = target;
                      _handleChange(name, value);
                    }}>
                    <option value={0}>-- Seleciona una sucursal --</option>
                    {branches.map((branch)=>{
                      return(
                        <option key={branch.id} value={branch.id}>
                          {branch.data.name.toUpperCase()}
                        </option>
                      )
                    })}
                  </select>

                  <br />

                  <label>Precio</label>
                  <input onChange={({target})=>{
                    const {name, value} = target;
                    _handleChange(name, value);

                  }} name = "productPrice" type="number" defaultValue={0} className="form-control" placeholder="Precio"/>

              </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={_close} >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>

            <button onClick={_handleSave} disabled={disabled} type="button" className="btn btn-success" >
              Asignar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SetPriceModal;
