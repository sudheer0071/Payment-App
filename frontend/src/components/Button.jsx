 
import { Loader } from "./Loader"

export function Button({onclick, label, loader}){
   
  return <div className="py-4">
    <button className="loader bg-slate-800 text-slate-100 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-gray-300"onClick={onclick}>{loader=='signup'||loader=='signin'?<Loader/>: label} 
    </button> 
  </div>
}