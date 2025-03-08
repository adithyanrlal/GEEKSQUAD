import './App.css';
import ConsumerHome from './pages/Consumer_Home';
import ProducerHome from './pages/Producer_Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConsumerLogin from './pages/ConsumerLogin';
import ProducerLogin from './pages/ProducerLogin';
import ProducerSignup from './pages/ProducerSignup';
import ConsumerSignup from './pages/ConsumerSignup';
import AnimatedSunBackground from './pages/AnimatedSunBackground'; // Import the animated background
import Welcome from './pages/Welcome';
import ProducerSell from './pages/ProducerSell';
import Test from './pages/test';

function App() {
  return (
    <BrowserRouter>
       
        <Routes>
          <Route path='/' element={<Welcome/>} />
          <Route path='/consumer-login' element={<ConsumerLogin />} />
          <Route path='/producer-login' element={<ProducerLogin />} />
          <Route path='/consumer-signup' element={<ConsumerSignup />} />
          <Route path='/producer-signup' element={<ProducerSignup />} />
          <Route path='/consumer' element={<ConsumerHome />} />
          <Route path='/producer' element={<ProducerHome />} />
          <Route path='/producer-sell' element={<ProducerSell />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;