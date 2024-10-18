import { Link } from "react-router-dom"

export function Navbar({name}) {
  const letter = name[0];

  return <nav className="flex justify-between max-h-full fixed top-0 right-0 w-full py-4 px-10 items-center shadow-md bg-tertiary sm:py-5 sm:px-32 md:px-40 lg:px-80">
    <Link to='/dashboard' className="font-extrabold text-white text-2xl">PayNow</Link>
    <div className="flex items-center">
      <p className="font-medium text-white mr-3 sm:mr-5 text-xl">{name}</p>
      {(name=='Sign up')?(
      <Link title="Profile" className="bg-white text-black rounded-full w-9 h-9 flex justify-center items-center" to={'/signup'}>{letter}</Link>
      ):(name=='Sign in')?(
        <Link title="Profile" className="bg-white text-black rounded-full w-9 h-9 flex justify-center items-center" to={'/login'}>{letter}</Link>
      )
      :(
        <>
        <Link title="Profile" className="bg-white text-black rounded-full w-9 h-9 flex justify-center items-center" to={'/profile'}>{letter}</Link>
        <Link className="ml-3 sm:ml-6" title="Log out" to={'/login'} onClick={()=>localStorage.removeItem('token')}><img src="../../images/logout.png" width={25}></img></Link>
        </>
      )}
    </div>
  </nav>

}