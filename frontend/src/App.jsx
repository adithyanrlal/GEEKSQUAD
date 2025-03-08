import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
