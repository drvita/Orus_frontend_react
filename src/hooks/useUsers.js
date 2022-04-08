/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { api, setUrl } from "../utils/url";

export default function useUsers() {
  const [state, setState] = useState({
    listUsers: [],
    user: {},
  });

  const usersFilters = {
    orderby: "username",
    order: "asc",
    rol: 10,
    page: 1,
  };

  useEffect(() => {
    //const usersAPI = `users?orderby=username&order=asc&page=1`;
    const url = setUrl("users", null, usersFilters);
    api(url).then((data) => {
      if (data) {
        setState({
          ...state,
          listUsers: data.data,
        });
      } else {
        console.error("ERROR");
      }
    });
  }, []);

  return state;
}
