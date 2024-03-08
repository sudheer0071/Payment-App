import axios from "axios"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
 
export function  Dashboard(){ 

   const [money, setMoney] = useState('')
   useEffect(()=>{
      async function fetchData (){ 
         const res = await axios.get('http://localhost:3000/api/v1/account/balance',{
            headers:{
               authorization:"Bearer "+ localStorage.getItem("TOKEN")
            }
         })
         const balance =  res.data.message 
         
         console.log("balance is "+balance); 
         setMoney(balance)
     }
     fetchData()
   },[money])

return <div className="bg-white h-screen text-black">
    <AppBar label={'PayTM App'} user={localStorage.getItem('TOKEN')?localStorage.getItem('firstname'):'Default'}></AppBar>
    <div className="flex flex-col m-5 ">
    <Balance label={"Your balance"} balance={money} ></Balance>
    <Users></Users>
    </div>
   </div>
} 