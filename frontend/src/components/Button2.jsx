import { useNavigate } from "react-router-dom"

export function Button2({user, buttonText}){
  const navigate = useNavigate()
  return (
    <>
      <button onClick={()=>setTimeout(()=>{navigate('/send?id='+ user.id+ '&name='+user.firstName+'+'+user.lastName)},500) } className="bg-blue-700 text-white ml-3 sm:ml-0 py-3 sm:py-4 text-xs sm:text-xl rounded-md px-2 sm:px-5 w-36 hover:bg-blue-800 sm:w-52">{buttonText}</button>
    </>
  )
}