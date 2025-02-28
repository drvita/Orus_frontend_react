import Activitys from "../../Activitys"

export default function InfoModal({handleClose:_close, data}){
    return(
        <div className="modal d-block">      
        <div className="modal-dialog modal-lg" role="document">

            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Actividad</h5>
                <button type="button" className="close" onClick={() => _close()}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <Activitys
                data = {data}
            />           

            <div className="modal-footer">                
                    <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => _close()}
                    >
                    <i className="fas fa-ban mr-1"></i>
                        Cerrar
                    </button>                

            </div>
            </div>
        </div>
    </div> 
    )
}