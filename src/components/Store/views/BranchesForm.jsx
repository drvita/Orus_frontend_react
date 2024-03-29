import { useContext } from "react";

//Context
import { ConfigContext } from "../../../context/ConfigContext";

//Components
import BranchesFormInputs from "./BranchesFormInputs";

export default function BranchesForm({ branches, storeItemID, defaultBranch }) {

  const configContext = useContext(ConfigContext);
  const configBranches = configContext.data.filter((c)=>c.name === 'branches');

  return (
    <form>

      {defaultBranch === 0 ? 
        configBranches.map((branch) => {
          const currentBranch = branches.filter((i)=> i.branch_id === branch.id )          
          return (
            <div className="card" key={branch.id}>
              <div className="card-header">
                <h5 className="card-title text-primary text-capitalize">
                  <i className="fas fa-store-alt mr-1"></i> {branch.data.name}
                </h5>
              </div>
              <div className="card-body">
              <BranchesFormInputs
                inBranch={currentBranch[0] ?? {}}
                branchID = {branch.id}
                storeItemID = {storeItemID}
              />
              </div>
            </div>
          );
        })      
      :
        configBranches.map((branch) => {
          
          const currentBranch = branches.filter((i)=> i.branch_id === branch.id );          

          if(branch.id === defaultBranch){
            return (
              <div className="card" key={branch.id}>
                <div className="card-header">
                  <h5 className="card-title text-primary text-capitalize">
                    <i className="fas fa-store-alt mr-1"></i> {branch.data.name}
                  </h5>
                </div>
                <div className="card-body">
                <BranchesFormInputs
                  inBranch={currentBranch[0] ?? {}}
                  branchID = {branch.id}
                  storeItemID = {storeItemID}
                />
                </div>
              </div>
            )
          }else{ return null}
        }         
        )
      }
    </form>
  );
}