import React from 'react'
import Demo from './Pages/Demo'
import Home from './Pages/Home'
import { Route,Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import DatePlam from './Pages/DatePlam'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/demo' element={<Demo/>}/>
      <Route path='/datepalm' element={<DatePlam/>}/>
    </Routes>
    </>
  )
}

export default App