


import './App.css'
import ConsumerHome from './components/Consumer_Home'
import ProducerHome from './components/Producer_Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ConsumerLogin from './pages/ConsumerLogin';
import ProducerLogin from './pages/ProducerLogin';
import ProducerSignup from './pages/ProducerSignup';
import ConsumerSignup from './pages/ConsumerSignup';

function App() {
  return (
    <BrowserRouter>

      <div>
        <Routes>
          <Route path='/consumer-login' element={<ConsumerLogin />} />
          <Route path='/producer-login' element={<ProducerLogin />} />
          <Route path='/consumer-signup' element={<ConsumerSignup />} />
          <Route path='/producer-signup' element={<ProducerSignup />} />
          <Route path="/consumer" element={<ConsumerHome/>}/>
          <Route path="/producer" element={<ProducerHome/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
   

  
    
 
}

export default App;
