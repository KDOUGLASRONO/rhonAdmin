import{useState, useEffect} from 'react'
import axios from 'axios'
import baseUrl from '../baseUrl'


function AddBill({bills, cancel}){
    const [bill, setBill] = useState("")
    const [period, setPeriod] = useState("")
    const [amount,setAmount] = useState("")

    const [error, setError] = useState("")

    const addBill = async()=>{
        console.log("bills: ", bills);
        if((bills.map((bill)=>bill.name.toUpperCase())).indexOf(bill)<0){
            console.log("bill don't exist");
            await axios.post(`${baseUrl}/add-bill`,{
                name: bill,
                period:period,
                amount:amount
            })
            .then((response)=>{
                setBill("");
                setPeriod("");
                setAmount("");
                console.log("adding bill response", response)
            })
            .catch((error)=>{
                console.log("error adding bill", error)
                setError("something went wrong");
                setBill("");
                setPeriod("");
                setAmount("");
            })
            cancel()
        }
        else{
            setError("bill already exists");setBill("");setPeriod("");setAmount("");
            console.log("bill exist", bills[(bills.map((bill)=>bill.name.toUpperCase())).indexOf(bill)])
            cancel()
        }
       
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex">
            <div className="inset-0 m-auto w-full md:w-4/12 h-fit py-6 px-4 bg-slate-400 rounded-lg">
                <div>
                    {error}
                </div>
                <div className='w-full'>
                    <div className="py-2 w-full text-xl">
                        <label>bill name</label>
                    </div>
                    <div className="py-2 w-full">
                        <input
                            type='text'
                            name="bill_name"
                            value={bill}
                            placeholder='bill name'
                            autoComplete='off'
                            onChange={(e)=>setBill(e.target.value.toUpperCase())}
                            className='w-full h-12 px-2 rounded-lg'
                        />
                    </div>
                    <div className="py-2 px-2 w-full text-xl">
                        <label>period</label>
                    </div>
                    <div className="py-2 w-full text-xl">
                        <select onChange={(e)=>{setPeriod(e.target.value); console.log("select value",e.target.value)}} className="w-full h-12 rounded-lg">
                            <option>Select Period</option>
                            <option value={"DAILY"}>DAILY</option>
                            <option value={"WEEKLY"}>WEEKLY</option>
                            <option value={"2 WEEKS"}>2 WEEKS</option>
                            <option value={"MONTHLY"}>MONTHLY</option>
                            <option value={"YEARLY"}>YEARLY</option>
                        </select>
                    </div>
                    <div className="py-2 w-full text-xl">
                        <label>AMOUNT</label>
                    </div>
                    <div className="py-2 w-full">
                        <input
                            type='number'
                            name="amount"
                            value={amount}
                            placeholder='e.g 500'
                            autoComplete='off'
                            onChange={(e)=>setAmount(e.target.value)}
                            className="py-2 px-2 w-full h-12 rounded-lg"
                        />
                    </div>
                </div>
                <div className="py-4 w-full flex justify-between text-white text-xl">
                    <button className="py-2 px-8 bg-red-600 hover:bg-red-700  rounded-lg" onClick={cancel} >CANCEL</button>
                    <button className="py-2 px-8 bg-green-400 hover:bg-green-500 rounded-lg" onClick={addBill}>ADD</button>
                </div>
            </div>
        </div>
    )
}
export default AddBill