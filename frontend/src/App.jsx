import { BrowserRouter, Routes, Route, redirect, Navigate, useNavigate, Router, useNavigation } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMony'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { navState } from './atom'
import { useRecoilState } from 'recoil'
import { BACKEND_URL } from './config'

function App() {
  // const navigate = useNavigate()
  return <div>  
    <MainApp/>
  </div> 
}

function MainApp() {

  const [logged, setLogged] = useRecoilState(navState)
  
  const [isloading, setIsloading] = useState(true)
  const [isbackendDown,setIsbackDown] = useState(false)
  
  useEffect(() => {
    
    // check loggedin logic 
    const loggedIn = async () => {  
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem('TOKEN')
          }
        }) 
        const response = res.data.message
        //****************** will add backend is not responding functionality here ******************
        console.log(response);
        console.log(res.data.firstname);  
        setTimeout(() => {    
          setIsloading(false)
        }, 2800); 
          if (response.includes('logged')) {
            setLogged(true)
          }
          else {
            setLogged(false)
          }
        } catch (error) { 
          setTimeout(() => {
            setIsbackDown(true)
          }, 2000);
    }
    }
    loggedIn()
  }, [logged, isloading, isbackendDown])
 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isbackendDown?<BackendDown/>:isloading?<Loader/>:<Navigate to='/signin' />}></Route>
          <Route path='/signup' element={<Signup />}></Route> 
          <Route path='/send' element={<SendMoney />}>
          </Route>
          <Route path='/signin' element={!logged ? <Signin /> : <Navigate to='/dashboard' />}>
          </Route>
          <Route path='/dashboard' element={isbackendDown?<BackendDown/>:logged ? <Dashboard /> : <Navigate to='/signin' />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function Loader() {
  return <div>
    <div className='flex justify-center h-screen items-center'>
      <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
        <div class="wheel"></div>
        <div class="hamster">
          <div class="hamster__body">
            <div class="hamster__head">
              <div class="hamster__ear"></div>
              <div class="hamster__eye"></div>
              <div class="hamster__nose"></div>
            </div>
            <div class="hamster__limb hamster__limb--fr"></div>
            <div class="hamster__limb hamster__limb--fl"></div>
            <div class="hamster__limb hamster__limb--br"></div>
            <div class="hamster__limb hamster__limb--bl"></div>
            <div class="hamster__tail"></div>
          </div>
        </div>
        <div class="spoke"></div>
      </div>
    </div>
  </div>
}

function BackendDown() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-10 py-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Oops! Backend is down...</h1>
        <p className="mb-6">We apologize for the inconvenience, but our backend is currently experiencing technical difficulties. Our team is working hard to resolve the issue as quickly as possible.</p>
        <p className="mb-6">In the meantime, please check back later or contact support for further assistance.</p>
       <h3><a className='flex underline' href="https://paytm-litee.vercel.app/">Try Refreshing a page</a></h3>
    </div>
);
};


export default App
