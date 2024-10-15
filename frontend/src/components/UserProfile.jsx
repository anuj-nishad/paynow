import { Link } from "react-router-dom";

export function UserProfile({user}) {

  const letter = user.firstName[0];
  return <div className='flex items-center'>
    <Link className="bg-gray-200 text-black rounded-full w-9 h-9 flex justify-center items-center">{letter}</Link>
    <p className="font-normal text-black mr-5 text-xl mx-8">{user.firstName} {user.lastName}</p>
  </div>
}