export default function InputCategoryComponent(props) {
  const {
    categoryData,
    category,
    textSelect,
    index,
    references,
    handleChangeCategory: _handleChangeCategory,
  } = props;

  const handleChangeCategory = (target) => {
    const { value } = target;

    if (_handleChangeCategory)
      _handleChangeCategory({ index, value: parseInt(value) });
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
        name={"category" + index}
        value={category ?? ""}
        onChange={({ target }) => handleChangeCategory(target)}
        ref={references}
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
