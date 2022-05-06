import { api, setUrl } from "../utils/url";

export default function useUsers() {

  const getListUsers = async (filters)=>{
    const url = setUrl('users', null, filters);
    return await api(url);
  }

  const getUserById = async(ID) => {
    const url = setUrl('users', ID);
    return await api(url)
  }

  const deleteUser = async (ID) => {
    const url = setUrl('users', ID);
    return await api(url, 'DELETE', null);
  }

  const saveUser = async (data, ID)=> {

    if(ID){
      //Actualizamos
      console.log("Actualizar usuario modificado", ID, data);
      const url = setUrl('users', ID);
      return await api(url, 'PUT',data);
    }else{
      //Creamos uno nuevo
      const url = setUrl('users');
      return await api(url, "POST", data);
    }
  }

  return{
    getListUsers,
    getUserById,
    deleteUser,
    saveUser,
  }

}


