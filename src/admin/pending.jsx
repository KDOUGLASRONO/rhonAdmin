import {useState, useContext, useEffect, useMemo} from 'react'
import { dataContext } from './layout'
import axios from 'axios'
import baseURL from '../baseURL'


function Pending(){
    const[datas,setDatas] = useContext(dataContext)
  
    

    useEffect(()=>{
        
        console.log("usecontext datas: ",datas.merchantsData)
       
    },[])

    const handleApprove = (e)=>{
        console.log("click event", e.currentTarget.id)
        axios.put(`${baseURL}/api/v1/merchant/approve/${e.currentTarget.id}`)
        .then((response)=>console.log("put response",response))
        .catch((error)=>console.log("error put",error))
    }

    return(
        <div className="px-4 py-4 w-full">
            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full flex text-center justify-between'>
                        <th className="w-1/3">name</th>
                        <th className="w-1/3">crated</th>
                        <th className="w-1/3">dtatus</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {
                        datas.merchantsData.map((item)=>{
                            return(
                                (!item.isApproved)?
                                    <tr key={item._id} className='w-full flex py-2 px-2 my-1 bg-white text-center justify-between hover:bg-slate-100 cursor-pointer'>
                                        <td className="w-1/3">{item.business_name}</td>
                                        <td className="w-1/3">{item.createdAt}</td>
                                        <td className="w-1/3">
                                            <button className="bg-red-900 py-1 px-2 mr-2 rounded-lg hover:bg-red-700 text-white">Reject</button>
                                            <button className="bg-green-900 py-1 px-2 rounded-lg hover:bg-green-700 text-white" id={item._id} onClick={handleApprove}>Approve</button>
                                        </td>
                                    </tr>:
                               null
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Pending