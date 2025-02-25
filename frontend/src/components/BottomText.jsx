import { Link } from "react-router-dom";

export function BottomText({label, buttonText, to}){
  return (
    <div className="flex text-sm ">
      <p className="mr-1">{label}</p>
      <Link className='underline text-blue-800' to={to}>{buttonText}</Link>
    </div>
  )
}