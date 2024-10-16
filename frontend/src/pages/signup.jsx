import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomText } from '../components/BottomText'
import { Navbar } from '../components/Navbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export function Signup() {
  const navigate = useNavigate();
  localStorage.removeItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await axios.post('http://localhost:3000/api/v1/user/signup', data);
        console.log('User created:', response.data);

        const token = response.data.token;
        localStorage.setItem('token',token);
        navigate('/dashboard')
    }
    catch(err){
      console.error('Error:', err);
    }
};

  return <div className='bg-primary min-h-screen flex justify-center items-center'>
    <Navbar name={'Sign in'}/>
    <div className='bg-white h-max py-5 rounded-xl flex flex-col justify-center items-center font-poppins'>
      <Heading heading={'Sign up'} subHeading={'Create your account'} />
      <form className='flex flex-col items-center mx-10' onSubmit={handleSubmit}>
        <InputBox typeinput={'text'} placeholdertext={'Username'} name={'username'}/>
        <InputBox typeinput={'text'} placeholdertext={'First Name'} name={'firstName'}/>
        <InputBox typeinput={'text'} placeholdertext={'Last Name'} name={'lastName'}/>
        <InputBox typeinput={'text'} placeholdertext={'E-mail'} name={'email'}/>
        <InputBox typeinput={'password'} placeholdertext={'Password'} name={'password'}/>
        <Button buttonText={'Sign Up'} />
      </form>
      <BottomText label={'Already have an account?'} buttonText={'Sign in'} to={'/login'}/>
    </div>
    <Footer/>
  </div>
}