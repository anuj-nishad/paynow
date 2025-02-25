import { Navbar } from "../components/Navbar"
import { User } from "../components/User"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAuth } from "../common/checkAuth";
import { fetchAccount } from "../common/fetchAccount";
import Footer from "../components/Footer";

export function Transactions() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(setIsAuthenticated, setUser);
  }, []);

  useEffect(() => {
    fetchAccount(setBalance, setHistory);
  }, [])

  useEffect(() => {
    if (isAuthenticated === false)
      navigate('/login')

  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null || balance === null) {
    return <div className="flex justify-center items-center bg-primary min-h-screen px-10 font-poppins py-32 md:px-32 lg:px-48 xl:px-60 2xl:px-80 relative">
    <div>Loading.....</div>
    </div>
  } 
  return <>
    {isAuthenticated ? (
      <div className="bg-primary min-h-screen px-10 font-poppins py-28 md:px-32 lg:px-48 xl:px-60 2xl:px-80 relative">
        <Navbar name={user.firstName} />
        <div className='bg-white rounded-xl flex flex-col justify-center font-poppins px-8 py-4 mb-6 shadow-xl sm:py-6'>
          <p className="mr-3 font-medium text-gray-700">Your Balance :</p>
          <p className="mt-2 font-bold text-4xl text-green-700">&#8377; {balance}</p>
        </div>
        <div className='bg-white rounded-xl flex flex-col justify-center font-poppins px-8 py-8 pb-10 shadow-xl h-auto'>
          <p className="font-semibold text-2xl sm:text-3xl">Transaction History</p>
          <div className="mt-2">
            {history.reverse().map((x) =>{
                function formatDate(dateString) {
                  const date = new Date(dateString); 
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0'); 
                  const year = date.getFullYear(); 
                  const hours = String(date.getUTCHours()).padStart(2, '0');
                  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                  return (
                    <>
                      <p className="text-xl">{hours}:{minutes}</p>
                      <p className="text-xl ml-16">{day}-{month}-{year} </p>
                    </>
                  );
                }
              return(
              <div key={x._id} className="flex items-center justify-between mt-6 border-b-2 flex-col sm:flex-row sm:mt-8 sm:py-3">
                {(x.transactionType === 'send') ? (
                  <>
                    <p className="font-normal text-black mr-5 text-xl mx-3 mb-3 sm:mb-0 sm:text-2xl"><span className="text-green-700 font-bold">&#8377;{x.amount}</span> sent to <span className="font-medium">{x.receiptFirstName} {x.receiptLastName}</span></p>
                    <div className="flex font-medium text-blue-900 mb-2 sm:mb-0">{formatDate(x.eventTime)}</div>
                  </>
                ) : (
                  <>
                    <p className="font-normal text-black mr-5 text-xl mx-3 mb-3 sm:mb-0 sm:text-2xl sm:mx-3"><span className="text-green-700 font-bold">&#8377;{x.amount}</span> recieved from <span className="font-medium">{x.receiptFirstName} {x.receiptLastName}</span></p>
                    <div className="flex font-medium text-blue-900 mb-2 sm:mb-0">{formatDate(x.eventTime)}</div>
                  </>
                )}
              </div>
            )})}
          </div>
        </div>
      <Footer/>
      </div>
    ) : (
      <h1>Loading</h1>
    )}
  </>



}