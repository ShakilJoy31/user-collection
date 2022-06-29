import logo from './logo.svg';
import './App.css';
import AddUsers from './Components/AddUsers/AddUsers';
import { Routes, Route, Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'; 
import DeleteUsers from './Components/DeleteUsers/DeleteUsers';

function App() {
  const navigate = useNavigate(); 
  const handleAddUser = () =>{
    navigate('/adduser')
  }

  const handleDeleteUser = () =>{
    navigate('/deleteuser')
  }

  return (
    <div>
      <div className='mt-8 flex justify-center'>
      <button onClick={handleAddUser} class="btn btn-info mr-4">Add User</button>
      <button onClick={handleDeleteUser} class="btn btn-error">Delete User</button>
      </div>
      <Routes>
        <Route path='/adduser' element={<AddUsers></AddUsers>}></Route>
        <Route path='/deleteuser' element={<DeleteUsers></DeleteUsers>}></Route>
      </Routes>
    </div>
  );
}

export default App;
