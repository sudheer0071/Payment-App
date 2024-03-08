import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { InputBox } from "../components/InputBox"
import axios  from "axios"
import { useState } from "react"
import logo from "../assets/tick-green-icon.svg";
import { BACKEND_URL } from "../config";

export const SendMoney = () => {
const [searchParams] = useSearchParams()
const id = searchParams.get("id")
const name = searchParams.get('name')
const [amount,setAmount] = useState('')
const [popup, setPopup] = useState("")
const [isOpen, setIsopen] = useState(false)
const token = localStorage.getItem("TOKEN")
 
const navigate = useNavigate()

  return <div class="flex justify-center h-screen bg-gray-300 text-black">
    
     <div className={`popup ${isOpen ? 'active' : 'hide'} ${popup.includes('Insufficient') || popup.includes('Invalid')||popup.includes('Enter')||popup.includes('Error')?'bg-red-400 p-2 h-16': ''} flex justify-center text-center w-80 shadow-lg bg-emerald-400 rounded-lg font-medium text-lg fixed top-4 h-11 p-1`}>{popup} {popup.includes('successful')?<img className="ml-3 p-1 w-8 h-8 rounded-3xl bg-white" src={logo} />:''}
     </div>
    
      <div className="h-full flex flex-col justify-center">
          <div
              class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
          >
              <div class="flex flex-col space-y-1 p-6">
              <h2 class="text-3xl font-bold text-center">Send Money</h2>
              </div>
              <div class="p-6">
              <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                  </div>
                  <h3 class="text-2xl font-semibold">{name.charAt(0).toUpperCase()+name.slice(1)}</h3>
              </div>
              <div class="space-y-4">
                  <div class="space-y-2">
                  <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="amount"
                  >
                      Amount (in Rs)
                  </label>
                  <input
                        type="number"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                        class="hideArrows flex bg-white font-medium h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-lg focus:outline-none focus:ring "
                        value={amount}
                        onChange={(e)=>{setAmount(e.target.value)}} 
                        id="amount"
                        placeholder="Enter amount"
                    />
                  </div>
                  <button onClick={async ()=>{
                    
                    if (amount=='') {
                        setTimeout(() => {
                            setPopup('')
                            setIsopen(false)
                        }, 2000);
                        setIsopen(true)
                        setPopup("Please Enter Amount! ")
                    }

                  else{  const res = await axios.post(`${BACKEND_URL}/api/v1/account/transfer`,{
                        amount: amount ,to:id
                  },{
                    headers:{
                        authorization:"Bearer "+ localStorage.getItem("TOKEN")
                     }
                  }
                    )
                    
                    const json = res.data.message 
                    if (json.includes('successful')) {
                        setTimeout(() => {
                            setPopup('')
                            setIsopen(false)
                            setAmount('')
                            navigate('/dashboard')
                        }, 2000);
                        setIsopen(true)
                        setPopup(json)
                    }
                    else{
                        setTimeout(() => {
                          setPopup('')
                          setIsopen(false)
                        }, 1000);
                        setIsopen(true)
                         setPopup(json)
                    }
                    }
                  }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                      Initiate Transfer
                  </button>
              </div>
              </div>
      </div>
    </div>
  </div>
}