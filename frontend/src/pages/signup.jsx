import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomText } from '../components/BottomText'
import { Navbar } from '../components/Navbar';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export function Signup() {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  localStorage.removeItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const response = await axios.post('https://paynow-api.onrender.com/api/v1/user/signup', data);
      (!response)?setLoading(false):setLoading(true);

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard')
    }
    catch (err) {
      setLoading(false)
      console.error('Error:', err);
    }
  };

  return <div className='bg-primary min-h-screen flex justify-center items-center relative'>
    <Navbar name={'Sign in'} />
    <div className='bg-white h-max py-2 rounded-xl flex flex-col justify-center items-center font-poppins scale-90 sm:scale-100 sm:py-6'>
      <Heading heading={'Sign up'} subHeading={'Create your account'} />
      <form className='flex flex-col items-center mx-6 sm:mx-10' onSubmit={handleSubmit}>
        <InputBox typeinput={'text'} placeholdertext={'Username'} name={'username'} />
        <InputBox typeinput={'text'} placeholdertext={'First Name'} name={'firstName'} />
        <InputBox typeinput={'text'} placeholdertext={'Last Name'} name={'lastName'} />
        <InputBox typeinput={'text'} placeholdertext={'E-mail'} name={'email'} />
        <InputBox typeinput={'password'} placeholdertext={'Password'} name={'password'} />
        <Button buttonText={'Sign Up'} loading={loading} />
      </form>
      <BottomText label={'Already have an account?'} buttonText={'Sign in'} to={'/login'} />
    </div>
    <Footer />
  </div>
}