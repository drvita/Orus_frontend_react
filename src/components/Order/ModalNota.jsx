import helper from '../Sales/helpers';

export default function ModalNota({ handleClose: _close, sale}) {
    console.log(sale);

    const getForPay = ()=>{
        //return helper.getForPay()
        //total - pay - discount
    }
  return (
      <div className="modal d-block">
      <div className="modal-dialog" role="document">

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nota</h5>
            {/* {sale.id ? (
                <a href="#" class="badge badge-success mt-2 ml-2">#{sale.id}</a>
            ):null} */}
            <button type="button" className="close" onClick={() => _close()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body p-2">
             {sale.id ? (                 
                 <div>
                     <div className='ml-3 font-weight-bold'>
                         <h5 className='border-bottom pb-1 mb-2'>Resumen de la venta <span className='badge badge-success'>#{sale.id}</span></h5>
                     </div>
                     <div className="d-flex pl-2">                     
                        <div className='col-lg-7'>                                        
                            <h6>Descuento:<span className='text-secondary ml-2 font-weight-normal'>${sale.descuento}</span></h6>
                            <h6>Subtotal:<span className="text-secondary mb-3 ml-2 font-weight-normal">${sale.subtotal}</span></h6>
                            <h5 className="font-weight-bold">Total:<span className="text-info ml-2 font-weight-normal">${sale.total}</span></h5>  
                        </div>
                                                            
                        <div className='col-lg-6 d-flex flex-column justify-content-center align-items-center pt-4'>
                            <h6 className='font-weight-bold'>Abonado:<span className='text-success ml-2 font-weight-normal'>${sale.payments}</span></h6>
                            <h6 className='font-weight-bold'>Por pagar:<span className='text-danger ml-2 font-weight-normal'>${sale.total - sale.payments - sale.descuento}</span></h6>
                        </div>
                     </div>
                 </div>                
             ):(
                 <p>No hay un nota para mostrar!!</p>
             )}
          </div>

          <div className="modal-footer">                
                <button
                type="button"
                className="btn btn-default"
                onClick={() => _close()}
                >
                <i className="fas fa-ban mr-1"></i>
                Cancelar
                </button>

                <button className="btn btn-info" onClick={()=> alert("Mostrar venta completa")}>
                  <i className="fas fa-money-bill-alt mr-2"></i>
                  Editar nota
                </button>

          </div>
        </div>
      </div>
    </div> 
  );
};
