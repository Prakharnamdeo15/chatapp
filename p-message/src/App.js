import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Maincontainer from './components/Maincontainer';
import Welcomecontainer from './components/Welcomecontainer';
import Chatarea from './components/Chatarea';
import Creategroup from './components/Creategroup';
import Users from './components/Users';
import Signup from './components/Signup';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signup' element={<Signup/>} />

        <Route path='app' element={<Maincontainer />}>
          <Route path='welcome' element={<Welcomecontainer />} ></Route>
          <Route path='chat/:_id' element={<Chatarea />} ></Route>
          <Route path='create-group' element={<Creategroup />} ></Route>
          <Route path='users' element={<Users/>} ></Route>
          {/* <Route path='create-group' element={<Creategroup />} ></Route> */}
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
