/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { connect } from "react-redux";

//Hooks
import useProducts from "../../../hooks/useProducts";

//Actions
import { storeActions } from "../../../redux/store/";

function SearchItemsComponent(props) {

  const hookProducts = useProducts();

  // Props and vars
  const {
      //items,
      meta,
      item = { producto: "" },
      _getList,
      _setList,
      handleItemSelect: _handleItemSelect,
    } = props,
    perPage = 10;



  // States
  const [search, setSearch] = useState(item.producto),

    [timer, setTimer] = useState(""),

    [load, setLoad] = useState(false);


  const [items, setItems] = useState([]);


 /*  useEffect(()=>{
    if(search.length === 0){
      return null
    }else{
      hookProducts.getProducts(search).then((data)=>{
        if(data){
          setTimeout(() => {
            setItems(data.data);
            setLoad(false);
          }, 2300);
        }
        else{
          console.error("Error al obtener la lista de productos");
        }
      })
    }
  },[search]) */


  // { dataLoggin: user } = useSelector((state) => state.users);
  // Functions
  const handleChangeSearch = ({ target }) => {
      const { value } = target;
      setSearch(value.toLowerCase());
      setLoad(true);
    };


  const handleSelect = (item) => {
    console.log(item);
      /* _setList({
        result: {
          list: [],
          metaList: {},
        },
      }); */

      _handleItemSelect(item);
      setSearch(item.name.toUpperCase());
      setItems([]);
    };

  useEffect(() => {
    let toTimer = null;
    if (search.length > 2 && !item.store_items_id) {
      console.log("Primer condicional");
      if (timer) clearTimeout(timer);
      toTimer = setTimeout(() => {
        hookProducts.getProducts(search).then((data)=>{
          if(data){
              setItems(data.data);
          }
          else{
            console.error("Error al obtener la lista de productos");
          }
        })
        setTimer("");
        setLoad(false);
      }, 1000);
      setTimer(toTimer);
    }
    if (!search.length && items.length) {
      console.log("Segundo condicional");
      if (timer) clearTimeout(timer);
      _setList({
        result: {
          list: [],
          metaList: {},
        },
      });
      setLoad(false);
    }
  }, [search]);


  useEffect(() => {
    return () => {
      _setList({
        result: {
          list: [],
          metaList: {},
        },
      });
    };
  }, []);

  return (
    <>
      <label>
        Producto
        {load ? (
          <small
            className="position-absolute text-primary ml-2"
            style={{ zIndex: "101", top: "0" }}
          >
            Buscando...
          </small>
        ) : null}
      </label>
      <input
        className="form-control text-uppercase text-truncate"
        type="text"
        placeholder="Buscar producto"
        autoComplete="off"
        value={search}
        onChange={handleChangeSearch}
      />
      {items.length && search.length > 2 ? (
        <div
          className="position-absolute shadow p-0 pt-2 pl-1 bg-white rounded w-100 mh-50 overflow-auto"
          style={{ maxHeight: "18rem", zIndex: "100" }}
        >
          <div className="list-group m-0 list-group-flush">
            {items
              .sort((a, b) => {
                if (a.cant > b.cant) {
                  return -1;
                }
                if (a.cant < b.cant) {
                  return 1;
                }
                return 0;
              })
              .map((product) => {
                return getItemToShow(product, handleSelect);
              })}
            {meta.total > perPage && (
              <a
                href="#more"
                className="list-group-item text-center text-dark text-bold"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-info-circle mr-1"></i>
                Existen mas registros, sea más espesifico
              </a>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = ({ storeItem }) => {
    return {
      items: storeItem.list,
      meta: storeItem.metaList,
      loading: storeItem.loading,
    };
  },
  mapActionsToProps = {
    _getList: storeActions.getListStore,
    _setList: storeActions.setListStore,
  };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchItemsComponent);

function getItemToShow(i, handleSelect) {
  if (i.cant !== i.cant_total) {
    if (!i.cant && i.cant_total) {
      return (
        <a
          key={i.id}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          href="#l"
          onClick={(e) => {
            e.preventDefault();
            handleSelect(i);
          }}
        >
          <span className="text-truncate text-uppercase text-muted">
            [S]-{i.name}
          </span>
          <span className="badge badge-dark badge-pill">{i.cant_total}</span>
        </a>
      );
    }
    return (
      <a
        key={i.id}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        href="#l"
        onClick={(e) => {
          e.preventDefault();
          handleSelect(i);
        }}
      >
        <span className="text-truncate text-uppercase text-primary">
          {i.name}
        </span>
        <span className="badge badge-dark badge-pill">{i.cant_total}</span>
      </a>
    );
  } else if (!i.cant_total && !i.cant) {
    return (
      <a
        key={i.id}
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        href="#l"
        onClick={(e) => {
          e.preventDefault();
          handleSelect(i);
        }}
      >
        <span className="text-truncate text-uppercase text-danger">
          [X]-{i.name}
        </span>
        <span className="badge badge-dark badge-pill">{i.cant_total}</span>
      </a>
    );
  }

  return (
    <a
      key={i.id}
      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      href="#l"
      onClick={(e) => {
        e.preventDefault();
        handleSelect(i);
      }}
    >
      <span className="text-truncate text-uppercase text-primary">
        {i.name}
      </span>
      <span className="badge badge-dark badge-pill">{i.cant}</span>
    </a>
  );
}
