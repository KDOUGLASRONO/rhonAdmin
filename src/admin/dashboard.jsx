import {useEffect, useState, useContext} from 'react'
import axios from "axios";
import {dataContext} from './layout'



const api = {
    realAnalytics:"https://api.rhonpesa.online/api/v1/analytics",
    transactions:"http://localhost:4444/api/v1/transactions",
    merchants:"http://localhost:4444/api/v1/merchants",
    withdrawals:"http://localhost:4444/api/v1/withdrawals"
}

function Dashboard(){
    const [datas,setDatas] = useContext(dataContext)
    const [realAnalytics, setRealAnalytics] = useState({})
    

    const [data, setData] = useState({

        merchants:[],
        transactions:[],
        withdrawals:[],
        transactionAmounts:[],
        totalWithdrawn:[]
    })



    useEffect(()=>{
        const getData = async()=>{
            await axios.all([axios.get(api.merchants),axios.get(api.transactions),axios.get(api.withdrawals),axios.get(api.realAnalytics)])
            .then(
                axios.spread((...response)=>{
                    setData({
                        merchants: response[0]?.data,
                        transactions: response[1]?.data,
                        withdrawals: response[2]?.data,
                        transactionAmounts:response[1]?.data.map((item)=>item.amount),
                        totalWithdrawn:response[2]?.data.map((item)=>item.amount),

                    })
                    setDatas({
                        merchantsData: response[0]?.data.reverse(),
                        transactionsData: response[1]?.data.reverse(),
                        withdrawalsData: response[2]?.data.reverse()
                    })
                    console.log("realAnalytics:", response[3].data)
                    setRealAnalytics(response[3].data);

                    console.log("response data: ",response);    
                })
            )
            .catch((error)=>console.log("error",error));
        }
        getData();
    },[])

    return(
        <div className=" md:grid grid-cols-3 ">
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">{data.merchants.length + parseInt(realAnalytics.merchants) }</h3>
                <h3 className="text-xl">Merchants</h3> 
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">
                    {
                        data.transactionAmounts.reduce((a,b)=>{
                        return parseInt(a) + parseInt(b) + 455;
                        },0)
                    }
                </h3>
                 <h3 className="text-xl">total Transacted</h3>
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">20</h3>
                 <h3 className="text-xl">Pending Merchant approvals</h3>
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
                <h3 className="text-4xl">1</h3>
                 <h3 className="text-xl">all admins</h3>
            </div>
            <div className="py-4 px-4 text-center bg-slate-300 my-2 mx-2 rounded-lg hover:bg-slate-400">
               <h3 className="text-4xl">
                    {data.totalWithdrawn.reduce((a,b)=>{
                            return parseInt(a) + parseInt(b) + 2010;
                            },0)
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