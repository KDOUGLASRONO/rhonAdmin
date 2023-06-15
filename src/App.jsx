import{BrowserRouter, Routes, Route} from 'react-router-dom'
import {createContext,useContext, useState} from 'react'


import Login from "./login"
import Layout from "./admin/layout";
import Merchants from "./admin/merchants"
import Dashboard from "./admin/dashboard";
import Pending from './admin/pending';
import Transactions from './admin/transactions';
import Users from './admin/users';
import Verify from './admin/verify';
import Withdrawals from './admin/withdrawals';
import Bills from './admin/bills'
import Register from './register'
import billsContext from './admin/data';

export const loginContext = createContext()
//routes

function App() {
  const[logins, setLogins] = useState(false)
  

  return (
      <loginContext.Provider value={[logins, setLogins]}>      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          {/*protected routes*/}
          <Route element={<Layout/>}>            
            <Route path="/signup" element ={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/pending" element={<Pending/>}/>
            <Route path="/merchants" element={<Merchants/>}/>
            <Route path="/transactions" element={<Transactions/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/verify" element={<Verify/>}/>
            <Route path="/withdrawals" element={<Withdrawals/>}/>
            
              <Route path="/bills" element={<Bills/>}/>
           
          </Route>

          {/*protected routes*/}
        </Routes>
      </BrowserRouter>
    </loginContext.Provider>
  )
}

export default App
