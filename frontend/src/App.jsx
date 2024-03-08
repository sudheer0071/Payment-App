import {BrowserRouter, Routes, Route, redirect, Navigate, useNavigate } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMony'
import axios from 'axios'
import { useEffect, useState } from 'react'  
import { useRecoilState } from 'recoil'
import { navState } from './state/nav'

 
function App() {
  const [logged, setLogged] = useRecoilState(navState) 
  useEffect(()=>{
    // check loggedin logic 
    const loggedIn = async ()=>{
      const res = await axios.get('http://localhost:3000/api/v1/user/me',{
      headers:{
        authorization: "Bearer " + localStorage.getItem('TOKEN')
      }
    }) 
    const response = res.data.message 
    console.log(response);
    console.log(res.data.firstname);
    if (response.includes('logged')) {
      setLogged(true)
    }
    else{
      setLogged(false)
    }
  }
  loggedIn()
},[logged,])

console.log(localStorage.getItem('TOKEN'));
return (
  <div>        
         <BrowserRouter> 
            <Routes>
               <Route path='/signup' element={<Signup/>}></Route>
               <Route path='/send' element={ <SendMoney/>}> 
              </Route>
              <Route path='/signin' element={<Signin/>}> 
              </Route>
              <Route path='/dashboard' element={logged? <Dashboard/>: <Navigate to='/signin'/>}> 
              </Route>
            </Routes>
         </BrowserRouter>
    </div>
  )
}

export default App
