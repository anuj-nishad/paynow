import { Link } from "react-router-dom";

export function UserProfile({user}) {

  const letter = user.firstName[0];
  return <div className='flex items-center w-60 sm:w-full'>
    <Link className="bg-gray-200 text-black mr-3 sm:mr-7 rounded-full w-9 h-9 flex justify-center items-center">{letter}</Link>
    <p className="font-normal text-black text-lg sm:text-2xl">{user.firstName} {user.lastName}</p>
  </div>
}