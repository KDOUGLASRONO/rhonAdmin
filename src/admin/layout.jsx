import {Outlet,Link, useNavigate} from 'react-router-dom'
import {useContext, useEffect, useState, createContext} from 'react'
import {loginContext} from '../App'
import axios from 'axios'


export const dataContext = createContext()
function Layout(){
    const [logins, setLogins] = useContext(loginContext)
   
    const Navigate = useNavigate();

    const handleLogout = ()=>{
        setLogins(false);
        Navigate("/");
    }

    useEffect(()=>{
        if(!logins){
            Navigate("/")
        }
    },[])

    return(
   
        <div className="h-screen">
            <div className="flex justify-between py-6 px-4 bg-slate-300 font-bold text-2xl">
                <h3>Rhon</h3>
                <button className="bg-red-700 py-1 px-2 rounded-lg text-white" onClick={handleLogout}>Log out</button>
            </div>
            <div className="flex h-5/6">
                <div className="hidden md:block md:w-3/12 bg-violet-200 px-4 pt-6">
                    <Link to="/dashboard" className="my-2 flex bg-slate-200 hover:bg-slate-300 py-1 rounded-lg w-full text-xl">
                        <img src="https://img.icons8.com/sf-ultralight-filled/25/doughnut-chart.png" alt="doughnut-chart" className="h-8 mr-2"/>
                        <h3>Dashboard</h3>
                    </Link>
                    <Link to="/pending" className="my-2 flex bg-slate-200 hover:bg-slate-300 py-1 rounded-lg w-full">
                        <img src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1" className="h-8 mr-2"/>
                        <h3>Pending</h3>
                    </Link>
                    <Link to="/merchants" className="my-2 flex bg-slate-200 hover:bg-slate-300 py-1 rounded-lg w-full">
                        <img src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1" className="h-8 mr-2"/>
                        <h3>Merchants</h3>
                    </Link>
                    <Link to="/transactions" className="my-2 flex bg-slate-200 hover:bg-slate-300 py-1 rounded-lg w-full text-xl">
                        <img src="https://img.icons8.com/ios/50/cent--v1.png" alt="cent--v1" className="h-8 mr-2"/>
                        <h3>Transactions</h3>
                    </Link>
                    <Link to="/users" className="my-2 flex bg-slate-200 hover:bg-slate-300 py-1 rounded-lg w-full text-xl">
                        <img src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1" className="h-8 mr-2"/>
                        <h3>Users</h3>
                    </Link>
                    <Link to="/withdrawals" className="my-2 flex bg-slate-200 hover:bg-slate-300 py-1 rounded-lg w-full">
                        <img src="https://img.icons8.com/ios/50/cent--v1.png" alt="cent--v1" className="h-8 mr-2"/>
                        <h3>Withdrawals</h3>
                    </Link>                    
                    <Link to="/verify" className="my-2 flex bg-slate-100 py-1 hover:bg-slate-300 rounded-lg w-full text-xl">
                        <img src="https://img.icons8.com/ios/50/cent--v1.png" alt="cent--v1" className='h-8 mr-2'/>
                        <h3>Verify</h3>
                    </Link>
                    <Link to="/bills" className="my-2 flex py-1 px-1 bg-slate-200 hover:bg-slate-300 rounded-lg w-full text-xl">
                        <img src="https://img.icons8.com/ios/50/bounced-check.png" alt="bounced-check" className='h-8 mr-2'/>
                        <h3>Bills</h3>
                    </Link>
                </div>
                <div className="w-full bg-violet-50 overflow-y-auto">
                        <Outlet/>
                </div>
            </div>
            <div className="bg-lime-50 font-bold flex px-4 py-4 justify-between text-xl">
                <h3><i>Rhone Finance</i></h3>
                <h3><i>0705280119</i></h3>
                <h3><i>info@rhon.co.ke</i></h3>
            </div>
        </div>
 
    )
}
export default Layout;