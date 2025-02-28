/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputCategory from "../views/input_category";
import useCategory from "../../../hooks/useCategory";

export default function CategoriesProcess({
  category,
  setCategoryId: _setCategoryId,
}) {
  const _categories = useCategory();

  const categoryParents = category.code?.split("|");
  const [state, setState] = useState({
    categories: [],
  });
  const [categoryId, setCategoryId] = useState({
    id0: parseInt(categoryParents[0]),
    id1: parseInt(categoryParents[1]),
    id2: parseInt(categoryParents[2]),
    id3: parseInt(categoryParents[3]),
  });
  const [categoryList, setCategoryList] = useState({
    list0: state.categories,
    list1: null,
    list2: null,
    list3: null,
  });
  const inputCategory = [];
  // Functions
  const getCategories = () => {
    _categories
      .getCategories({
        categoryid: "raiz",
      })
      .then(({ data: cat }) => {
        setState({
          ...state,
          categories: cat,
        });
      });
  };
  const handleChangeCat = (target) => {
    const categories = getDataCategoriesId(target, categoryId);

    setCategoryId(categories);

    if (_setCategoryId) {
      const idsCategories = Object.values(categories).filter((i) => i !== null),
        idsCount = idsCategories.length - 1,
        idsSelect = idsCategories[idsCount];

      _setCategoryId({
        id: idsSelect,
        parents: Object.values(categories).join("|"),
      });
    }
  };

  useEffect(() => {
    const list = routerCategory(categoryId, categoryList);
    getCategories();
    setCategoryList({
      ...categoryList,
      ...list,
    });
  }, [categoryId]);

  Object.values(categoryList).forEach((list, index) => {
    if (list && list.length) {
      const categoryIdInput = Object.values(categoryId)[index];

      inputCategory.push(
        <InputCategory
          categoryData={list}
          category={categoryIdInput ? categoryIdInput : 0}
          index={index}
          textSelect="Seleccione una categoria"
          handleChangeCategory={handleChangeCat}
          // references={references[index]}
        />
      );
    }
  });

  return (
    <div>
      {inputCategory.map((list, index) => (
        <div key={index}>{list}</div>
      ))}
    </div>
  );
}

function routerCategory(categoryId, categoryList) {
  let list1 = [],
    list2 = [],
    list3 = [];

  Object.keys(categoryId).forEach((key) => {
    switch (key) {
      case "id0":
        list1 = getDataSong({
          id: categoryId.id0,
          categories: categoryList.list0,
        });
        break;
      case "id1":
        list2 = getDataSong({
          id: categoryId.id1,
          categories: list1,
        });
        break;
      case "id2":
        list3 = getDataSong({
          id: categoryId.id2,
          categories: list2,
        });
        break;
      default:
        break;
    }
  });

  return {
    list1,
    list2,
    list3,
  };
}

function getDataSong(data) {
  if (data.id && data.categories.length) {
    const categories = data.categories.filter((cat) => cat.id === data.id);
    return categories && categories.length ? categories[0].sons : [];
  }

  return [];
}

function getDataCategoriesId({ index, value }, categoryId) {
  let categories = {};
  switch (index) {
    case 0:
      categories = {
        id0: value,
        id1: null,
        id2: null,
        id3: null,
      };
      break;
    case 1:
      categories = {
        id0: categoryId.id0,
        id1: value,
        id2: null,
        id3: null,
      };
      break;
    case 2:
      categories = {
        id0: categoryId.id0,
        id1: categoryId.id1,
        id2: value,
        id3: null,
      };
      break;
    case 3:
      categories = {
        id0: categoryId.id0,
        id1: categoryId.id1,
        id2: categoryId.id2,
        id3: value,
      };
      break;

    default:
      categories = {
        id0: null,
        id1: null,
        id2: null,
        id3: null,
      };
      break;
  }

  return categories;
}
