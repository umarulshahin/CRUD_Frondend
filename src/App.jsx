import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./Pages/Home"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Admin from './Pages/Admin'


const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/Admin' element={<Admin/>} />



       </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App