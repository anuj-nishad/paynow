import { Navbar } from "../components/Navbar"
import { User } from "../components/User"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAuth} from "../common/checkAuth";
import { Link } from "react-router-dom";
import { fetchAccount } from "../common/fetchAccount";
import Footer from "../components/Footer";

export function Dashboard() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(setIsAuthenticated, setUser);
  }, []);

  useEffect(() => {
    fetchAccount(setBalance);
  }, [])

  useEffect(() => {
    if(isAuthenticated === false)
      navigate('/login')
    
  }, [isAuthenticated, navigate]);

  if(isAuthenticated === null){
    return <div className="bg-primary min-h-screen px-10 font-poppins py-32 md:px-32 lg:px-48 xl:px-60 2xl:px-80 relative">
      <div>Loading.....</div>
      </div>
  } 

  return <>
    {isAuthenticated ? (
      <div className="bg-primary min-h-screen px-10 font-poppins py-32 md:px-32 lg:px-48 xl:px-60 2xl:px-80 relative">
        <Navbar name={user.firstName} />
        <div className='bg-white rounded-xl flex flex-col justify-center font-poppins px-8 py-7 mb-5 shadow-xl'>
          <p className="mr-3 font-medium text-gray-700">Your Balance :</p>
          <p className="mt-2 font-bold text-4xl text-green-700">&#8377; {balance}</p>
        </div>
        <Link className="bg-white px-8 py-3 rounded-md flex font-semibold text-2xl w-full" to={'/transactions'}>Transaction History 	&rarr;</Link>
        <User userId={user._id} />
        <Footer/>
      </div>
    ) : (
      <h1>Loading</h1>
    )}
  </>



}