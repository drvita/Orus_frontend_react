export default function InputCategoryComponent(props) {
  const { categoryData, categoryName, category, textSelect, categoryRef } =
    props;

  const handleChangeCategory = (target) => {
    const { value } = target,
      { categoryData, handleChangeCategory: _handleChangeCategory } = props;

    let search = parseInt(value),
      category = categoryData.find((i) => i.id === search);
    if (!search) {
      category = {
        id: 0,
      };
    }

    _handleChangeCategory(category);
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className={
            category
              ? "input-group-text bg-primary"
              : "input-group-text bg-warning"
          }
        >
          <i className="fas fa-sort-amount-down"></i>
        </span>
      </div>
      <select
        className="custom-select text-uppercase"
        name={categoryName}
        value={category}
        onChange={({ target }) => handleChangeCategory(target)}
        ref={categoryRef}
      >
        <option value="0">--{textSelect}--</option>
        {categoryData.map((cat) => {
          return (
            <option value={cat.id} key={cat.id}>
              {cat.categoria ? cat.categoria : cat.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
