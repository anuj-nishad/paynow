import { Navbar } from "../components/Navbar"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { BottomText } from "../components/BottomText"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { checkAuth } from "../common/checkAuth"
import { fetchAccount } from "../common/fetchAccount"
import Footer from "../components/Footer"

export function Profile() {
  const navigate = useNavigate()
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    checkAuth(setIsAuthenticated, setUser);
  },[])

  useEffect(() => {
    fetchAccount(setBalance);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.password) 
      delete data.password;
    if(!data.firstName)
      delete data.firstName;
    if(!data.lastName)
      delete data.lastName;
    
    try {
      await axios.put('https://paynow-api.onrender.com/api/v1/user', data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }});
        setIsEditProfile(false)
        navigate('/dashboard')
    }
    catch(err){
      console.error('Error:', err);
    }
  }

  useEffect(() => {
    if(isAuthenticated === false)
      navigate('/login')
  }, [isAuthenticated, navigate]);

  if(isAuthenticated === null){
    return <div className="flex justify-center items-center bg-primary min-h-screen px-10 font-poppins py-32 md:px-32 lg:px-48 xl:px-60 2xl:px-80 relative">
    <div>Loading.....</div>
    </div>
  } 

  return (
    <>
    {isAuthenticated?(
      <div className='bg-primary min-h-screen flex justify-center items-center relative'>
      <Navbar name={user.firstName} />
      <div className='bg-white h-max py-4 px-5 rounded-xl flex flex-col justify-center items-center font-poppins scale-90 sm:scale-100'>
        {isEditProfile ? (
          <>
            <p className="font-medium text-black mr-5 my-2 mb-10 text-3xl mx-8">Edit Profile</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start mb-5">
                <label className="ml-2">First Name</label>
                <input className="py-2 outline-none border-b-2 my-1 w-[300px] px-2" placeholder="First Name" defaultValue={user.firstName} name='firstName'></input>
              </div>
              <div className="flex flex-col justify-center items-start mb-5">
                <label className="ml-2">Last Name</label>
                <input className="py-2 outline-none border-b-2 my-1 w-[300px] px-2" placeholder="First Name" defaultValue={user.lastName} name='lastName'></input>
              </div>
              <div className="flex flex-col justify-center items-start mb-5">
                <label className="ml-2"></label>
                <input type={'password'} className="py-2 outline-none border-b-2 my-1 w-[300px] px-2" placeholder="New Password" name='password'></input>
              </div>
              <button type="submit" className="font-medium bg-blue-600 py-2 px-4 text-white rounded-md w-full">Save</button>
            </form>
            <div className="mt-3">
            <button onClick={()=>setIsEditProfile(false)}>Back &larr;</button>
            </div>

          </>
        ) : (
          <>
            <Link className="bg-gray-200 text-2xl my-4 text-black rounded-full w-14 h-14 flex justify-center items-center">A</Link>
            <p className="font-medium text-black mr-5 mb-2 text-3xl mx-8">{user.firstName} {user.lastName}</p>
            <p className="font-normal text-black mr-5 text-md mx-8">{user.username}</p>
            <div className="bg-gray-200 flex flex-col items-center justify-center rounded-md py-4 my-6 mb-7">
              <p className="font-light text-black mr-5 text-base mx-8">Email</p>
              <p className="font-normal text-green-700 mr-5 mb-5 text-lg mx-8">{user.email}</p>
              <p className="font-light text-base">Overview</p>
              <p className="font-normal text-green-700 mr-5 text-lg mx-8">Balance:  &#8377;{balance}</p>
            </div>
            <button className="font-medium bg-blue-600 py-2 px-4 text-white rounded-md w-full" onClick={() => setIsEditProfile(true)}>Edit Profile	&#8594;</button>
            <div className="mt-2 ">
              <BottomText label={''} buttonText={'Home'} to={'/dashboard'} />
            </div>
          </>
        )}
      </div>
      <Footer/>
    </div >
    ):<h1>Loading...</h1>}
    </>     
  )
}
