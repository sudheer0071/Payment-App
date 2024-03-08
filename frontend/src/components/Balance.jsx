export function Balance({label, balance}){
  return <div className="flex">
    <div className="font-bold text-lg">
     {label}
    </div>
    <div className="font-semibold ml-3 text-lg">
      Rs {balance}
    </div>
  </div>
}