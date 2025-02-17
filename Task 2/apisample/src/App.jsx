import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import ListPosts from './pages/ListPosts'
import AddPost from './pages/AddPost'
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import LoginSignup from './components/LoginSignUp'; // Adjust the path to your login/signup component
import ApiCaller from "./components/ApiCaller";
import UserPosts from './components/UserPosts'
import Profile from './components/Profile';
function App() {

  return (
    <>
    <BrowserRouter>
    
      
      <Routes>
        <Route path="*" element={<ListPosts/>}/>
        <Route path="add-post" element={<AddPost/>}/>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/home" element={<ApiCaller />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="myposts" element={<UserPosts/>}/>
      </Routes>
    </BrowserRouter>
    </>
  
  
  )
}

export default App
