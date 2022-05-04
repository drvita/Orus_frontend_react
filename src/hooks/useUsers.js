import { api, setUrl } from "../utils/url";

export default function useUsers() {

  const getListUsers = async (filters)=>{
    console.log(filters);
    console.log("Funcion obetner lista de usuarios");
    const url = setUrl('users', null, filters);
    console.log(url);
    return await api(url);
  }

  const getUserById = async(ID) => {
    const url = setUrl('users', ID);
    console.log(url);
  }

  const deleteUser = async (ID) => {
    const url = setUrl('users', ID);
    console.log(url);
    return await api(url, 'DELETE', null);
  }

  return{
    getListUsers,
    getUserById,
    deleteUser,
  }

}

