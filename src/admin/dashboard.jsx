import {useEffect, useState, useContext} from 'react'
import axios from "axios";
import {dataContext} from './layout'
import baseUrl from '../baseUrl'



const api = {
    realAnalytics:`${baseUrl}/analytics`,
    transactions:`${baseUrl}/transactions`,
    merchants:`${baseUrl}/merchants`,
    withdrawals:`${baseUrl}/withdrawals`,
}

function Dashboard(){
    const [realAnalytics, setRealAnalytics] = useState({})



    useEffect(()=>{

        const getData = async()=>{
            await axios.get(api.realAnalytics)
            .then((response)=>{
                setRealAnalytics(response.data);
            })
            .catch((error)=>console.log("error",error));
        }
        getData();
    },[])

    return(
        <div className=" md:grid grid-cols-3 ">
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">{/*data.merchants.length +*/ parseInt(realAnalytics.merchants)}</h3>
                <h3 className="text-xl">Merchants</h3> 
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">
                    {
                        /*data.transactionAmounts.reduce((a,b)=>{
                        return parseInt(a) + parseInt(b) + 455;
                        },0)*/
                        realAnalytics.payments
                    }
                </h3>
                 <h3 className="text-xl">total Transacted</h3>
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">{realAnalytics.pending_merchants}</h3>
                 <h3 className="text-xl">Pending Merchant approvals</h3>
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">1</h3>
                 <h3 className="text-xl">all admins</h3>
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
               <h3 className="text-4xl">
                    {/*data.totalWithdrawn.reduce((a,b)=>{
                            return parseInt(a) + parseInt(b) + 2010;
                            },0)*/
                            realAnalytics.withdrawals
                    }
                </h3>
                <h3 className="text-xl">Total withdrawn</h3>
            </div>
            <div>

                <h3>Total Revenue</h3>
            </div>
        </div>
    )
}
export default Dashboard