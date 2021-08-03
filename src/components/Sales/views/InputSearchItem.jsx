import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { storeActions } from "../../../redux/store/index";
//Components
import ListModal from "./ListItemsModal";

function InputSearchItem({ list, _getList, _setList, handleAdd: _handleAdd }) {
  const [textSearch, setTextSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [cantDefault, setCantDefault] = useState(0);
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
    handleSelectItem = (item) => {
      _setList({
        result: {
          list: [],
          metaList: {},
        },
      });
      _handleAdd(item);
      setCantDefault(1);
    };

  useEffect(() => {
    if (list.length) {
      if (list.length === 1) {
        console.log("[DEBUG] Se encontro 1", list[0]);
      } else {
        setShowList(true);
      }
    }
  }, [list]);

  return (
    <div className="btn-group float-right text-center">
      <input
        className="form-control"
        placeholder="Barcode"
        onChange={({ target }) => handleChangeTextSearch(target)}
        onKeyPress={({ key }) => handlePressEnter(key)}
        value={textSearch}
      />
      <button type="button" className="btn btn-primary" onClick={searchItem}>
        <i className="fas fa-barcode"></i>
      </button>
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
  };

export default connect(mapStateToProps, mapActionsToProps)(InputSearchItem);
