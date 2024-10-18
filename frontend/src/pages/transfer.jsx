import { useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { checkAuth } from '../common/checkAuth';
import { BottomText } from '../components/BottomText';
import Footer from '../components/Footer';

export function Transfer() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const letter = name[0];
  const [amount, setAmount] = useState(0);
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [notEnoughMoney, setNotEnoughMoney] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(setIsAuthenticated, setUser);
  }, []);

  const handleMoneySent = (e) => {
    e.preventDefault()
    axios.post('https://paynow-api.onrender.com/api/v1/account/transfer', {
      toUserId: id,
      amount: amount
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(() => {
      setTransferSuccess(true);
    }).catch(()=>{
      setTransferSuccess(false);
      setNotEnoughMoney(true);
    })
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

  return <>
    {isAuthenticated ? (
      <div className='bg-primary min-h-screen flex justify-center items-center'>
        <Navbar name={user.firstName} />
        <div className='bg-white h-max py-5 pt-8 px-8 rounded-xl flex flex-col justify-between items-center font-poppins'>
          <p className='text-3xl font-semibold mb-12'>Send Money</p>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <Link className="bg-gray-200 text-black rounded-full w-9 h-9 flex justify-center items-center">{letter}</Link>
              <p className="font-normal text-black mr-5 text-xl mx-8">{name}</p>
            </div>
            <div className='mt-2'>
              <div>
                <input onChange={(e) => setAmount(e.target.value)} type='number' placeholder='Amount (in Rs)' className='py-3 outline-none border-b-2 my-2 w-[300px] px-2' name='amount' required />
              </div>
              {notEnoughMoney?(
                <div className='text-red-500 text-sm mt-2'>Insufficient Balance !</div>
              ):null}
              {transferSuccess ? (
                <div className='bg-green-500 text-white w-full p-3 rounded-md my-5'>
                  <p>Money sent successfully &#10003;</p>
                </div>
              ) : (<button onClick={handleMoneySent} type="submit" className="bg-blue-700 text-white w-full py-3 rounded-md my-4 hover:bg-blue-800">Send Money</button>
              )}
               <div className=" w-full flex justify-center">
              <BottomText label={''} buttonText={'Home'} to={'/dashboard'} />
            </div>
            </div>
          </div>
        </div>
      <Footer/>
      </div>
    ) : (
      <h1>Loading....</h1>
    )}
  </>
}