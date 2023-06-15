import axios from "axios";
import {createContext} from 'react';

const billsContext = createContext('');

const getBills = async()=>{
    axios.get("https://api.rhonpesa.online/api/v1/get-all-bills")
    .then((response)=>{
        //console.log("response:", response.data)
    })
    .catch((error)=>console.log("error:", error))
}


getBills();

console.log("bills context",billsContext);

export default billsContext;
