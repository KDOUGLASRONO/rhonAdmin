import{useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {useTable} from 'react-table'
import Details from './merchantDetail'


function Merchants(){
    const[rhonMerchants, setRhonMerchnants] = useState("");
    const[merchants, setMerchants] = useState([]);
    const[show, setShow] = useState('hidden');
    const[activeMerchant, setActiveMerchant] = useState({});
    const[activeId, setActiveId] = useState("");

    let merchantsApi = "http://localhost:4444/api/v1/merchants"
    const merchantsRhon = "https://api.rhonpesa.online/api/v1/merchants"

    useEffect(()=>{
        const fetchData = async()=>{
            await axios.all([axios.get(merchantsApi),axios.get(merchantsRhon)])
            .then(
                axios.spread((...responses)=>{
                   setMerchants(responses[0].data);
                   setRhonMerchnants(responses[1].data.reverse()); 
                   console.log("server response:", responses[1].data);
                })
            )
            .catch(err=>console.log("error:", err));
        }
        fetchData();
       
    }, [])

    const handleClick = (e)=>{
      (merchants.concat(rhonMerchants)).map((item)=>{
        if(item._id==e.target.id){
          console.log("comparison:", item._id, "!=", e.target.id);
          setActiveMerchant(item)
          setActiveId(item._id)
        }
      })

      console.log("click event", typeof(e.target.id))
      setShow(!show);
    }
  
    return (
      <div className="w-full">
        <div className={(show=='hidden')?"block py-4 px-4":"hidden py-4 px-4"}>
            <table className='w-full'>
                <thead className='w-full'>
                    <tr className='w-full flex text-center justify-between'>
                        <th className="w-1/3">name</th>
                        <th className="w-1/3">created</th>
                        <th className="w-1/3">dtatus</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {
                        (merchants.concat(rhonMerchants)).map((item)=>{
                            return(
                                (item.isApproved)?
                                    <tr key={item._id} className='w-full flex py-2 px-2 my-1 bg-white text-center justify-between hover:bg-slate-100 cursor-pointer'>
                                        <td className="w-1/3">{item.business_name}</td>
                                        <td className="w-1/3">{item.createdAt}</td>
                                        <td className="w-1/3">
                                            <button className="bg-green-900 py-1 px-2 rounded-lg hover:bg-green-700 text-white" id={item._id} onClick={handleClick}>details</button>
                                        </td>
                                    </tr>:
                               null
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className={`${show} w-full h-full`}>
        {
            (activeId)?
            <Details merchant={activeMerchant} id={activeId} close={(e)=>{setActiveId("");setShow("hidden")}}/>:
            null
        } 
        </div>
    </div>
    );
}
export default Merchants