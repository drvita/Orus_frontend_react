import { useEffect, useState } from "react";

//Redux
import { connect } from "react-redux";

//Context
import { Sale } from "../../../context/SaleContext";

//Components
import ListModal from "./ListItemsModal";

//Hooks
import useProducts from '../../../hooks/useProducts';

//Helper
import helper from '../helpers';

function InputSearchItem({ messages, loading }) {

  //State
  const [textSearch, setTextSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [cantDefault, setCantDefault] = useState(1);
  const [list, setList] = useState([]);

  const  sale = Sale();
  const { session } = sale;
  const hookProducts = useProducts();

  //const { getProducts, productList: list } = useProducts();

  //Functions
  const handleChangeTextSearch = ({ value }) => {
      setTextSearch(value);
    },

    handlePressEnter = (key) => {
      if (key === "Enter") {
        searchItem();
      }
    },

    searchItem = () => {
      if (textSearch.length > 2) {
        const codes = textSearch.split("*");
        let search = textSearch;

        if (codes.length === 2) {
          search = codes[1];
          setCantDefault(parseInt(codes[0]));
        }

        hookProducts.getProducts(search).then((data)=>{
          if(data){
            console.log(data)
            setList(data.data);
          }else{
            console.error("Error al buscar el producto")
          }
        })
        //getProducts(search);
        setTextSearch("");
      }
    },

    handleCloseModal = () => {
      setShowList(false);
    },

    makeItem = (data) => {
      return {
        id: 0,
        cant: data.cant,
        price: parseFloat(data.item.precio),
        subtotal: parseInt(data.cant) * parseFloat(data.item.precio),
        inStorage:
          parseInt(data.item.cantidades) >= parseInt(data.cant) ? true : false,
        out: parseInt(data.item.cantidades) - parseInt(data.cant),
        cantInStore: parseInt(data.item.cantidades),
        session,
        store_items_id: data.item.id,
        descripcion: data.item.descripcion,
        producto: data.item.name.toLowerCase(),
        category: data.item.categoria ? data.item.categoria.id : 0,
      };
    },

    handleSelectItem = (data) => {
      const item = makeItem(data);
      handleAddItem(item);
      setCantDefault(1);
    },

    handleAddItem = (result) => {
      const found = sale.items.filter(
        (item) => item.store_items_id === result.store_items_id
      );

      let newItems = sale.items.filter(
        (item) => item.store_items_id !== result.store_items_id
      );

      if (found.length) {
        const cantidad = parseInt(result.cant) + parseInt(found[0].cant),
          item = {
            ...found[0],
            cant: cantidad,
            subtotal: parseFloat(result.price) * cantidad,
            inStorage: cantidad >= parseInt(result.cantInStore) ? true : false,
            out: parseInt(result.cantInStore) - cantidad,
          };
        newItems.push(item);
      } else {
        newItems.push(result);
      }

      let subtotal = helper.getSubTotal(newItems);

      sale.set({
        ...sale,
        items: newItems,
        total: helper.getTotal(subtotal, sale.discount),
        subtotal: subtotal,
      })
    };

  useEffect(() => {
    if (list.length) {
      if (list.length === 1) {
        const item = makeItem({
          item: list[0],
          cant: cantDefault ? cantDefault : 1,
        });

        if(item.price <= 0){
          window.Swal.fire({
            title: "Verificar",
            text: `El item que intentas agregar tiene un precio de $0, revisa el precio en el almacen`,
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
          })
        }else{
          handleAddItem(item);
          setCantDefault(1);
        }
      } else {
        setShowList(true);
      }
    } else if (!list.length && messages.length) {
      messages.forEach((msg) => {
        const { type, text } = msg;
        window.Swal.fire({
          icon: type,
          title: text,
          showConfirmButton: type !== "error" ? false : true,
          timer: type !== "error" ? 1500 : 9000,
        });
      });
    }

  }, [list]);

  return (
    <div className="btn-group text-center d-print-none">
      <input
        className="form-control"
        placeholder="Codigo"
        onChange={({ target }) => handleChangeTextSearch(target)}
        onKeyPress={({ key }) => handlePressEnter(key)}
        value={textSearch}
      />
      {loading ? (
        <i className="fas fa-2x fa-spinner fa-spin"></i>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={searchItem}
          disabled={textSearch.length > 2 ? false : true}
        >
          <i className="fas fa-barcode"></i>
        </button>
      )}

      {showList && list.length ? (
        <ListModal
          items={list}
          cantDefault={cantDefault}
          handleClose={handleCloseModal}
          handleSelect={handleSelectItem}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = ({ storeItem }) => {
    return {
      loading: storeItem.loading,
      messages: storeItem.messages,
    };
  }
export default connect(mapStateToProps)(InputSearchItem);
