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

  useEffect(()=>{
     const timeout = setTimeout(() => {
      setIsloading(false);
      // navigate('/signin')
     }, 3000);
     return ()=>clearInterval(timeout)
  },[isloading])


  
  useEffect(() => {

    // check loggedin logic 
    const loggedIn = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem('TOKEN')
        }
      })
      const response = res.data.message
      console.log(response);
      console.log(res.data.firstname);
      if (response.includes('logged')) {
        setLogged(true)
      }
      else {
        setLogged(false)
      }
    }
    loggedIn()
  }, [logged])

  console.log(localStorage.getItem('TOKEN'));
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isloading?<Loader/>:<Navigate to='/signin' />}></Route>
          <Route path='/signup' element={<Signup />}></Route> 
          <Route path='/send' element={<SendMoney />}>
          </Route>
          <Route path='/signin' element={!logged ? <Signin /> : <Dashboard />}>
          </Route>
          <Route path='/dashboard' element={logged ? <Dashboard /> : <Navigate to='/signin' />}>
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
export default App
