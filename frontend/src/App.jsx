import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup} from './pages/signup'
import {Login} from './pages/login'
import {Dashboard} from './pages/dashboard'
import { Transfer} from './pages/transfer'
import { Profile } from './pages/profile'
import { Transactions } from './pages/transactions'

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/send' element={<Transfer/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
