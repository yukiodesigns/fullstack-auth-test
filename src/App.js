import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Logout from './components/Logout';


function App() {
  return (
    <div >
    <NavBar />
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/logout" element={<Logout />} />
     </Routes>
    </div>
  );
}

export default App;
