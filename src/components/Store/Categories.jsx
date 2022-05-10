/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Input from "../Input";
import useCategory from "../../hooks/useCategory";

export default function Categories(props) {

  const _categories = useCategory();

  const [state, setState] = useState({
    categories: [],
    cat1: 0,
    cat2: 0,
    cat3: 0,
    cat4: 0,
    load: true,
  });


  const input2 = state.categories.filter((cat) => cat.id === state.cat1)[0];
  const input3 = input2?.sons?.filter((cat) => cat.id === state.cat2)[0];
  const input4 = input3?.sons?.filter((cat) => cat.id === state.cat3)[0];
  const input5 = input4?.sons?.filter((cat) => cat.id === state.cat4)[0];

  // Functions
  const getCategories = () => {
    console.log("Function lista de categorias");
    _categories
      .getCategories({
        categoryid: "raiz",
      })
      .then(({ data: cat }) => {
        setState({
          ...state,
          categories: cat,
          load: false,
        });
      });
  };

  const getCategory = (id) => {
    console.log("Function Categoria individual");
    _categories.getCategory(id).then((cat) => {
      if (state.cat1 === parseInt(cat.code[0])) {
        if (state.cat2 === parseInt(cat.code[1])) {
          if (state.cat3 === parseInt(cat.code[2])) {
            if (state.cat4 === parseInt(cat.code[3])) {
              return;
            }
          }
        }
      }

      setState({
        ...state,
        cat1: parseInt(cat.code[0]),
        cat2: parseInt(cat.code[1]),
        cat3: parseInt(cat.code[2]),
        cat4: parseInt(cat.code[3]),
        load: false,
      });
    });
  };


  const handleReturn = () => {
    console.log("Handle return ejecutado");
    if (state.cat1 && input2 && !input2.sons?.length) {
      return props.handleChange(state.cat1, input2.code);
    } else if (props.category) {
      if (state.cat1 && !state.cat2 && !state.cat3 && !state.cat4) {
        return props.handleChange(0, []);
      }
    }

    if (state.cat2 && input3 && !input3.sons?.length) {
      return props.handleChange(state.cat2, input3.code);
    } else if (props.category) {
      if (state.cat1 && state.cat2 && !state.cat3 && !state.cat4) {
        return props.handleChange(0, []);
      }
    }

    if (state.cat3 && input4 && !input4.sons?.length) {
      return props.handleChange(state.cat3, input4.code);
    } else if (props.category) {
      if (state.cat1 && state.cat2 && state.cat3 && !state.cat4) {
        return props.handleChange(0, []);
      }
    }

    if (state.cat4) {
      return props.handleChange(state.cat4, input5?.code);
    }
  };

  useEffect(() => {
    if (!state.categories.length) {
      getCategories();
    }

    handleReturn();

  }, [state]);

  useEffect(() => {
    if (state.categories.length && props.category) {
      console.log("Segundo useEffect ejecutado si xd");
      getCategory(props.category);
    }
  }, [state.categories, props.category]);

  return (
    <div>
      <Input
        text="Seleccione una categoria principal"
        options={state.categories}
        value={state.cat1}
        load={state.load}
        handleChange={(val) =>
          setState({ ...state, cat1: val, cat2: 0, cat3: 0, cat4: 0 })
        }
      />

      {Boolean(state.cat1) && Boolean(input2?.sons?.length) && (
        <Input
          text={`Seleccione una categoria para ${input2.name}`}
          options={input2.sons}
          value={state.cat2}
          handleChange={(val) =>
            setState({ ...state, cat2: val, cat3: 0, cat4: 0 })
          }
        />
      )}

      {Boolean(state.cat2) && Boolean(input3?.sons?.length) && (
        <Input
          text={`Seleccione una categoria para ${input3.name}`}
          options={input3.sons}
          value={state.cat3}
          handleChange={(val) => setState({ ...state, cat3: val, cat4: 0 })}
        />
      )}

      {Boolean(state.cat2) && Boolean(input4?.sons?.length) && (
        <Input
          text={`Seleccione una categoria para ${input4.name}`}
          options={input4.sons}
          value={state.cat4}
          handleChange={(val) => setState({ ...state, cat4: val })}
        />
      )}
    </div>
  );
}
