import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomText } from '../components/BottomText'
import { Navbar } from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../components/Footer'

export function Login() {

  const [isCredentials, setIsCredentials] = useState(false);
  const navigate = useNavigate();
  localStorage.removeItem('token')

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', data);
      const token = response.data.token;

      localStorage.setItem('token', token);
        navigate('/dashboard')
    }
    catch (err) {
      console.log("Error: ", err);
      setIsCredentials(true)
    }

  }

  return <div className='bg-primary min-h-screen flex justify-center items-center'>
    <Navbar name={'Sign up'} />
    <div className='bg-white h-max py-5 rounded-xl flex flex-col justify-center items-center font-poppins '>
      <Heading heading={'Sign in'} subHeading={'Enter your credentials'} />
      <form className='flex flex-col items-center mx-10' onSubmit={handleSubmit}>
        <InputBox typeinput={'text'} placeholdertext={'Username'} name={'username'} />
        <InputBox typeinput={'password'} placeholdertext={'Password'} name={'password'} />
        {isCredentials?(
          <div className='text-red-500 text-sm'>Incorrect username or password !!</div>
        ):null}
        <Button buttonText={'Sign in'} />
      </form>
      <BottomText label={'Didn\'t have a account?'} buttonText={'Sign up'} to={'/signup'} />
    </div>
    <Footer/>
    </div>
}