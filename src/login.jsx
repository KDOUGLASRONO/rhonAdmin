import{useState, useContext} from 'react'
import{useNavigate, Link} from 'react-router-dom'
import axios from "axios"
import { loginContext } from './App';
import baseUrl from './baseUrl';

function Login(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");
    const Navigate = useNavigate();

    const [logins, setLogins] = useContext(loginContext)

    const handleLogin =async()=>{
        console.log("base url: " + baseUrl)
        try{
            const response = await axios.post("http://localhost:4444/api/v1/user/login",{
                email:email,
                password:password
            },{
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            console.log("response",response);
            if(response.status===200){
                setLogins(true);
                sessionStorage.setItem('token', response.data.token);
                Navigate("/dashboard");
            }
        }
        catch(error){
            setError("something went wrong");
        }
    }

    return(
        <div className="w-full md:w-4/12 my-20 m-auto bg-violet-100 py-10 px-2 md:px-12 rounded-lg">
            <div className='text-center'>
                <h3 className="text-red-600 text-xl">{error}</h3>
            </div>
            <div className="text-center w-full">
                <h3 className="text-xl font-bold py-4"><i>Welcome to admin page</i></h3>
                <h4 className="font-black"><i>Please sign in</i></h4>
            </div>
            <div className="my-4">
                <label className="text-lg">email :</label>
            </div>
            <div className="w-full">
                <input
                    
                    type="email"
                    name="password"
                    value={email}
                    placeholder='email'
                    onChange={(e)=>setEmail(e.target.value)} 
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
            <button className="bg-violet-500 py-2 px-4 mt-4 rounded-lg w-full text-white" onClick={handleLogin}>Submit</button>
            <div className="font-bold py-6 text-xl">
                <h3>Register new admin <Link to="/register"><i className="text-violet-500">here</i></Link></h3>
            </div>
            <Link to="/testing"><button className="py-2 px-6 bg-yellow-400 hover:bg-yellow-700 w-full">Testing</button></Link>
        </div>
    )
}
export default Login