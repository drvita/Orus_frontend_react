import {call, put} from 'redux-saga/effects';
import {api, getUrl} from '../../sagas/api';
import { configActions } from '../index';

export default function* handleGetBranches({payload}){
      try{
            const options = {
                page: 1,
                name: "branches",
                itemsPage: 10,
            };

            const url = getUrl("config", null, options);
            const result = yield call(api, url);
            if(result.data){
                yield put(configActions.setBranches(result.data));
            }
            else if(result.message){
                console.error(
                    "[Orus system] Error en la consulta de sucursales",
                    result.message
                  );
            }
      }
      catch(e){
        console.error(
            "[Orus System] Error en saga/config handleGetListConfig:",
            e.message
          );
      } 
}

