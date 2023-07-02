import{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import baseURL from '../baseURL'



function Details({bills, merchant, id, close}){

    const mount = useRef(false)

    const[merchantTransactions, setMerchantTransactions] = useState([])
    const[merchantWithdrawals, setMerchantWithdrawals] = useState([])
    const[merchantBills, setMerchantBills] = useState([])
    const[deductions, setDeductions]  = useState([])
    const[error, setError] = useState();
    const[deductionNames, setDeductionNames] = useState({})
    const[analytics, setAnalytics] = useState({})

    //SERVEr

    //manage show or not show
    const[display, setDisplay] = useState("")

    const handleDisplay = (e)=>{
        if(display.length>0){
            setDisplay("")
        }
        else{
            setDisplay(e.target.id)
        }
    }


    let transactionUrl = `${baseURL}/api/v1/merchant-transactions/${id}`
    let merchantBillsUrl = `${baseURL}/api/v1/get-merchant-bills/${id}`
    let WithdrawalsUrl = `${baseURL}/api/v1/merchant-withdrawals/${id}`
    let deductionsUrl = `${baseURL}/api/v1/deductions/${id}`
    let analyticSUrl = `${baseURL}/api/v1/merchant-analytics/${id}`

    //server endpoin

    useEffect(()=>{
        
        if(mount.current){
            console.log("running useeEffect")
        const getResponse = async()=>{
            await axios.all([axios.get(transactionUrl), axios.get(merchantBillsUrl), axios.get(deductionsUrl),axios.get(WithdrawalsUrl), 
                axios.get(analyticSUrl),])
            .then(axios.spread((...responses)=>{
                //console.log("responses transactions received:", responses[0].data);
                console.log("responses transactiosn", typeof(responses[0].data),responses[0].data.data);
                setMerchantTransactions(responses[0]?.data.data)
                //console.log("merchant bills", responses[1].data);
                setMerchantBills(responses[1]?.data);

                //console.log("deductions responses:", responses[2].data);
                //setDeductions(responses[2].data)
                //console.log("deductions responses:", responses[2].data)
                responses[2]?.data.map((dat)=>{
                    setDeductions((deductions)=>[...deductions,{id:dat._id,amount:dat.amount, date:dat.createdAt}])
                })
                //console.log("merchnt withdrawals:", responses[3].data)
                setMerchantWithdrawals(responses[3]?.data);
                //analytics
                console.log("analytics: ", responses[4]?.data)
                setAnalytics(responses[4]?.data);
            }))
            .catch((error) => {console.log("Error response individual:", error)})
        }
        getResponse()
        //rhone responses
    }
    return(()=>{
        mount.current=true;
    })

    }, [])

    //delete bill
    const handleMerchantBillDelete =(e)=>{
        console.log("bill id:", e.target.id);
        axios.delete(`${baseURL}/api/v1/delete-merchant-bill/${e.target.id}`)
        .then((response)=>console.log("data response:",response.data))
        .catch((error)=>console.log("error:",error))
    }
    //reverse erroneous deductions
    const reverseDeduction=(e)=>{
        console.log(e.target.id);
        axios.post(`${baseURL}/api/v1/reverse-deduction/${e.target.id}`)
        .then((response)=>console.log("reverse deduction ",response))
        .catch((error)=>console.log("failed to reverse:", error))
    }

    return(
        <div className="w-full py-4 px-4 h-full flex">
            <div className="w-full rounded-lg">
                <div>
                    {error}
                  
                </div>
                <div className='w-full py-1 px-1'>
                <div className='w-full px-1 bg-slate-100 rounded-lg mr-1 text-center'>
                            <h2 className="font-bold">Active Bills and Savings</h2>
                            {
                                merchantBills.map((bill)=>{
                                    return(
                                        <div key={bill._id} className='text-left flex justify-between my-1 py-2 bg-white px-1 rounded'>
                                            <h3 className="w-1/3">{bill.bill.name}</h3>
                                            <h3 className="w-1/3 text-center"><button className="py-1 px-2 bg-violet-400 hover:bg-violet-500 text-white rounded-lg">Reset</button></h3>
                                            <h3 className="w-1/3 text-right"><button className="py-1 px-2 bg-red-400 hover:bg-red-600 rounded-lg text-white" id={bill._id} onClick={handleMerchantBillDelete}>delete</button></h3>
                                        </div>
                                    )
                                })
                            }
                            <h2></h2>
                        </div>
                    <div className="flex w-full py-1 rounded-lg">
                        <div className='w-1/2 px-1 bg-slate-100 rounded-lg mr-1'>
                            <h3 className="flex justify-between">name: <span className="font-bold text-xl">name</span></h3>
                            <h3 className="flex justify-between">Business name: <span className="font-bold text-xl">{merchant.business_name}</span></h3>
                            <h3 className="flex justify-between">account Number: <span className="font-bold text-xl">{merchant.account_number}</span></h3>
                            <h3 className="flex justify-between">Business phone: <span className="font-bold text-xl">{merchant.phone}</span></h3>
                            <h3 className="flex justify-between">email adress: <span className="font-bold text-xl">{merchant.email}</span></h3>
                        </div>
                        <div className='w-1/2 px-1 bg-slate-100 rounded-lg mr-1'>
                            <h3 className="flex justify-between">total received: <span>{analytics.payments}</span></h3>
                            <h3 className="flex justify-between">Withdrawn: <span>{analytics.withdrawn}</span></h3>
                            <h3 className="flex justify-between">deductions:</h3>
                            <div>
                                {
                                   merchantBills.map((bill)=>{
                                    return(
                                        <div key={bill._id} className='text-left flex justify-between'>
                                            <h3>{bill.bill.name}:</h3><h3>{
                                                deductions?.filter((deduction)=>deduction.name===bill.bill.name).map((deduct)=>deduct.amount).reduce((a,b)=>parseInt(a)+parseInt(b),0)
                                            }</h3>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <h3 className="flex justify-between">total deductions : <span>{deductions.map((deduct)=>deduct.amount).reduce((a,b)=>parseInt(a)+parseInt(b),0)}</span></h3>
                            <h3 className="flex justify-between">Balance: <span>{/*merchantTransactions.concat(rhonTransactions).map((item)=>item.amount).reduce((a,b)=>{return parseInt(a)+parseInt(b)},0) - deductions.map((deduct)=>deduct.amount).reduce((a,b)=>parseInt(a)+parseInt(b),0)*/}</span></h3>
                            <h3 className="flex justify-between">Balance: <span>{analytics.balance}</span></h3>
                        </div>                        
                    </div>
                    <div className="w-full">
                        <div className="w-full  rounded my-1">
                            <div className="w-full py-2 bg-slate-100 hover:bg-slate-300 px-6 rounded-lg flex justify-between" id="transactions" onClick={handleDisplay}>
                                <h3>Transactions</h3>
                                <span className={`${(display=="transactions")?"hidden":"block"}`}>+</span>
                                <span className={`${(display=="transactions")?"block":"hidden"}`}>-</span>
                            </div>
                            <div className={`w-full ${(display=="transactions")?"block":"hidden"}`}>
                                <table className="w-full">
                                    <thead className="w-full bg-slate-300">
                                        <tr className="w-full flex justify-between bg-white my-1 py-1 px-2">
                                            <td>Merchant</td>
                                            <td>Amount</td>
                                            
                                           
                                            <td>action</td>
                                        </tr>
                                    </thead>
                                    <tbody className="w-full">
                                        {
                                            merchantTransactions.map((transaction)=>{
                                                return(
                                                    <tr key={transaction._id} className="w-full flex justify-between bg-white my-1 py-1 px-2">
                                                        <td>{merchant.business_name}</td>
                                                        <td>{transaction.amount}</td>
                                                        
                                                        
                                                        <td><button className="bg-violet-300 py-1 px-2 hover:bg-violet-500 rounded-lg text-white">reverse</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full my-1 py-2 px-6 bg-slate-100 hover:bg-slate-300 rounded-lg flex justify-between" id="deductions" onClick={handleDisplay}>
                                <h3>Deductions</h3>
                                <span className={`${(display=="deductions")?"hidden":"block"}`}>+</span>
                                <span className={`${(display=="deductions")?"block":"hidden"}`}>-</span>
                            </div>
                            <div className={`w-full ${(display=="deductions")?"block":"hidden"}`}>
                                <table className="w-full">
                                    <thead className="w-full">
                                        <tr className="w-full flex justify-between bg-white my-1 py-1 px-2">
                                            <td className="w-4/12">Bill name</td>
                                            <td className="w-4/12">Amount</td>
                                            
                                            <td className="w-4/12">action</td>
                                        </tr>
                                    </thead>
                                    <tbody className="w-full">
                                        {
                                            deductions.map((deduction)=>{
                                                return(
                                                    <tr className="w-full flex justify-between bg-white my-1" >
                                                        <td className="w-4/12">{deduction.name}</td>
                                                        <td className="w-4/12">{deduction.amount}</td>
                                                        <td className="w-4/12"><button className="py-1 px-2 bg-violet-300 hover:bg-violet-500 rounded-lg " id={deduction.id} onClick={reverseDeduction}>reverse</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className='w-full py-2 px-6 bg-slate-100 hover:bg-slate-300 rounded-lg flex justify-between' id="withdrawals" onClick={handleDisplay}>
                                <h3>Withdrawals Transactions</h3>
                                <span className={`${(display=="withdrawals")?"hidden":"block"}`}>+</span>
                                <span className={`${(display=="withdrawals")?"block":"hidden"}`}>-</span>
                            </div>
                            <table className={`w-full ${(display=="withdrawals")?"block":"hidden"}`}>
                                <thead className="w-full">
                                    <tr className="w-full flex justify-between bg-white my-1 py-1 px-2">
                                        <td className="w-2/12">Amount</td>
                                        
                                        <td className="w-2/12">recipient</td>
                                        <td className="w-2/12">status</td>
                                       
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {
                                        merchantWithdrawals.map((withdrawal)=>{
                                            return(
                                                <tr className="w-full flex text-center bg-white my-1" key={withdrawal._id}>
                                                    <td className="w-4/12">{withdrawal.amount}</td>
                                                  
                                                    <td className="w-4/12">self</td>
                                                    <td className="w-4/12">{withdrawal.status}</td>
                                                   
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="py-4 px-4 w-full flex justify-between text-white text-xl">
                    <button className="py-2 px-8 bg-red-600 hover:bg-red-700  rounded-lg" onClick={close} >CLOSE</button>
                    
                </div>
            </div>
        </div>
    )
}
export default Details