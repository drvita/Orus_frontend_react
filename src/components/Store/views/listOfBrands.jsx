import React from "react";
import moment from "moment";

const ListOfBrandsComponent = (props) => {
  const { brands } = props;
  return (
    <table className="table m-0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Registrado</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => {
          return (
            <tr key={brand.id}>
              <td className="text-uppercase">{brand.name}</td>
              <td className="text-truncate">
                <i className="fas fa-clock mr-2"></i>
                {moment(brand.created_at).fromNow()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ListOfBrandsComponent;
