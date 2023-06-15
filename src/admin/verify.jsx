import{useState, useEffect} from 'react'
import axios from "axios"


function Verify(){

    const[search, setSearch]= useState("");
    const[transactionsArray, setTransactionsArray]= useState([])
    const[transactions, setTransactions] = useState()
    const[results, setResults]= useState()


    useEffect(()=>{

        const getTransactions= (async()=>{
            axios.get("https://api.rhonpesa.online/api/v1/transactions")
            .then((response)=>{
                console.log("response transactions",response.data)
                setTransactions(response.data)
                response.data.map((transaction)=>{
                    setTransactionsArray((transactions)=>[...transactions, transaction.transaction_code])
                })
             })
            .catch((error)=>console.log("error transaction",error));
        })
        getTransactions()
    }, [])

    const findCode = ()=>{
        
        console.log("search", search )   
        console.log("set transaction", transactionsArray)
        if(transactionsArray.indexOf(search)<0){
            console.log("not found")
            setResults("results not found")
        }
        else{
            console.log("found found",transactions[transactionsArray.indexOf(search)])
            setResults(transactions[transactionsArray.indexOf(search)])
        }
    }
    

    return(
        <div className="w-full">
            <div className="py-10 text-2xl px-4 text-center">
                <h3><i>Verify Transaction</i></h3>
            </div>
           <div className="flex py-6 w-9/12  m-auto">
                <div className="w-full mr-4">
                    <input
                        type="text"
                        name='search'
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className=" bg-white rounded-lg px-4 py-3 w-full"
                    />
                </div>
                <div>
                    <button className="bg-blue-400 rounded-lg" onClick={findCode}>
                        <img width="50" height="50" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
                    </button>
                </div>              

           </div>
           <div className="py-8 text m-auto bg-white w-8/12 text-center text-2xl rounded-lg mt-4">
                {
                    (!results)?
                    <h3><i>Enter Code to verify Transfer</i></h3>
                    :
                    <div>
                        <div>
                            <div>
                                <h3>results loading</h3>
                            </div>
                            {typeof(results)!=="string"?
                            <div>
                                <div>{Object.keys(results).map((item)=>{
                                    return(
                                        <div className="text-left">
                                            {
                                                (item!="merchant")?
                                                <div className='flex justify-between px-4 py-2'>
                                                    <span>{(item)}</span>
                                                    <span>{results[item]}</span>
                                                </div>
                                                
                                                :null
                                            }
                                        </div>
                                    )
                                })}
                                </div>
                                <div className="w-full bg-slate-300 py-2 text-center text-2xl">
                                    <h3>Merchant information</h3>
                                </div>
                                <div>{Object.keys(results.merchant).map((item)=>{
                                    return(
                                        <div className="text-left">
                                            {
                                                (item!="password")?
                                                <div className='flex justify-between px-4 py-2'>
                                                    <span>{(item)}</span>
                                                    <span>{results.merchant[item]}</span>
                                                </div>:
                                                null
                                                
                                            }
                                        </div>
                                    )
                                })}
                                </div>
                            </div>:
                            <div>
                                <h3>{results}</h3>
                            </div>
                            }   
                        </div>
                    </div>
                }
                    
                </div>
        </div>
    )
}
export default Verify