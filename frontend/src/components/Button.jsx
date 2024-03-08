export function Button({onclick, label}){
  return <div className="py-4">
    <button className="bg-slate-800 text-slate-100 py-2 px-3 rounded-md w-full focus:outline-none focus:ring-4 focus:ring-gray-300 "onClick={onclick}>{label}</button>
  </div>
}