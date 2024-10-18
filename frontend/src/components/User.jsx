import { Button2 } from './Button2'
import { UserProfile} from '../components/UserProfile';
import { useState , useEffect} from 'react';
import axios from 'axios';

export function User({userId}) {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  
  const currentId = userId
  const handleFilter=(e)=>{
    const string = e.target.value;
    const word = string.charAt(0).toUpperCase() + string.slice(1); 
    setFilter(word);
  }
  useEffect(()=>{
    async function fetchUsers(){
      try{
        const response = await axios.get('https://paynow-api.onrender.com/api/v1/user/bulk?filter='+ filter)
        const filteredUsers = response.data.users.filter(user=> user.id != currentId)
        setUsers(filteredUsers)
      }
      catch(err){
        console.log(err);
      }
    }
    fetchUsers();
  },[filter])

  return (
    <>
    <div className='bg-white rounded-xl flex flex-col justify-center font-poppins px-6 sm:px-8 py-8 pb-10 shadow-xl h-auto mt-5'>
      <p className="font-semibold text-2xl sm:text-3xl">Users</p>
      <input type="text" placeholder="Search users..." className="border-b mt-6 outline-none py-2" onChange={handleFilter} />
      <div className="mt-2">
    {users.map((user)=>(
      <div key={user.id} className="flex items-center justify-between mt-4 sm:mt-5 pb-3 sm:pb-3 border-b-2">
        <UserProfile user={user}/>
        <Button2 user={user} buttonText={'Send Money'} />
      </div>
    ))}
    </div>
    </div>
    </>
  );
}