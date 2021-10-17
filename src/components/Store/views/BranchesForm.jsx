import { useSelector } from "react-redux";
import BranchesFormInputs from "./BranchesFormInputs";

export default function BranchesForm({
  inBranches,
  store_item_id,
  branch_default,
}) {
  const { list } = useSelector((state) => state.config);
  const branches = [];

  if (list && list.length) {
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
  }

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
                <i className="fas fa-store-alt mr-1"></i> {branch.name}
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
