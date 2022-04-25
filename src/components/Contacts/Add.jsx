/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
//Components
import Personal from "./views/Personal";
import Domicilio from "./views/Address";
import Telefono from "./views/Phones";
import ListSales from "../Sales/views/listOfSales_delete";
import Dashboard from "./Dashboard";
import ListBrands from "../Store/views/listOfBrands";
import ListOrders from "../Order/views/listOfOrders";
import CardExams from "../Exam/cards/List";
import Confirm from "../../layouts/modal";
import useContact from "../../hooks/useContact";
import helper from "./helper";

const initialState = {
  id: 0,
  name: "",
  rfc: "",
  gender: "male",
  email: "",
  type: 0,
  business: 0,
  birthday: moment(),
  phone_notices: "",
  phone_cell: "",
  phone_office: "",
  age: "",
  address_street: "",
  address_neighborhood: "",
  address_location: "Colima",
  address_state: "Colima",
  address_zip: "",
  done: {
    purchases: [],
    brands: [],
    supplier_of: [],
    orders: [],
    exams: [],
  },
  analytics: {
    purchases: 0,
    exams: 0,
    brands: 0,
    suppliers: 0,
    orders: 0,
  },
  metadata: {
    created_at: "",
    updated_at: "",
    deleted_at: "",
    created: "",
    updated: "--",
  },
  validates: {
    name: false,
    email: false,
    birthday: false,
    phones: false,
  },
  loading: false,
};

/**
 * DEFAULT COMPONENT
 */
