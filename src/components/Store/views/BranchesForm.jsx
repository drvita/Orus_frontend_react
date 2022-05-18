import { useContext } from "react";

//Context
import { ConfigContext } from "../../../context/ConfigContext";

//Components
import BranchesFormInputs from "./BranchesFormInputs";

export default function BranchesForm({ branches }) {

  console.log("Branches", branches);

  const configContext = useContext(ConfigContext);
  const configBranches = configContext.data.filter((c)=>c.name === 'branches');

  console.log("Config branches ------", configBranches);
  
  return (
    <form>
      {configBranches.map((branch) => {
        const currentBranch = branches.filter((i)=> i.branch_id === branch.id )
        console.log(currentBranch);
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
            />
            </div>
          </div>
        );
      })}
    </form>
  );
}
