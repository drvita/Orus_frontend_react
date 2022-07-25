import { api, setUrl } from "../utils/url";

export default function useMessenger(){

    const getMessages = async(options)=>{
        const url = setUrl('messengers');
        return await api(url);
    };

    const sendMessenger = async(bodyRequest)=>{
        if(bodyRequest){
            const url = setUrl('messengers');
            const METHOD = 'POST';
            return await api(url,METHOD,bodyRequest);
        }
    };

    return{
        getMessages,
        sendMessenger,
    }

}
