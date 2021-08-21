import { useEffect, useState } from "react";
import { connect } from "react-redux";
//Actions
import { saleActions } from "../../../redux/sales";
import { storeActions } from "../../../redux/store/index";
//Components
import ListModal from "./ListItemsModal";

function InputSearchItem({
  sale,
  list,
  loading,
  //Functions
  _getList,
  _setList,
  _setSale,
}) {
  //State
  const [textSearch, setTextSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [cantDefault, setCantDefault] = useState(1);
  const { session } = sale;
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

        _getList({
          search,
        });
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
        producto: data.item.producto.toLowerCase(),
        category: data.item.categoria ? data.item.categoria.id : 0,
      };
    },
    handleSelectItem = (data) => {
      const item = makeItem(data);
      _setList({
        result: {
          list: [],
          metaList: {},
        },
      });
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

      _setSale({
        ...sale,
        items: newItems,
      });
    };

  useEffect(() => {
    if (list.length) {
      if (list.length === 1) {
        const item = makeItem({
          item: list[0],
          cant: cantDefault ? cantDefault : 1,
        });
        handleAddItem(item);
        setCantDefault(1);
      } else {
        setShowList(true);
      }
    }

    //eslint-disable-next-line
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
      list: storeItem.list,
      meta: storeItem.metaList,
    };
  },
  mapActionsToProps = {
    _getList: storeActions.getListStore,
    _setList: storeActions.setListStore,
    _setSale: saleActions.setSale,
  };

export default connect(mapStateToProps, mapActionsToProps)(InputSearchItem);
