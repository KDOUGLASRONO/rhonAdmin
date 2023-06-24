import{useState, useContext} from 'react'
import{useNavigate, Link} from 'react-router-dom'
import axios from "axios"
import baseURL from './baseURL';


function Register(){
    const[email,setEmail] = useState("");
    const[phone,setPhone] = useState("");
    const[password,setPassword] = useState("");
    const[confirm,setConfirm] = useState("");
    const[error, setError] = useState("");

    const Navigate = useNavigate()

    const handleSignup =async()=>{
        if(password!=confirm){
            setError("passwords not the same")
            setPassword("");
            setConfirm("");
        }
        else{
            setError("");
        }
        const response = await axios.post(`${baseURL}/api/v1/user/register`,{
            email:email,
            phone:phone,
            password:password
        })
        console.log("registration response: " + response);
    }

    return(
        <div className="h-screen w-full md:w-4/12 my-20 m-auto bg-lime-100 py-10 px-2 md:px-12 rounded-lg">
            <div className="text-center w-full">
                <h3 className="text-xl font-bold py-4"><i>Welcome to admin page</i></h3>
                <h4 className="font-black"><i>Please register here</i></h4>
            </div>
            <div className="text-red-600 py-4">
                <h3>{error}</h3>
            </div>
            <div className="my-4">
                <label className="text-lg">email :</label>
            </div>
            <div className="w-full">
                <input
                    
                    type="email"
                    name="email"
                    value={email}
                    placeholder='email'
                    onChange={(e)=>setEmail(e.target.value)} 
                    className='w-full py-2 px-2 rounded-lg'
                />
            </div>
            <div className="my-4">
                <label className="text-lg">phone number :</label>
            </div>
            <div className="w-full">
                <input
                    
                    type="number"
                    name="phone"
                    value={phone}
                    placeholder='072700000'
                    onChange={(e)=>setPhone(e.target.value)} 
                    className='w-full py-2 px-2 rounded-lg'
                />
            </div>
            <div className="my-4">
                <label  className="text-lg">Password :</label><br/>
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full py-2 px-2 rounded-lg"
                />
            </div>
            <div className="my-4">
                <label  className="text-lg">Confirm Password :</label><br/>
            </div>
            <div>
                <input
                    type="password"
                    value={confirm}
                    placeholder='password'
                    onChange={(e)=>setConfirm(e.target.value)}
                    className="w-full py-2 px-2 rounded-lg"
                />
            </div>
            <button className="bg-violet-500 py-2 px-4 mt-4 rounded-lg w-full text-white" onClick={handleSignup}>Register</button>
        </div>
    )
}
export default Register