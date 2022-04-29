import { useState, useContext } from "react";

//Custom Hook//
import useContact from "../../../hooks/useContact";
import { Sale } from "../../../context/SaleContext";
import { AuthContext } from "../../../context/AuthContext";
import saleHelper from '../helpers';

function SearchCustomerModal({ handleClose: _close }) {
  const [data, setData] = useState({
    textSearch: "",
  });

  const [customers, setCustomers ] = useState([]);

  const sale = Sale();

  const { auth } = useContext(AuthContext);

  const  _contacts  = useContact();

  //Functions
  const handleClose = () => {
      if (_close) _close();
    },
    handleChangeText = ({ value }) => {
      setData({
        textSearch: value,
      });
    },
    handleKeyPressSearch = (key) => {
      if (key === "Enter") {
        if (data.textSearch.length > 4) {
          return SearchCustomer();
        }

        window.Swal.fire({
          title: "Verificacion",
          text: "Escriba un nombre valido, al menos 5 caracteres",
          icon: "warning",
        });
      }
    },
    SearchCustomer = () => {
      const filters = {
        search: data.textSearch,
        itemsPage: "25",
        orderBy: "id",
        order: "desc",
      };

      _contacts.getContacts(filters).then((data)=>{
        if(data){
          setCustomers(data.data);
        }else{
          console.error("Error al obtener usuario");
        }
      })
    },
    handleClickCustomer = (e, customer) => {
      //console.log("Customer Seleccionado:", customer);
      e.preventDefault();

      console.log("ID customer venta:", sale.customer.id, "ID customer seleccionado:",customer.id);

      if (sale.customer.id !== customer.id) {
        console.log(![0, 2].includes(sale.customer.id));
        if (![0, 2].includes(sale.customer.id)) {
          window.Swal.fire({  
            title: "Ventas",
            text: "Esta accion creara una nueva venta ¿Esta seguro que desea crear una nueva venta?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Crear",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          }).then(({ dismiss }) => {
            if (!dismiss) {
              console.log("Entrando al Dissmiss");
              console.log(customer)
              //sale.setCustomer(customer);
              sale.set({
                id: 0,
                customer: {
                  id:customer.id,
                  name: customer.name,
                },
                contact_id: customer.id,
                items: [],
                session: saleHelper.getSession(),
                discount: 0,
                subtotal: 0,
                total: 0,
                payments: [],
                branch_id: auth.branch.id,
              })
              _close();
            }
          });
        } else {
          sale.set({
            ...sale,
            customer:{
              id: customer.id,
              name: customer.name ? customer.name : "Venta de mostrador",
            },
            contact_id: customer.id
          });
          _close();
        }
      } else {
        _close();
      }
    };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccione un cliente</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body p-2">
            <div className="form-inline mb-3">
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Buscar cliente"
                  onChange={({ target }) => handleChangeText(target)}
                  onKeyPress={({ key }) => handleKeyPressSearch(key)}
                  onBlur={() => data.textSearch.length > 4 && SearchCustomer()}
                  autoFocus={true}
                />
              </div>
              <div className="form-group pl-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={SearchCustomer}
                  disabled={data.textSearch.length < 5}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div
              className="table-responsive overflow-auto"
              style={{ height: "12rem" }}
            >
              <table className="table table-sm">
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="text-right">
                        <span className="badge badge-dark">{customer.id}</span>
                      </td>
                      <td className="text-left">
                        <a
                          href="#select"
                          onClick={(e) => handleClickCustomer(e, customer)}
                          className="text-capitalize"
                        >
                          {customer.name.toLowerCase()}
                        </a>
                      </td>
                    </tr>
                  ))}
                  {!customers.length && (
                    <>
                      {[0, 2].includes(sale.customer.id) ? (
                        <tr>
                          <td>No existen pacientes con esta coincidencia</td>
                        </tr>
                      ) : (
                        <tr>
                          <td>
                            <span className="alert alert-warning text-center">
                              Cambiar de usuario, provocara cerrar la{" "}
                              <strong>venta</strong> actual.
                            </span>
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              onClick={handleClose}
            >
              <i className="fas fa-ban mr-1"></i>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCustomerModal;
