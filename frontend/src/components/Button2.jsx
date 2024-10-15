import { useNavigate } from "react-router-dom"

export function Button2({user, buttonText}){
  const navigate = useNavigate()
  return (
    <>
      <button onClick={()=>setTimeout(()=>{navigate('/send?id='+ user.id+ '&name='+user.firstName+'+'+user.lastName)},500) } className="bg-blue-700 text-white py-3 rounded-md my-5 px-4 hover:bg-blue-800">{buttonText}</button>
    </>
  )
}