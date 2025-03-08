import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ConsumerHome from './components/Consumer_Home'
import ProducerHome from './components/Producer_Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/consumer" element={<ConsumerHome/>}/>
        <Route path="/producer" element={<ProducerHome/>}/>
    </Routes> 
    </div>
    

    </BrowserRouter>
    
  )
}

export default App
