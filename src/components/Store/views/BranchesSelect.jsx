/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BranchesSelect({
  branch_default = "0",
  showIcon = true,
  //functions
  setBranchId,
}) {
  const { list } = useSelector((state) => state.config);
  const [branch, setBranch] = useState(branch_default);
  const branches = [];
  //Functions
  const handleChangeBranch = ({ value }) => setBranch(parseInt(value));

  if (list && list.length) {
    list.forEach((co) => {
      branches.push({
        id: co.id,
        ...co.values,
      });
    });
  }

  useEffect(() => {
    if (setBranchId) setBranchId(branch);
  }, [branch]);

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
        value={branch}
        onChange={({ target }) => handleChangeBranch(target)}
      >
        <option value="0">-- Ninguna --</option>
        {branches.map((branch) => (
          <option value={branch.id} key={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  );
}
