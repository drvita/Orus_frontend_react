import { useContext } from "react";
import BranchesFormInputs from "./BranchesFormInputs";
import { ConfigContext } from "../../../context/ConfigContext";

export default function BranchesForm({ store_item_id, branch_default, item }) {

  const configContext = useContext(ConfigContext);

  const branches = configContext.data.filter((c)=>c.name === 'branches');


  //TODO: inBranches es la cantidad y precio del producto se leccionado
  //Se obttiene de la data del producto y se recibe directamente de las props
  
  const inBranches = item && item.data.inBranches ? item.data.inBranches : [];

 /*  if (list && list.length) {
    let branchesList = list;

    if (branch_default) {
      branchesList = branchesList.filter((i) => i.id === branch_default);
    }

    branchesList.forEach((co) => {
      branches.push({
        id: co.id,
        ...co.values,
      });
    });
  } */

  return (
    <form>
      {branches.map((branch) => {
        const currentBranch = inBranches.filter(
          (i) => i.branch_id === branch.id
        )[0];

        return (
          <div className="card" key={branch.id}>
            <div className="card-header">
              <h5 className="card-title text-primary text-capitalize">
                <i className="fas fa-store-alt mr-1"></i> {branch.data.name}
              </h5>
            </div>
            <div className="card-body">
              {currentBranch ? (
                <BranchesFormInputs
                  inBranch={currentBranch}
                  branch={branch}
                  store_item_id={store_item_id}
                />
              ) : (
                <BranchesFormInputs
                  branch={branch}
                  store_item_id={store_item_id}
                />
              )}
            </div>
          </div>
        );
      })}
    </form>
  );
}