export default function AddContact(props) {
  const { id } = props.match.params;
  const { handleNewOrEdit: _handleNewOrEdit, showModal = false } = props;
  const _contacts = useContact();
  const [contact, setContact] = useState(initialState);
  const {
    done: { purchases, brands, supplier_of, orders, exams },
    analytics,
    metadata,
  } = contact;
  const history = useHistory();
  let btn_enabled =
    Object.values(contact.validates).filter((val) => val).length === 4;
  // Functions
  const handleChangeData = (key, value) => {
    if (!key) return;

    if (contact[key] === value) {
      return;
    }

    setContact({
      ...contact,
      [key]: value,
    });
  };
  const handleSaveContact = () => {
    const data = {
      id: contact.id,
      name: contact.name,
      rfc: contact.rfc,
      gender: contact.gender,
      email: contact.email,
      type: contact.type,
      business: contact.business,
      birthday: contact.birthday.format("YYYY/MM/DD"),
      telnumbers: {
        notices: contact.phone_notices,
        cell: contact.phone_cell,
        office: contact.phone_office,
      },
      domicilio: {
        street: contact.address_street,
        neighborhood: contact.address_neighborhood,
        location: contact.address_location,
        state: contact.address_state,
        zip: contact.address_zip,
      },
    };

    window.Swal.fire({
      title: "Contactos",
      text: data.id
        ? "¿Desea actualizar a este contacto?"
        : "¿Desea crear un nuevo contacto?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: data.id ? "Actualizar" : "Crear",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then(({ dismiss }) => {
      if (!dismiss) {
        _contacts.saveContact(data).then((res) => {
          if (res?.id) {
            console.log("[Orus System] Create contatc successfully", res.id);
            _handleNewOrEdit();
          }
        });
      }
    });
  };

  useEffect(() => {
    if (id) {
      _contacts.getContact(parseInt(id)).then((data) => {
        processData(data, setContact);
      });
    }
  }, [id]);

  return (
    <>
      {contact.id ? (
        <Dashboard analytics={analytics} metadata={metadata} />
      ) : null}

      <div className="row">
        <div className="col-md-12">
          {metadata.deleted_at ? (
            <div className="alert alert-warning">
              <h4 className="alert-heading">
                <i className="fas fa-info-circle mr-1"></i>
                Precaucion!
              </h4>
              <p>
                Este contacto fue eliminado por {contact.updated?.name} el{" "}
                {moment(contact.deleted_at).format("LLLL")}
              </p>
            </div>
          ) : null}
          <div className="card card-indigo card-outline">
            <div className="card-header">
              <h3 className="card-title text-indigo">
                <i className="fas fa-address-book mr-1"></i>
                {contact.id ? (
                  <label>
                    Editar contacto
                    <span className="badge bg-indigo ml-2">{contact.id}</span>
                  </label>
                ) : (
                  <label>Registrar nuevo contacto</label>
                )}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                  Datos personales
                </h6>
                <Personal
                  data={contact}
                  handleChange={handleChangeData}
                  fn={_contacts}
                />
              </div>
              <div className="row mt-5 border-top pt-5">
                <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                  Medios de contacto <span className="text-orange">*</span>
                  {!contact.validates.phones && (
                    <small className="d-block w-100">
                      <span className="text-orange">
                        Ingrese por lo menos un telefono
                      </span>
                    </small>
                  )}
                </h6>
                <Telefono data={contact} handleChange={handleChangeData} />
              </div>
              {!contact.type ? (
                <div className="row mt-5 border-top pt-5">
                  <h6 className="card-subtitle text-muted d-block w-100 mb-4 text-center">
                    Domicilios del contacto
                  </h6>
                  <Domicilio
                    data={contact}
                    domicilios={
                      contact.address ?? {
                        calle: "",
                        colonia: "",
                        municipio: "",
                        estado: "",
                        cp: "",
                      }
                    }
                    handleChange={handleChangeData}
                  />
                </div>
              ) : null}
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-12">
                  <div className="btn-group float-right" role="group">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        history.push("/contactos");
                        _handleNewOrEdit();
                      }}
                    >
                      <i
                        className={
                          contact.id
                            ? "fas fa-arrow-left mr-2"
                            : "fas fa-ban mr-2"
                        }
                      ></i>
                      <strong>{contact.id ? "Cerrar" : "Cancelar"}</strong>
                    </button>
                    <button
                      type="button"
                      className="btn bg-indigo"
                      onClick={() => handleSaveContact()}
                      disabled={!btn_enabled}
                    >
                      <i className="fas fa-save mr-1"></i>
                      {contact.id ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {contact.loading && (
              <div className="overlay dark">
                <i className="fas fa-2x fa-sync-alt fa-spin"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      {contact.id ? (
        <div className="content" id="details">
          <div className="row">
            {!contact.type && (
              <div className="col">
                <CardExams exams={exams} />
              </div>
            )}

            {purchases.length ? (
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-indigo text-bold w-100 mb-2">
                      <i className="fas fa-money-bill mr-1"></i>
                      Compras
                    </h5>
                    <ListSales sales={purchases} />
                  </div>
                </div>
              </div>
            ) : null}

            {brands.length ? (
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-indigo text-bold w-100 mb-2">
                      <i className="fas fa-copyright mr-1"></i>
                      Marcas
                    </h5>
                    <ListBrands brands={brands} />
                  </div>
                </div>
              </div>
            ) : null}

            {supplier_of.length ? (
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-indigo text-bold w-100 mb-2">
                      <i className="fas fa-building mr-1"></i>
                      Laboratorio
                    </h5>
                    <ListOrders orders={supplier_of ?? []} />
                  </div>
                </div>
              </div>
            ) : null}

            {orders.length ? (
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-indigo text-bold w-100 mb-2">
                      <i className="fas fa-shopping-basket mr-1"></i>
                      Pedidos
                    </h5>
                    <ListOrders orders={orders ?? []} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {showModal && (
        <Confirm body={dataBodyConfirm(10)} handleCancel={() => {}} />
      )}
    </>
  );
}

function processData(data, setData) {
  if (data) {
    setData({
      id: data.id,
      name: data.name?.toLowerCase(),
      rfc: data.rfc?.toUpperCase(),
      gender: data.metadata?.gender,
      email: data.email?.toLowerCase(),
      type: data.type,
      business: data.business,
      birthday: data.age ? moment(data.metadata?.birthday) : moment(),
      phone_notices: data.phones?.notices,
      phone_cell: data.phones?.cell,
      phone_office: data.phones?.office,
      age: data.age ?? 0,
      address_street: data.address?.street.toLowerCase(),
      address_neighborhood: data.address?.neighborhood.toLowerCase(),
      address_location: data.address?.location.toLowerCase(),
      address_state: data.address?.state.toLowerCase(),
      address_zip: data.address?.zip.toLowerCase(),
      done: {
        purchases: data.purchases,
        brands: data.brands,
        supplier_of: data.supplier_of,
        orders: data.orders,
        exams: data.exams,
      },
      analytics: {
        purchases: data.purchases_count,
        exams: data.exams_count,
        brands: data.brands_count,
        suppliers: data.suppliers_count,
        orders: data.orders_count,
      },
      metadata: {
        created_at: data.created_at ? moment(data.created_at) : moment(),
        updated_at: data.updated_at ? moment(data.updated_at) : moment(),
        deleted_at: data.deleted_at ?? "",
        created: data.created?.username.toLowerCase() ?? "",
        updated: data.updated?.username.toLowerCase() ?? "--",
      },
      validates: {
        name: data.name?.length > 5,
        email: helper.isEmail(data.email),
        birthday: Boolean(moment().diff(data.metadata?.birthday, "days") > 0),
        phones: Boolean(
          Object.values(data.phones ?? {}).filter(
            (phone) => phone.length === 10
          ).length
        ),
      },
      loading: false,
    });
  }
}

function dataBodyConfirm(id_exam) {
  return (
    <div>
      <p className="text-center">¿Realmente desea ver el examen?</p>
      <div className="text-center">
        <Link to={`/consultorio/${id_exam}`} className="btn btn-primary">
          Confirmar
        </Link>
      </div>
    </div>
  );
}
