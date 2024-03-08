export function AppBar({ label, user }) {
  return <div className="flex justify-between shadow h-14">

    <div className="flex flex-col justify-center ml-4 font-extrabold text-lg">
      {label}
    </div>

    <div className="flex">
      <div className="flex flex-col justify-center mr-4 font-semibold">
        {user.charAt(0).toUpperCase()+ user.slice(1)}
      </div>
      <div className="flex flex-col justify-center bg-slate-200 rounded-full h-12 w-12 p-4 mr-3 mt-1">
        <div className="flex flex-col justify-center h-full text text-xl">
          {user[0].toUpperCase()}
        </div>
      </div>
    </div>
  </div>
}