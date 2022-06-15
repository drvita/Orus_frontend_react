import { useState,useContext } from "react";
import { SaleContext } from "../../../context/SaleContext"
import InfoModal from "./InfoModal";

export default function InfoButton(){

    const saleContext = useContext(SaleContext);

    const [showModal, setShowModal] = useState(false);

    return(
        <div>
            <button
                className="btn btn-info"
                title="Ver actividad"
                disabled = {saleContext.id ? false : true}
                onClick = {()=> setShowModal(true)}                
            >
                <i className="fas fa-info"></i>
             </button>
            {showModal ? (
                <InfoModal
                    data = {saleContext.activitys ?? []}                
                    handleClose = {()=>{setShowModal(false)}}
                />
            ):null}
        </div>
    
    


    )
};