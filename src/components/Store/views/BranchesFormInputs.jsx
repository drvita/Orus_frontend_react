import { useState, useEffect } from "react";

//Hooks
import useStore from "../../../hooks/useStore";

export default function BranchesFormInputs({ inBranch, branchID, storeItemID }) {

  //console.log(storeItemID);

  const hookStore = useStore();
  //const storeContext = useContext(StoreContext);

  const [data, setData] = useState({
    id: 0,
    cant:0,
    price: 1,
    store_item_id: 0,
    branch_id:0,
    readyToSave: false,
  });

  const handleChangeInput = ({ name, value }) => {
    let readyToSave = false;
    if (name === "cant") {
      value = parseInt(value);
    } else {
      value = parseFloat(value);
    }

    if (inBranch[name] !== value) {
      readyToSave = true;
    }
    setData({
      ...data,
      readyToSave,
      [name]: value,
    });
  };

  const handleSaveInBranch = () => {
    hookStore.saveQantityandPrice(data).then((data)=>{
      if(data){
        console.log("Data devuelta", data);
        

      }else{
        console.error("Error al guardar la informacion");
      }
    });
    setData({
      ...data,
      readyToSave: false,
    });
  };

  useEffect(()=>{
    setData({
      id: inBranch.id ? inBranch.id : 0,
      cant: inBranch.cant ? inBranch.cant : 0,
      price: inBranch.price ? inBranch.price : 0,
      readyToSave: false,
      store_item_id: storeItemID,
      branch_id: branchID,
    });
  }, [inBranch])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="row">
        <div className="col">
          <small>
            <label>Cantidad en existencia</label>
          </small>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary">
                <i className="fas fa-database"></i>
              </span>
            </div>
            <input
              type="number"
              className="form-control text-right"
              placeholder="Cantidades en existencia"
              name="cant"
              onChange={({ target }) => handleChangeInput(target)}
              value={data.cant}
              min={0}
            />
          </div>
        </div>
        <div className="col">
          <small>
            <label>Precio</label>
          </small>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-primary">
                <i className="fas fa-money-bill"></i>
              </span>
            </div>
            <input
              type="number"
              className="form-control text-right"
              placeholder="Precio"
              name="price"
              onChange={({ target }) => handleChangeInput(target)}
              value={data.price}
              min={0}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-right">
          <button
            className={
              !data.readyToSave ? "btn btn-secondary" : "btn btn-success"
            }
            type="button"
            onClick={handleSaveInBranch}
            disabled={!data.readyToSave}
          >
            <i className="fas fa-save mr-1"></i> Guardar
          </button>
        </div>
      </div>
    </>
  );
}
