import React, {useState} from 'react';
import './App.css';
import Login from './Login/login';
import { Routes, Route } from 'react-router-dom';
import Homepage from "./Homepage/Homepage";

const App: React.FC = () => {
    const [isAuth, setIsAuth] = useState(false)
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Login  isAuth={setIsAuth}/>} />
              {isAuth && <Route path="/home" element={<Homepage />} />}
          </Routes>
      </div>
  );
};

export default App;
