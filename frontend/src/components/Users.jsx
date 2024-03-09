import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios" 
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
 
  
export function Users(){

  const [user, setUser] = useState([])
  const [filter, setFilter] = useState('')
useEffect(()=> {
  async function fetchData(){
  const res = await axios.get(`${BACKEND_URL}/api/v1/user/bulk?filter=`+ filter)
  const users = res.data.user
  console.log(users.length); 
  setUser(users)
}
 fetchData()
}
,[filter])

  return <div>
    <div className="font-bold py-2 text-lg">Users</div>
    <div className="font-medium shadow-md">
      <input onChange={(e)=>{setFilter(e.target.value)}} className="bg-white border rounded-sm border-slate-200 w-full px-2 py-1" placeholder="Search users.." type="text"/>
    </div>
     <div className="my-2">
      {user.map((user, index)=><User key={index} user={user}></User>)}
     </div>
  </div>
}

function User({user}){
  
  const navigate = useNavigate()

  return  <div className="flex justify-between border shadow-md rounded-md mt-1">
  <div className="flex ml-2 mt-2"> 
<div className=" bg-slate-200 rounded-full h-12 w-12 p-4 mr-1 mt-1">
    <div className="flex flex-col justify-center h-full text text-xl">
      {user.firstname[0].toUpperCase()}
    </div>
  </div>
 <div className="mt-3 font-medium">
  <div >
  {user.firstname.charAt(0).toUpperCase()+ user.firstname.slice(1)} {user.lastname.charAt(0).toUpperCase()+ user.lastname.slice(1)}
  </div>
 </div>
</div>
 <div className="flex flex-col justify-center h-full mr-2">
  <Button onclick={(e)=> {navigate('/send?id='+user._id+'&name='+user.firstname)}} label={"Send Money"}></Button>
 </div>
</div>
}
