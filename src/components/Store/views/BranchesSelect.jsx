/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { ConfigContext } from "../../../context/ConfigContext";

export default function BranchesSelect({ branch_default , showIcon = true, setBranchId }) {
  
  const configContext = useContext(ConfigContext);
  const listBranches = configContext.data.filter((c) => c.name === "branches");

  return (
    <div className="input-group mb-3">
      {showIcon && (
        <div className="input-group-prepend">
          <span className="input-group-text bg-primary">
            <i className="fas fa-store-alt"></i>
          </span>
        </div>
      )}
      <select
        className="custom-select text-uppercase"
        name="branch_id"
        value={branch_default}
        onChange={({ target }) => setBranchId(target)}
      >
        <option value="0">-- Ninguna --</option> 
        {listBranches.map((branch)=>(
           <option value={branch.id} key={branch.id}>
           {branch.data.name}
         </option> 
        ))}       
      </select>
    </div>
  );
}
