import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import AddBill from './addBills'

function Bills(){
const[availablebills, setAvailablebills]= useState([])

const [toggle, setToggle] = useState("hidden")

useEffect(()=>{
    const getBills = async()=>{
        axios.get("http://localhost:4444/api/v1/get-all-bills")
        .then((response)=>{
            setAvailablebills(response.data);
            console.log("bills response:", response)
        })
        .catch((error)=>console.log("error:", error))
    }
    getBills()
},[])

//add bill


    return(
    <div>
        <div className="py-6 px-4 text-right">
            <button className="py-2 px-4 bg-violet-400 hover:bg-violet-600 rounded-lg" onClick={(e)=>setToggle("block")}>ADD BILL</button>
        </div>
        <div className={`${toggle}`}>
            <AddBill cancel={(e)=>setToggle('hidden')} bills={availablebills} />
        </div>
        <div className="px-4">
            {
                availablebills.map((available)=>{
                    return(
                      
                            <div key={available._id} className="flex justify-between text-center px-0 md:px-4 my-2 bg-white py-1 hover:bg-slate-100 rounded-lg">
                                <h3 className="w-fit md:w-3/12">{available.name}</h3>
                                <h3 className="w-fit md:w-3/12 ">{available.period}</h3>
                                <h3 className="w-fit md:w-3/12">{available.amount}</h3>
                                <button className="bg-violet-300 py-1 px-4 rounded-lg w-2/12 hover:bg-violet-500">edit</button>
                            </div>
                       
                    )
                })
            }
        </div>
    </div>
    )
}
export default Bills