import { Link } from "react-router-dom";

export function UserProfile({user}) {

  const letter = user.firstName[0];
  return <div className='flex items-center w-60 sm:w-full'>
    <Link className="bg-gray-200 text-black mr-3 sm:mr-7 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center">{letter}</Link>
    <p className="font-normal text-black text-base sm:text-2xl">{user.firstName} {user.lastName}</p>
  </div>
}